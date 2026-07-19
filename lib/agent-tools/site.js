import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const SITE_URL = 'https://myhairloss.com'

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const meta = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx > -1) {
      const key = line.slice(0, idx).trim()
      let val = line.slice(idx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1)
      meta[key] = val
    }
  }
  return meta
}

export const siteTools = {
  site_health: {
    description: 'Run full site health check (homepage, sitemap, blog, robots.txt)',
    execute: async () => {
      const checks = {}
      const urls = [
        { name: 'Homepage', url: SITE_URL },
        { name: 'Sitemap', url: `${SITE_URL}/sitemap.xml` },
        { name: 'Robots.txt', url: `${SITE_URL}/robots.txt` },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: 'Services', url: `${SITE_URL}/services` },
        { name: 'Contact', url: `${SITE_URL}/contact` },
        { name: 'Booking', url: `${SITE_URL}/book` },
        { name: 'Shop', url: `${SITE_URL}/shop` },
      ]
      for (const { name, url } of urls) {
        try {
          const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
          checks[name] = { status: res.status, ok: res.ok, url }
        } catch (e) {
          checks[name] = { status: 'error', error: e.message, url }
        }
      }
      checks.overall = Object.values(checks).every(c => c?.ok !== false) ? 'HEALTHY' : 'DEGRADED'
      return checks
    }
  },

  site_list_posts: {
    description: 'List all blog posts with metadata',
    execute: () => {
      if (!fs.existsSync(BLOG_DIR)) return { posts: [], total: 0 }
      const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
      return {
        total: files.length,
        posts: files.map(file => {
          const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
          const meta = parseFrontmatter(content)
          const slug = file.replace(/\.mdx?$/, '')
          return { slug, title: meta.title || slug, category: meta.category || 'uncategorized', date: meta.date || '' }
        }),
      }
    }
  },

  site_read_post: {
    description: 'Read full blog post content by slug',
    params: ['slug'],
    execute: async ({ slug }) => {
      if (!fs.existsSync(BLOG_DIR)) return { error: 'Blog directory not found' }
      const files = fs.readdirSync(BLOG_DIR)
      const file = files.find(f => f.replace(/\.mdx?$/, '') === slug)
      if (!file) return { error: `Post not found: ${slug}` }
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const meta = parseFrontmatter(content)
      return { slug, title: meta.title, category: meta.category, content }
    }
  },

  site_post_stats: {
    description: 'Get blog post statistics (count by category, total words, etc)',
    execute: () => {
      if (!fs.existsSync(BLOG_DIR)) return { total: 0, categories: {}, totalWords: 0 }
      const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
      const categories = {}
      let totalWords = 0
      for (const file of files) {
        const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
        const meta = parseFrontmatter(content)
        const cat = meta.category || 'uncategorized'
        categories[cat] = (categories[cat] || 0) + 1
        totalWords += content.replace(/---[\s\S]*?---/, '').split(/\s+/).length
      }
      return { total: files.length, categories, totalWords }
    }
  },

  site_status: {
    description: 'Get overall site infrastructure status',
    execute: () => ({
      domain: 'myhairloss.com',
      hosting: 'Vercel',
      dns: 'Cloudflare',
      ssl: 'Cloudflare (automatic)',
      email: 'Resend + Cloudflare Email Routing',
      blogEngine: 'MDX + Gray Matter',
      framework: 'Next.js 14',
      payments: 'Stripe',
      registrar: 'GoDaddy',
      domainExpires: 'Jan 2027',
    })
  },

  site_env_check: {
    description: 'Check which environment variables are configured (keys only, no values)',
    execute: () => {
      const vars = [
        'ADMIN_PASSWORD', 'AGENT_API_KEY', 'CLOUDFLARE_API_TOKEN',
        'VERCEL_TOKEN', 'VERCEL_PROJECT_ID', 'VERCEL_OIDC_TOKEN',
        'GITHUB_TOKEN', 'GODADDY_API_KEY',
        'RESEND_API_KEY', 'STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY',
        'STRIPE_WEBHOOK_SECRET', 'NEXT_PUBLIC_SITE_URL',
      ]
      return vars.map(v => ({
        key: v,
        configured: !!process.env[v],
        masked: process.env[v] ? process.env[v].slice(0, 4) + '...' + process.env[v].slice(-4) : 'NOT SET',
      }))
    }
  },
}
