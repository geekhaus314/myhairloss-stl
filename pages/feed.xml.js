import RSS from 'rss'
import { getAllPosts } from '../lib/posts'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../lib/seo'

export async function getServerSideProps({ res }) {
  const posts = getAllPosts()

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

  res.setHeader('Content-Type', 'application/rss+xml')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.write(feed.xml({ indent: true }))
  res.end()

  return { props: {} }
}

export default function Feed() {
  return null
}
