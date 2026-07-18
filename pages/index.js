import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Zap, Scissors, Users, ArrowRight, Menu, X, CreditCard } from 'lucide-react'
import { generateLocalBusinessSchema, SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { 
      title: 'Hair Replacement', 
      icon: <ShieldCheck className="w-6 h-6" />,
      desc: 'Custom molded systems, perfected for each customer\'s color and fit. Indistinguishable from natural growth.', 
      link: '/services' 
    },
    { 
      title: 'Laser Hair Therapy', 
      icon: <Zap className="w-6 h-6" />,
      desc: 'Clinical-grade LLLT to stimulate growth, thicken hair, and revitalize follicles. Essential post-op care.', 
      link: '/laser-therapy' 
    },
    { 
      title: 'Hair Extensions', 
      icon: <Scissors className="w-6 h-6" />,
      desc: 'Premium extensions for length, volume, and color. Expertly applied for a seamless, natural blend.', 
      link: '/services' 
    },
    { 
      title: 'Transplant Consultations', 
      icon: <Users className="w-6 h-6" />,
      desc: 'Professional coordination with top STL surgeons. We manage your journey and recovery.', 
      link: '/services' 
    }
  ];

  const products = [
    { name: 'Professional Tapes', desc: 'Ultra-hold adhesives for secure system placement.' },
    { name: 'Liquid Adhesives', desc: 'Medical-grade bonding for active lifestyles.' },
    { name: 'Specialty Shampoos', desc: 'Formulated for hair systems and extensions.' },
    { name: 'Conditioners & Serums', desc: 'Essential care for maintaining hair longevity.' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-[#fdfdfb]">
      <Head>
        <title>Brian Ivie Hair &amp; Extensions | St. Louis Hair Restoration Specialist</title>
        <meta name="description" content="Premier hair restoration in St. Louis. Custom hair systems, laser therapy, extensions, and transplant consultations by Brian Ivie — 15+ years of expertise." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brian Ivie Hair & Extensions | St. Louis Hair Restoration" />
        <meta property="og:description" content="Premier hair restoration in St. Louis. Custom hair systems, laser therapy, extensions, and transplant consultations." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Brian Ivie Hair & Extensions" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brian Ivie Hair & Extensions | St. Louis Hair Restoration" />
        <meta name="twitter:description" content="Premier hair restoration in St. Louis. Custom hair systems, laser therapy, extensions, and transplant consultations." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
        />
      </Head>

      {/* Top Branding Emphasis */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-[#0a0a0a] text-[#c5a059] py-3 text-center"
      >
        <Link href="/" className="text-lg md:text-2xl font-black tracking-[0.4em] uppercase hover:text-white transition-colors">MYHAIRLOSS.COM</Link>
      </motion.div>

      <header className="glass-nav px-6 py-8 flex justify-between items-center">
        <Link href="/" className="flex flex-col group">
          <span className="text-xs font-serif italic text-[#c5a059] tracking-widest uppercase">Executive Hair Restoration</span>
          <h1 className="text-xl md:text-3xl font-bold tracking-tighter text-[#1a1a1a] leading-none">
            BRIAN IVIE <span className="font-light text-[#c5a059]">HAIR &amp; EXTENSIONS</span>
          </h1>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-10">
          <Link href="#services" className="nav-link">Services</Link>
          <Link href="/laser-therapy" className="nav-link">Laser Therapy</Link>
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/book" className="btn-primary">Book Session</Link>
        </nav>

        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <Menu className="w-8 h-8 text-[#1a1a1a]" />
        </button>
      </header>

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
              <Link href="#services" onClick={() => setMenuOpen(false)} className="text-4xl font-serif text-white hover:text-[#c5a059]">Services</Link>
              <Link href="/laser-therapy" onClick={() => setMenuOpen(false)} className="text-4xl font-serif text-white hover:text-[#c5a059]">Laser Therapy</Link>
              <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-4xl font-serif text-white hover:text-[#c5a059]">Shop</Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-4xl font-serif text-white hover:text-[#c5a059]">Blog</Link>
              <Link href="/book" onClick={() => setMenuOpen(false)} className="btn-primary mt-8 text-center">Book Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center bg-[#0a0a0a] overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80')] bg-cover bg-center"
          />
          <div className="container mx-auto relative z-10 px-6">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-6 font-bold">Elite Hair Restoration Specialist</h2>
                <h1 className="text-white text-6xl md:text-9xl font-bold mb-10 leading-[0.9] tracking-tighter">
                  Mastery in <br/><span className="italic font-serif font-light text-[#c5a059]">Every Strand.</span>
                </h1>
                <p className="text-white/60 text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
                  Executive restoration for the modern professional. Custom molded systems, clinical laser therapy, and premium artistry.
                </p>
                <div className="flex flex-col sm:flex-row gap-8">
                  <Link href="/book" className="btn-primary bg-[#c5a059] text-[#0a0a0a] hover:bg-white border-none">Book Consultation</Link>
                  <Link href="#services" className="btn-outline border-white/20 text-white hover:bg-white hover:text-[#0a0a0a]">Explore Services</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Private Studio Section */}
        <section className="section-padding bg-white overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.4em] mb-6 font-bold">Total Discretion</h2>
                <h2 className="text-5xl md:text-7xl mb-8 leading-[1.1] font-bold tracking-tighter">Private & <br/><span className="italic font-serif font-light text-[#c5a059]">Confidential.</span></h2>
                <p className="text-xl text-gray-500 mb-10 leading-relaxed font-light">
                  Brian operates out of his own private salon at **3674 Ashby Rd, St. Ann, MO 63074**. We understand that discretion is paramount—our studio is a sanctuary for those who value privacy while receiving elite-level care.
                </p>
                <div className="bg-[#fdfdfb] p-10 border border-gray-100 card-shadow">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-[#0a0a0a] text-[#c5a059]">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0a0a0a] mb-2 uppercase tracking-widest">St. Ann Studio</p>
                      <p className="text-xl font-serif text-gray-800">3674 Ashby Rd<br/>St. Ann, MO 63074</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 relative"
              >
                <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-125"></div>
                  <div className="absolute inset-0 bg-[#0a0a0a]/20"></div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-[#c5a059] p-12 hidden md:block">
                  <p className="text-white text-4xl font-serif italic">15+</p>
                  <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Years of Mastery</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Big 4 Services */}
        <section id="services" className="section-padding bg-[#fdfdfb]">
          <div className="container mx-auto">
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
            >
              {services.map((s, i) => (
                <motion.div key={i} variants={item} className="group">
                  <div className="w-16 h-16 bg-[#0a0a0a] text-[#c5a059] flex items-center justify-center mb-8 group-hover:bg-[#c5a059] group-hover:text-[#0a0a0a] transition-all duration-500">
                    {s.icon}
                  </div>
                  <h3 className="text-3xl mb-6 font-bold tracking-tight">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 font-light">{s.desc}</p>
                  <Link href={s.link} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a059] hover:text-[#0a0a0a] transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Laser Focus Section */}
        <section className="bg-[#0a0a0a] text-white overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 p-12 md:p-32 flex flex-col justify-center"
            >
              <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-8 font-bold">Clinical Technology</h2>
              <h2 className="text-6xl md:text-8xl mb-10 leading-[0.9] font-bold tracking-tighter">Laser Hair <br/><span className="italic font-serif font-light text-[#c5a059]">Therapy.</span></h2>
              <p className="text-white/60 text-xl mb-12 leading-relaxed font-light">
                The non-invasive gold standard. We utilize clinical-grade LLLT to stimulate follicle revitalization and maximize post-transplant density.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                {['ATP Stimulation', 'Scalp Microcirculation', 'Follicle Reversal', 'Post-Op Essential'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-[#c5a059] rounded-full"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/laser-therapy" className="btn-primary bg-[#c5a059] text-[#0a0a0a] self-start border-none">View Clinical Protocol</Link>
            </motion.div>
            <div className="lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1519415510236-855906a1b828?auto=format&fit=crop&q=80')] bg-cover bg-center min-h-[600px] grayscale opacity-50"></div>
          </div>
        </section>

        {/* Surprise Service: Repairs */}
        <section className="section-padding bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-24">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" alt="Hair Repair" />
                  </div>
                  <div className="absolute -top-10 -right-10 bg-[#0a0a0a] p-12 text-center">
                    <p className="text-[#c5a059] text-5xl font-serif italic">$50</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Per Hour</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.4em] mb-6 font-bold">Specialized Artistry</h2>
                <h2 className="text-5xl md:text-7xl mb-8 leading-[1.1] font-bold tracking-tighter">Hair Ventilation <br/>& Repairs.</h2>
                <p className="text-xl text-gray-500 mb-10 leading-relaxed font-light">
                  A unique, master-level service for system repairs and ventilation. We fill in bald spots and restore your system's original density with surgical precision.
                </p>
                <Link href="/book" className="btn-outline">Schedule Repair Session</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Suite */}
        <section id="products" className="section-padding bg-[#fdfdfb]">
          <div className="container mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-sm uppercase tracking-[0.5em] text-[#c5a059] mb-6 font-bold">Professional Supply</h2>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">The Product Suite.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((p, i) => (
                <div key={i} className="bg-white p-12 border border-gray-100 hover:border-[#c5a059] transition-all duration-500 group">
                  <h4 className="text-2xl mb-4 font-bold group-hover:text-[#c5a059] transition-colors">{p.name}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-24 p-16 bg-[#0a0a0a] text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-serif italic text-[#c5a059] mb-6">"We cut and style ANY hair system."</h3>
                <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-bold">Regardless of where it was purchased.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale">
            <CreditCard className="w-8 h-8" />
            {['VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'CARECREDIT'].map((p, i) => (
              <span key={i} className="text-[11px] font-black tracking-[0.4em]">{p}</span>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0a0a] text-white py-32 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-10 tracking-tighter uppercase">BRIAN IVIE <span className="font-light text-[#c5a059]">HAIR &amp; EXTENSIONS</span></h2>
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
              3674 Ashby Rd<br/>
              St. Ann, MO 63074<br/>
              <a href="tel:3145834843" className="text-white mt-10 block font-bold text-3xl hover:text-[#c5a059] transition-colors">(314) 583-IVIE</a>
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-32 pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">© {new Date().getFullYear()} Personal Image Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
