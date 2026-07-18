import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import BlogNav from '../../components/blog/BlogNav'
import PostCard from '../../components/blog/PostCard'
import { getAllPosts, getAllCategories, getAllTags } from '../../lib/posts'
import { generateWebsiteSchema, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../../lib/seo'

export async function getStaticProps() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return { props: { posts, categories, tags } }
}

export default function BlogIndex({ posts, categories, tags }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))

    const matchesCategory =
      activeCategory === 'all' || post.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      <Head>
        <title>Blog | Hair Loss Research & Treatment Guides | MYHAIRLOSS.COM</title>
        <meta name="description" content="Evidence-based hair loss education, treatment guides, and research by Brian Ivie. Covers DHT, finasteride, minoxidil, hair transplants, and more." />
        <meta property="og:title" content="Blog | MYHAIRLOSS.COM" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
        />
      </Head>

      <BlogNav />

      {/* Hero */}
      <section className="section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] mb-4">
            Hair Loss <span className="text-gold">Research</span> & Guides
          </h1>
          <p className="text-[#1a1a1a]/60 max-w-2xl mx-auto text-lg">
            Evidence-based education on hair loss causes, treatments, and the latest research.
            Every article cites clinical sources.
          </p>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/30"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-white border border-gray-100 text-[#1a1a1a]/40 hover:border-gold/30'
              }`}
            >
              All ({posts.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-white border border-gray-100 text-[#1a1a1a]/40 hover:border-gold/30'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#1a1a1a]/40 text-lg">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-center py-8 px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
          &copy; {new Date().getFullYear()} Brian Ivie Hair & Extensions LLC &mdash; MYHAIRLOSS.COM
        </p>
      </footer>
    </div>
  )
}
