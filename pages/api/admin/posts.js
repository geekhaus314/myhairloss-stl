import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const lines = match[1].split('\n')
  const meta = {}
  for (const line of lines) {
    const idx = line.indexOf(':')
    if (idx > -1) {
      const key = line.slice(0, idx).trim()
      let val = line.slice(idx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      meta[key] = val
    }
  }
  return meta
}

export default function handler(req, res) {
  const auth = req.headers.authorization
  if (!auth || auth.replace('Bearer ', '') !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    const posts = files.map(file => {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const meta = parseFrontmatter(content)
      const slug = file.replace(/\.mdx?$/, '')
      const wordCount = content.replace(/---[\s\S]*?---/, '').split(/\s+/).length
      const readingTime = Math.max(1, Math.ceil(wordCount / 200))
      return {
        slug,
        title: meta.title || slug,
        category: meta.category || 'uncategorized',
        date: meta.date || '',
        description: meta.description || '',
        readingTime: `${readingTime} min read`,
        wordCount,
        file,
      }
    })

    posts.sort((a, b) => (b.date > a.date ? 1 : -1))

    res.status(200).json({ posts, total: posts.length })
  } catch (error) {
    res.status(500).json({ error: 'Failed to read blog posts', detail: error.message })
  }
}
