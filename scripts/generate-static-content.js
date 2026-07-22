import fs from 'fs'
import path from 'path'
import RSS from 'rss'
import matter from 'gray-matter'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com'
const SITE_NAME = 'Brian Ivie Hair & Extensions'
const SITE_DESCRIPTION = 'Expert hair restoration, extensions, and scalp treatments in St. Louis, MO. Evidence-based hair loss education and personalized care.'
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')
const PUBLIC_DIR = path.join(process.cwd(), 'public')

function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
    const { data } = matter(content)
    const slug = file.replace(/\.mdx?$/, '')
    return { slug, ...data }
  })
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function generateSitemap(posts) {
  const staticPages = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/services', changefreq: 'monthly', priority: '0.8' },
    { path: '/laser-therapy', changefreq: 'monthly', priority: '0.8' },
    { path: '/shop', changefreq: 'weekly', priority: '0.9' },
    { path: '/book', changefreq: 'monthly', priority: '0.9' },
    { path: '/contact', changefreq: 'monthly', priority: '0.7' },
    { path: '/physicians', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog', changefreq: 'daily', priority: '0.9' },
  ]

  const blogPages = posts.map(post => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: post.dateModified || post.date,
  }))

  const allPages = [...staticPages, ...blogPages]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${page.lastmod ? new Date(page.lastmod).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`
}

function generateFeed(posts) {
  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    language: 'en',
    pubDate: new Date(),
    ttl: 60,
  })

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      guid: `${SITE_URL}/blog/${post.slug}`,
      date: new Date(post.date),
      categories: post.tags || [],
      author: post.author || 'Brian Ivie',
    })
  })

  return feed.xml({ indent: true })
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Googlebot
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: Mediapartners-Google
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`
}

const posts = getAllPosts()

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateSitemap(posts), 'utf-8')
fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), generateFeed(posts), 'utf-8')
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobotsTxt(), 'utf-8')

console.log(`Generated: sitemap.xml, feed.xml, robots.txt (${posts.length} posts)`)
