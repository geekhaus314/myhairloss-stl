import Link from 'next/link'
import EvidenceBadge from './EvidenceBadge'
import ShareButtons from './ShareButtons'

export default function PostHeader({ post }) {
  return (
    <header className="mb-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
        <span className="mx-2">/</span>
        {post.category && (
          <>
            <span className="capitalize">{post.category}</span>
            <span className="mx-2">/</span>
          </>
        )}
      </nav>

      {/* Category + Evidence */}
      <div className="flex items-center gap-3 mb-6">
        {post.category && (
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1">
            {post.category}
          </span>
        )}
        {post.evidence && <EvidenceBadge level={post.evidence} />}
        {post.medicalReviewed && (
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-3 py-1">
            Medically Reviewed
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.1] mb-6">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-[#1a1a1a]/60 leading-relaxed max-w-3xl mb-8">
        {post.description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100">
        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0a0a0a] rounded-full flex items-center justify-center">
            <span className="text-gold text-sm font-bold">BI</span>
          </div>
          <div>
            <Link href="/about" className="text-sm font-bold text-[#1a1a1a] hover:text-gold transition-colors">
              Brian Ivie
            </Link>
            <p className="text-[11px] text-[#1a1a1a]/40 uppercase tracking-wider">
              Hair Restoration Specialist
            </p>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* Date */}
        <time
          dateTime={post.date}
          className="text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/40"
        >
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <div className="h-6 w-px bg-gray-200" />

        {/* Reading time */}
        <span className="text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/40">
          {post.readingTime}
        </span>

        <div className="flex-1" />

        {/* Share */}
        <ShareButtons title={post.title} slug={post.slug} />
      </div>
    </header>
  )
}
