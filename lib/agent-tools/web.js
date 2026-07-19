function extractText(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 8000)
}

async function searchDuckDuckGo(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyHairLossBot/1.0)' },
  })
  if (!res.ok) throw new Error(`Search failed (HTTP ${res.status})`)
  const html = await res.text()

  const results = []
  const resultRegex = /<a[^>]*class=["']result__a["'][^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi
  const snippetRegex = /<a[^>]*class=["']result__snippet["'][^>]*>([\s\S]*?)<\/a>/gi

  let match
  let idx = 0
  const links = []
  while ((match = resultRegex.exec(html)) && links.length < 10) {
    const link = match[1].replace(/\/\/duckduckgo\.com\/l\/\?uddg=/, '').replace(/&rut=.*$/, '')
    const title = match[2].replace(/<[^>]+>/g, '').trim()
    if (link && title && !link.includes('duckduckgo.com')) {
      links.push({ title, url: decodeURIComponent(link) })
    }
  }

  const snippets = []
  while ((match = snippetRegex.exec(html)) && snippets.length < 10) {
    snippets.push(match[1].replace(/<[^>]+>/g, '').trim())
  }

  for (let i = 0; i < links.length; i++) {
    results.push({
      title: links[i].title,
      url: links[i].url,
      snippet: snippets[i] || '',
    })
  }

  return results
}

function extractPageInfo(html, url) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || ''
  const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || ''
  const text = extractText(html)
  return { url, title, description: desc, text, textLength: text.length }
}

export const webTools = {
  web_search: {
    description: 'Search the web for information, competitors, products, brands, pricing, or anything else. Returns titles, URLs, and snippets of the top results.',
    params: ['query'],
    execute: async ({ query }) => {
      if (!query || typeof query !== 'string') throw new Error('Query is required')
      const results = await searchDuckDuckGo(query)
      return {
        query,
        resultCount: results.length,
        results,
        tip: 'Use web_scrape on any URL to get full page content',
      }
    },
  },

  web_scrape: {
    description: 'Fetch and extract readable content from any URL. Use after web_search to get full details from interesting results.',
    params: ['url'],
    execute: async ({ url }) => {
      if (!url || typeof url !== 'string') throw new Error('URL is required')
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyHairLossBot/1.0)' },
        redirect: 'follow',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
      const html = await res.text()
      const info = extractPageInfo(html, url)
      return info
    },
  },

  web_search_images: {
    description: 'Search for images on the web. Returns image URLs, alt text, and source pages. Useful for finding product images, competitor visuals, or design inspiration.',
    params: ['query'],
    execute: async ({ query }) => {
      if (!query || typeof query !== 'string') throw new Error('Query is required')
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`
      const res = await fetch(searchUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyHairLossBot/1.0)' },
      })
      if (!res.ok) throw new Error(`Image search failed (HTTP ${res.status})`)
      const html = await res.text()

      const images = []
      const dataMatch = html.match(/vqd=(\d+(?:-\d+)*)/)
      const vqd = dataMatch ? dataMatch[1] : ''

      if (vqd) {
        const apiUrl = `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&o=json&vqd=${vqd}&p=1`
        const apiRes = await fetch(apiUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyHairLossBot/1.0)' },
        })
        if (apiRes.ok) {
          const data = await apiRes.json()
          if (data.results) {
            for (const img of data.results.slice(0, 20)) {
              images.push({
                title: img.title || '',
                imageUrl: img.image || img.thumbnail,
                sourceUrl: img.url || '',
                width: img.width,
                height: img.height,
              })
            }
          }
        }
      }

      if (images.length === 0) {
        const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi
        let m
        while ((m = imgRegex.exec(html)) && images.length < 10) {
          if (m[1].startsWith('http') && !m[1].includes('duckduckgo')) {
            images.push({ title: m[2], imageUrl: m[1], sourceUrl: '' })
          }
        }
      }

      return {
        query,
        resultCount: images.length,
        images,
      }
    },
  },
}
