import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/laser-therapy', label: 'Laser Therapy' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export default function Layout({ children, dark = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navTextColor = dark ? 'text-white/70 hover:text-white' : 'text-[#1a1a1a]/60 hover:text-[#c5a059]'
  const logoColor = dark ? 'text-white' : 'text-[#1a1a1a]'
  const goldText = 'text-[#c5a059]'
  const hamburgerColor = dark ? 'text-white' : 'text-[#1a1a1a]'
  const btnBg = dark ? 'bg-[#c5a059] text-[#0a0a0a]' : 'bg-[#0a0a0a] text-white hover:bg-[#c5a059]'

  return (
    <>
      {/* Top Branding */}
      <div className={`py-3 text-center ${dark ? 'bg-[#0a0a0a] text-[#c5a059]' : 'bg-[#0a0a0a] text-[#c5a059]'}`}>
        <Link href="/" className="text-lg md:text-2xl font-black tracking-[0.4em] uppercase hover:text-white transition-colors">MYHAIRLOSS.COM</Link>
      </div>

      {/* Header */}
      <header className={`px-6 py-6 flex justify-between items-center ${dark ? 'bg-[#0a0a0a]' : 'bg-[#fdfdfb]'}`}>
        <Link href="/" className="flex flex-col group">
          <span className={`text-xs font-serif italic ${goldText} tracking-widest uppercase`}>Executive Hair Restoration</span>
          <h1 className={`text-xl md:text-3xl font-bold tracking-tighter ${logoColor} leading-none`}>
            BRIAN IVIE <span className={`font-light ${goldText}`}>HAIR &amp; EXTENSIONS</span>
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${navTextColor}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/book" className={`px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 inline-block text-center ${btnBg}`}>
            Book Session
          </Link>
        </nav>

        <button onClick={() => setMenuOpen(true)} className={`lg:hidden ${hamburgerColor}`}>
          <Menu className="w-8 h-8" />
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col p-12"
          >
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12">
              <X className="w-10 h-10 text-[#c5a059]" />
            </button>
            <div className="flex flex-col gap-8">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-4xl font-serif text-white hover:text-[#c5a059]">Home</Link>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-4xl font-serif text-white hover:text-[#c5a059]">
                  {link.label}
                </Link>
              ))}
              <Link href="/book" onClick={() => setMenuOpen(false)} className="btn-primary mt-8 text-center bg-[#c5a059] text-[#0a0a0a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className={`py-32 px-6 ${dark ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]'}`}>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-10 tracking-tighter uppercase text-white">BRIAN IVIE <span className="font-light text-[#c5a059]">HAIR &amp; EXTENSIONS</span></h2>
            <p className="text-white/40 max-w-xl text-xl font-light leading-relaxed mb-12">
              Executive hair restoration and extension services in St. Louis. Providing custom solutions and clinical technology for professional results.
            </p>
            <div className="flex gap-10">
              <Link href="/book" className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">Book Session</Link>
              <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">Shop</Link>
              <Link href="/blog" className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">Blog</Link>
              <Link href="/contact" className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[#c5a059] text-xs uppercase tracking-[0.4em] mb-10 font-bold">St. Ann Studio</h4>
            <p className="text-white/60 text-xl font-light leading-loose">
              3674 Ashby Rd<br />
              St. Ann, MO 63074<br />
              <a href="tel:3145834843" className="text-white mt-10 block font-bold text-3xl hover:text-[#c5a059] transition-colors">(314) 583-IVIE</a>
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-32 pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">&copy; {new Date().getFullYear()} Personal Image Solutions. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
