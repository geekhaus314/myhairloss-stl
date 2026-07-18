import { getAllPosts } from '../lib/posts'
import { SITE_URL } from '../lib/seo'

export async function getServerSideProps({ res }) {
  const posts = getAllPosts()

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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>` : `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`}
  </url>`).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
