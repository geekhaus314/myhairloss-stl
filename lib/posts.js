import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      ...data,
      readingTime: stats.text,
      wordCount: stats.words,
    }
  })

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    ...data,
    content,
    readingTime: stats.text,
    wordCount: stats.words,
  }
}

export function getPostsByCategory(category) {
  return getAllPosts().filter(post => post.category === category)
}

export function getPostsByTag(tag) {
  return getAllPosts().filter(post =>
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const currentPost = getPostBySlug(currentSlug)
  const allPosts = getAllPosts()

  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTags = post.tags?.filter(tag =>
        currentPost.tags?.includes(tag)
      ).length || 0
      const sameCategory = post.category === currentPost.category ? 1 : 0
      return { ...post, relevance: sharedTags + sameCategory }
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
}

export function getAllCategories() {
  const posts = getAllPosts()
  const categories = {}
  posts.forEach(post => {
    if (post.category) {
      categories[post.category] = (categories[post.category] || 0) + 1
    }
  })
  return Object.entries(categories).map(([name, count]) => ({ name, count }))
}

export function getAllTags() {
  const posts = getAllPosts()
  const tags = {}
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tags[tag] = (tags[tag] || 0) + 1
    })
  })
  return Object.entries(tags)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
