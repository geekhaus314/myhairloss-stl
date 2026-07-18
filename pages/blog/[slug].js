import Head from 'next/head'
import { useRouter } from 'next/router'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import BlogNav from '../../components/blog/BlogNav'
import PostHeader from '../../components/blog/PostHeader'
import TableOfContents from '../../components/blog/TableOfContents'
import RelatedPosts from '../../components/blog/RelatedPosts'
import MedicalDisclaimer from '../../components/blog/MedicalDisclaimer'
import { SourceList } from '../../components/blog/Citation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../lib/posts'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from '../../lib/seo'

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const fullPost = getPostBySlug(params.slug)
  const relatedPosts = getRelatedPosts(params.slug, 3)

  const { content, ...post } = fullPost

  // Extract headings for TOC
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    headings.push({ id, text, level })
  }

  // Process markdown to HTML
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content)

  const htmlContent = processedContent.toString()

  return {
    props: {
      post,
      htmlContent,
      headings,
      relatedPosts,
    },
  }
}

export default function BlogPost({ post, htmlContent, headings, relatedPosts }) {
  const router = useRouter()
  const fullUrl = `${SITE_URL}/blog/${post.slug}`

  // Inject IDs into headings for TOC
  const contentWithIds = htmlContent.replace(
    /<h(2|3)>(.*?)<\/h(2|3)>/g,
    (match, level, text) => {
      const id = text
        .replace(/<[^>]+>/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return `<h${level} id="${id}">${text}</h${level}>`
    }
  )

  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      <Head>
        <title>{post.title} | Brian Ivie Hair &amp; Extensions</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:site_name" content="Brian Ivie Hair & Extensions" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.dateModified || post.date} />
        <meta property="article:author" content="Brian Ivie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        {post.tags && post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateArticleSchema(post)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'Blog', url: `${SITE_URL}/blog` },
              { name: post.title, url: fullUrl },
            ])),
          }}
        />
      </Head>

      <BlogNav />

      <article className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          {/* Main content */}
          <div className="max-w-3xl">
            <PostHeader post={post} />

            {/* Article body */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-[#1a1a1a]
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[#1a1a1a]/70 prose-p:leading-relaxed
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#1a1a1a]
                prose-li:text-[#1a1a1a]/70
                prose-blockquote:border-l-gold prose-blockquote:text-[#1a1a1a]/60 prose-blockquote:italic
                prose-code:text-gold prose-code:bg-gold/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
                prose-table:text-sm
                prose-th:text-left prose-th:py-2 prose-th:border-b prose-th:border-gray-200
                prose-td:py-2 prose-td:border-b prose-td:border-gray-50"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Sources */}
            {post.sources && <SourceList sources={post.sources} />}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer />
          </div>

          {/* Sidebar TOC (desktop only) */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} />
      </article>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-center py-8 px-6 mt-16">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
          &copy; {new Date().getFullYear()} Personal Image Solutions &mdash; MYHAIRLOSS.COM
        </p>
      </footer>
    </div>
  )
}
