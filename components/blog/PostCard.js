import Link from 'next/link'
import { motion } from 'framer-motion'
import EvidenceBadge from './EvidenceBadge'

export default function PostCard({ post, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white border border-gray-100 p-8 hover:border-gold/30 transition-all duration-500 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1">
                {post.category}
              </span>
            )}
            {post.evidence && <EvidenceBadge level={post.evidence} />}
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] group-hover:text-gold transition-colors duration-300 mb-3 leading-tight">
            {post.title}
          </h3>

          <p className="text-[#1a1a1a]/60 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/40">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>{post.readingTime}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
              {post.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
