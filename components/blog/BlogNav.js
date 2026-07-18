import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function BlogNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-[#0a0a0a] text-[#c5a059] py-3 text-center"
      >
        <Link href="/" className="text-lg md:text-2xl font-black tracking-[0.4em] uppercase hover:text-white transition-colors">
          MYHAIRLOSS.COM
        </Link>
      </motion.div>

      <nav className="glass-nav px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex flex-col group">
          <span className="text-xs font-serif italic text-[#c5a059] tracking-widest uppercase">
            Blog & Research
          </span>
          <h1 className="text-lg md:text-xl font-bold tracking-tighter text-[#1a1a1a] leading-none">
            BRIAN IVIE <span className="font-light text-[#c5a059]">HAIR & EXTENSIONS</span>
          </h1>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="nav-link">All Posts</Link>
          <Link href="/blog?category=science" className="nav-link">Science</Link>
          <Link href="/blog?category=treatments" className="nav-link">Treatments</Link>
          <Link href="/blog?category=compare" className="nav-link">Compare</Link>
          <Link href="/" className="btn-outline text-[10px] py-3 px-6">
            Main Site
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1a1a1a]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-6 py-6 space-y-4"
        >
          <Link href="/blog" className="block nav-link" onClick={() => setMenuOpen(false)}>All Posts</Link>
          <Link href="/blog?category=science" className="block nav-link" onClick={() => setMenuOpen(false)}>Science</Link>
          <Link href="/blog?category=treatments" className="block nav-link" onClick={() => setMenuOpen(false)}>Treatments</Link>
          <Link href="/blog?category=compare" className="block nav-link" onClick={() => setMenuOpen(false)}>Compare</Link>
          <Link href="/" className="btn-outline block text-center text-[10px] py-3" onClick={() => setMenuOpen(false)}>
            Main Site
          </Link>
        </motion.div>
      )}
    </>
  )
}
