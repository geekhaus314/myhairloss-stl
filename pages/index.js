import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] selection:bg-[#9a6137] selection:text-white font-sans">
      <Head>
        <title>Brian Ivie Hair | St. Louis Hair Restoration & Custom Units</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* Fixed Navigation Overhaul */}
      <header className="fixed top-0 w-full z-50 bg-[#f5f5f0]/90 backdrop-blur-lg border-b border-[#e8e8e0] px-6 py-4 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-[#3c2a21]">
          Brian Ivie <span className="text-[#9a6137]">Hair</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Services', 'About', 'Physicians', 'Contact'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-[#3c2a21] hover:text-[#9a6137] transition">
              {item}
            </Link>
          ))}
          <Link href="/book" className="bg-[#3c2a21] text-[#f5f5f0] px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#9a6137] transition">
            Book Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none z-50"
        >
          <div className={`h-0.5 w-6 bg-[#3c2a21] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`h-0.5 w-6 bg-[#3c2a21] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 w-6 bg-[#3c2a21] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay - Clean & Mocha */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#3c2a21] flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <nav className="flex flex-col gap-8 text-center">
            {['Home', 'Services', 'About', 'Physicians', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black uppercase italic text-[#f5f5f0] hover:text-[#9a6137] transition"
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/book" 
              onClick={() => setMenuOpen(false)}
              className="mt-8 text-lg font-bold uppercase tracking-widest text-[#3c2a21] bg-[#9a6137] px-12 py-4 rounded-xl"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}

      {/* Hero Section: Inviting Mocha Caramel */}
      <section className="relative h-[90vh] flex flex-col justify-center pt-24 px-6 md:px-20 overflow-hidden bg-[#3c2a21]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay" 
            alt="Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3c2a21] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">
          <p className="text-[#9a6137] uppercase tracking-[0.4em] text-xs font-black mb-4">St. Louis • Salon Lofts on Olive</p>
          <h1 className="text-5xl md:text-[8rem] font-black uppercase italic leading-[0.9] tracking-tighter mb-8 text-[#f5f5f0]">
            Restore <br />
            <span className="text-[#9a6137]">Your Look.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-center justify-center md:justify-start">
            <Link href="/book" className="w-full md:w-auto bg-[#9a6137] text-[#f5f5f0] px-12 py-5 text-lg font-black uppercase italic tracking-tighter rounded-xl hover:bg-[#b0744a] transition-all">
              Book a Session
            </Link>
            <p className="text-sm md:text-lg max-w-sm text-[#f5f5f0]/70 font-medium leading-tight">
              Custom hair systems and precision cuts. Perfected fit, natural results, and expert care.
            </p>
          </div>
        </div>
      </section>

      {/* Craft Section: Clean & Inviting */}
      <section className="py-24 px-6 bg-[#f5f5f0]">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-[#3c2a21]">
              The <span className="text-[#9a6137]">Craft.</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#9a6137] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Custom Units', type: 'Restoration', img: '/images/custom-unit-hero.jpg' },
              { title: 'Precision Cuts', type: 'Barbering', img: '/images/service-haircut.jpg' },
              { title: 'Wig Fitting', type: 'Medical', img: '/images/wig-fitting.jpg' },
              { title: 'Physician Loop', type: 'Clinical', img: '/images/service-physician.jpg' }
            ].map((work, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#3c2a21]">
                <img 
                  src={work.img} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-all duration-700" 
                  alt={work.title} 
                />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-[#3c2a21] to-transparent">
                  <p className="text-[#9a6137] text-[10px] uppercase tracking-widest font-black mb-1">{work.type}</p>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#f5f5f0]">{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Section: Mocha Theme */}
      <section className="py-24 px-6 bg-[#e8e8e0]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 text-[#3c2a21]">
              Medical <br /><span className="text-[#9a6137]">Integration.</span>
            </h2>
            <p className="text-lg text-[#3c2a21]/80 mb-8 leading-relaxed">
              We bridge the gap between clinical treatment and aesthetic restoration. Partnering with St. Louis' top physicians for comprehensive care.
            </p>
            <Link href="/physicians" className="inline-block bg-[#3c2a21] text-[#f5f5f0] px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#9a6137] transition">
              Partnership Info
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <img src="/images/service-physician.jpg" className="w-full rounded-3xl shadow-2xl border-8 border-white" alt="Physician Partnership" />
          </div>
        </div>
      </section>

      {/* Footer: Clean & Mocha */}
      <footer className="py-20 px-6 bg-[#3c2a21] text-[#f5f5f0]">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">
            Brian Ivie <span className="text-[#9a6137]">Hair</span>
          </h2>
          <p className="text-sm uppercase tracking-widest opacity-60 mb-8">Salon Lofts on Olive Blvd | St. Louis, MO</p>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {['Services', 'About', 'Physicians', 'Contact'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest hover:text-[#9a6137] transition">
                {item}
              </Link>
            ))}
          </div>
          <p className="text-[10px] opacity-30 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Brian Ivie Hair LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
