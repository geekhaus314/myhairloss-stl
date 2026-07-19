const BASE = 'https://api.github.com'

async function ghFetch(path, options = {}) {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN not configured')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error (${res.status}): ${err}`)
  }
  if (res.status === 204) return { success: true }
  return res.json()
}

const REPO = 'geekhaus314/myhairloss-stl'

export const githubTools = {
  gh_repo_info: {
    description: 'Get GitHub repository info (stars, forks, issues, last commit)',
    execute: async () => ghFetch(`/repos/${REPO}`),
  },
  gh_recent_commits: {
    description: 'List recent commits on the repo',
    params: ['limit?'],
    execute: async ({ limit = 10 }) => ghFetch(`/repos/${REPO}/commits?per_page=${limit}`),
  },
  gh_list_issues: {
    description: 'List open issues and pull requests',
    params: ['state?'],
    execute: async ({ state = 'open' }) => ghFetch(`/repos/${REPO}/issues?state=${state}&per_page=30`),
  },
  gh_create_issue: {
    description: 'Create a new GitHub issue',
    params: ['title', 'body?'],
    execute: async ({ title, body = '' }) => ghFetch(`/repos/${REPO}/issues`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
    }),
  },
  gh_list_files: {
    description: 'List files/directories at a path in the repo',
    params: ['path?'],
    execute: async ({ path: filePath = '' }) => ghFetch(`/repos/${REPO}/contents/${filePath}`),
  },
  gh_read_file: {
    description: 'Read the contents of a file in the repo',
    params: ['path'],
    execute: async ({ path: filePath }) => {
      const data = await ghFetch(`/repos/${REPO}/contents/${filePath}`)
      if (data.content) {
        return { path: filePath, content: Buffer.from(data.content, 'base64').toString('utf-8') }
      }
      return data
    },
  },
  gh_file_commit: {
    description: 'Create or update a file (commit directly to main branch)',
    params: ['path', 'content', 'message'],
    execute: async ({ path: filePath, content, message }) => {
      let sha = undefined
      try {
        const existing = await ghFetch(`/repos/${REPO}/contents/${filePath}`)
        sha = existing.sha
      } catch {}
      return ghFetch(`/repos/${REPO}/contents/${filePath}`, {
        method: 'PUT',
        body: JSON.stringify({
          message,
          content: Buffer.from(content).toString('base64'),
          sha,
          branch: 'main',
        }),
      })
    },
  },
  gh_pull_requests: {
    description: 'List pull requests',
    params: ['state?'],
    execute: async ({ state = 'open' }) => ghFetch(`/repos/${REPO}/pulls?state=${state}`),
  },
  gh_create_blog_post: {
    description: 'Create a new blog post (MDX file committed to GitHub, auto-deploys via Vercel)',
    params: ['slug', 'title', 'category', 'content', 'description?'],
    execute: async ({ slug, title, category, content, description }) => {
      const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      const filePath = `content/blog/${safeSlug}.mdx`
      const frontmatter = [
        '---',
        `title: "${title.replace(/"/g, '\\"')}"`,
        `category: "${category}"`,
        `date: "${new Date().toISOString().split('T')[0]}"`,
        description ? `description: "${description.replace(/"/g, '\\"')}"` : null,
        '---',
        '',
      ].filter(Boolean).join('\n')

      const fullContent = frontmatter + content

      let sha = undefined
      try {
        const existing = await ghFetch(`/repos/${REPO}/contents/${filePath}`)
        sha = existing.sha
      } catch {}

      const result = await ghFetch(`/repos/${REPO}/contents/${filePath}`, {
        method: 'PUT',
        body: JSON.stringify({
          message: `Add blog post: ${title}`,
          content: Buffer.from(fullContent).toString('base64'),
          sha,
          branch: 'main',
        }),
      })

      return {
        slug: safeSlug,
        filePath,
        title,
        category,
        url: `https://myhairloss.com/blog/${safeSlug}`,
        committed: true,
        note: 'This post is now live on the site. Vercel auto-deploys on commit.',
      }
    }
  },
  gh_update_blog_post: {
    description: 'Update an existing blog post by slug',
    params: ['slug', 'content', 'message?'],
    execute: async ({ slug, content, message }) => {
      const filePath = `content/blog/${slug}.mdx`
      const existing = await ghFetch(`/repos/${REPO}/contents/${filePath}`)

      const result = await ghFetch(`/repos/${REPO}/contents/${filePath}`, {
        method: 'PUT',
        body: JSON.stringify({
          message: message || `Update blog post: ${slug}`,
          content: Buffer.from(content).toString('base64'),
          sha: existing.sha,
          branch: 'main',
        }),
      })

      return {
        slug,
        filePath,
        url: `https://myhairloss.com/blog/${slug}`,
        updated: true,
        note: 'Changes are live on the site.',
      }
    }
  },
  gh_delete_blog_post: {
    description: 'Delete a blog post by slug',
    params: ['slug'],
    execute: async ({ slug }) => {
      const filePath = `content/blog/${slug}.mdx`
      const existing = await ghFetch(`/repos/${REPO}/contents/${filePath}`)

      await ghFetch(`/repos/${REPO}/contents/${filePath}`, {
        method: 'DELETE',
        body: JSON.stringify({
          message: `Delete blog post: ${slug}`,
          sha: existing.sha,
          branch: 'main',
        }),
      })

      return { slug, deleted: true, note: 'Post removed from site.' }
    }
  },
}
