import { SITE_URL } from '../lib/seo'

export async function getServerSideProps({ res }) {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: ${SITE_URL}/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.write(robots)
  res.end()

  return { props: {} }
}

export default function Robots() {
  return null
}
