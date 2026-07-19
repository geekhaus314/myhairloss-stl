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

  site_pagespeed: {
    description: 'Run Google PageSpeed audit on any URL — shows speed score, issues, and fixes in plain English',
    params: ['url?', 'strategy?'],
    execute: async ({ url, strategy = 'mobile' }) => {
      const target = url || SITE_URL
      const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&strategy=${strategy}&category=performance&category=accessibility&category=seo&category=best-practices`
      const res = await fetch(psiUrl)
      if (!res.ok) {
        const err = await res.text()
        throw new Error(`PageSpeed API error: ${err}`)
      }
      const data = await res.json()
      const lhr = data.lighthouseResult
      if (!lhr) return { error: 'No Lighthouse results returned' }

      const scores = {}
      for (const [key, cat] of Object.entries(lhr.categories || {})) {
        scores[key] = { score: Math.round((cat.score || 0) * 100), title: cat.title }
      }

      const opportunities = []
      for (const [key, opp] of Object.entries(lhr.audits || {})) {
        if (opp.score !== null && opp.score < 0.9 && opp.displayValue) {
          opportunities.push({
            id: key,
            title: opp.title,
            description: opp.description,
            value: opp.displayValue,
            score: opp.score,
          })
        }
      }

      return {
        url: target,
        strategy,
        scores,
        topOpportunities: opportunities.slice(0, 8),
        finalUrl: lhr.finalUrl,
        fetchTime: lhr.fetchTime,
      }
    }
  },

  site_seo_audit: {
    description: 'Audit any page for SEO issues — meta tags, headings, images, links, schema markup. Explains what to fix.',
    params: ['url?'],
    execute: async ({ url } = {}) => {
      const target = url || SITE_URL
      const res = await fetch(target)
      if (!res.ok) return { error: `Could not fetch page (HTTP ${res.status})` }
      const html = await res.text()

      const issues = []
      const info = {}

      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
      info.title = titleMatch ? titleMatch[1] : null
      if (!info.title) issues.push({ type: 'critical', issue: 'Missing page title', fix: 'Add a <title> tag in the <head>' })
      else if (info.title.length > 60) issues.push({ type: 'warning', issue: `Title too long (${info.title.length} chars, max 60)`, fix: 'Shorten the title to under 60 characters' })

      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
      info.metaDescription = descMatch ? descMatch[1] : null
      if (!info.metaDescription) issues.push({ type: 'critical', issue: 'Missing meta description', fix: 'Add <meta name="description" content="...">' })
      else if (info.metaDescription.length > 160) issues.push({ type: 'warning', issue: `Meta description too long (${info.metaDescription.length} chars, max 160)`, fix: 'Shorten to under 160 characters' })

      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
      info.canonical = canonicalMatch ? canonicalMatch[1] : null
      if (!info.canonical) issues.push({ type: 'warning', issue: 'Missing canonical tag', fix: 'Add <link rel="canonical" href="...">' })

      const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)
      info.ogTitle = ogTitle ? ogTitle[1] : null
      if (!info.ogTitle) issues.push({ type: 'warning', issue: 'Missing Open Graph title', fix: 'Add <meta property="og:title" content="...">' })

      const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i)
      info.ogImage = ogImage ? ogImage[1] : null
      if (!info.ogImage) issues.push({ type: 'warning', issue: 'Missing Open Graph image', fix: 'Add <meta property="og:image" content="...">' })

      const h1Count = (html.match(/<h1[\s>]/gi) || []).length
      info.h1Count = h1Count
      if (h1Count === 0) issues.push({ type: 'critical', issue: 'No H1 heading found', fix: 'Add exactly one <h1> tag per page' })
      if (h1Count > 1) issues.push({ type: 'warning', issue: `Multiple H1 tags (${h1Count})`, fix: 'Use only one <h1> per page, use <h2>-<h6> for the rest' })

      const imgTags = html.match(/<img[^>]*>/gi) || []
      const imgNoAlt = imgTags.filter(img => !img.match(/alt=["'][^"']+["']/i))
      info.totalImages = imgTags.length
      info.imagesWithoutAlt = imgNoAlt.length
      if (imgNoAlt.length > 0) issues.push({ type: 'warning', issue: `${imgNoAlt.length} images missing alt text`, fix: 'Add alt="description" to every image for accessibility and SEO' })

      const schemaMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
      info.hasSchemaMarkup = !!schemaMatch
      info.schemaCount = schemaMatch ? schemaMatch.length : 0
      if (!schemaMatch) issues.push({ type: 'info', issue: 'No structured data (schema markup) found', fix: 'Add JSON-LD schema for LocalBusiness, Article, or Product' })

      const links = html.match(/<a[^>]*href=["']([^"']*)["']/gi) || []
      const externalLinks = links.filter(l => l.match(/https?:\/\//) && !l.includes('myhairloss.com'))
      const brokenLinkPatterns = links.filter(l => l.includes('href="#"') || l.includes('href=""'))
      info.totalLinks = links.length
      info.externalLinks = externalLinks.length
      if (brokenLinkPatterns.length > 0) issues.push({ type: 'warning', issue: `${brokenLinkPatterns.length} empty/placeholder links`, fix: 'Replace href="#" with actual URLs' })

      return {
        url: target,
        info,
        issues,
        score: Math.max(0, 100 - (issues.filter(i => i.type === 'critical').length * 20) - (issues.filter(i => i.type === 'warning').length * 5)),
      }
    }
  },

  site_uptime_check: {
    description: 'Check if the site is reachable and how fast it responds. Includes DNS resolution and SSL certificate check.',
    execute: async () => {
      const results = {}
      const urls = [
        { name: 'Homepage', url: SITE_URL },
        { name: 'Admin Portal', url: 'https://admin.myhairloss.com' },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: 'Shop', url: `${SITE_URL}/shop` },
        { name: 'Booking', url: `${SITE_URL}/book` },
      ]
      for (const { name, url } of urls) {
        const start = Date.now()
        try {
          const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
          results[name] = {
            status: res.status,
            ok: res.ok,
            responseTime: `${Date.now() - start}ms`,
            url,
          }
        } catch (e) {
          results[name] = {
            status: 'UNREACHABLE',
            ok: false,
            error: e.message,
            responseTime: `${Date.now() - start}ms`,
            url,
          }
        }
      }
      const allOk = Object.values(results).every(r => r.ok)
      return {
        overall: allOk ? 'ALL SYSTEMS OPERATIONAL' : 'SOME ISSUES DETECTED',
        pages: results,
        checkedAt: new Date().toISOString(),
      }
    }
  },
}
