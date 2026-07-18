import PostCard from './PostCard'

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h2 className="font-serif text-3xl text-[#1a1a1a] mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}
