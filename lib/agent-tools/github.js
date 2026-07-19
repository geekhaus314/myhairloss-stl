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
}
