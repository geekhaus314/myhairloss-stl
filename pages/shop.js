import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'
import Layout from '../components/Layout'

const services = [
  {
    id: 'system-fitting',
    name: 'Custom Hair System Fitting',
    price: 'Starting at $200',
    description: 'Professional fitting, color matching, and styling. Each system is custom-molded to your exact specifications.',
    tags: ['Hair Systems', 'Custom Fitting', 'Color Match'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    link: '/book',
    linkText: 'Inquire Now',
    isService: true,
  },
  {
    id: 'system-maintenance',
    name: 'Hair System Maintenance',
    price: 'Quarterly Service',
    description: 'Professional cleaning, re-bonding, and styling every 3-4 months keeps your system looking natural.',
    tags: ['Maintenance', 'Re-bonding', 'Styling'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.203-5.203m0 0a2.25 2.25 0 113.182-3.182m-3.182 3.182L15 15m-3.182-3.182l5.203 5.203m0 0a2.25 2.25 0 11-3.182 3.182m3.182-3.182L15 9m3.182 3.182L15 9m3.182 3.182a2.25 2.25 0 11-3.182 3.182m3.182-3.182L15 15" />
      </svg>
    ),
    link: '/book',
    linkText: 'Inquire Now',
    isService: true,
  },
  {
    id: 'extensions',
    name: 'Hair Extensions',
    price: 'Custom Quote',
    description: 'Premium extensions expertly applied for seamless, natural volume and length.',
    tags: ['Extensions', 'Volume', 'Length'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    link: '/book',
    linkText: 'Inquire Now',
    isService: true,
  },
  {
    id: 'laser-therapy',
    name: 'Laser Hair Therapy',
    price: 'Clinical Sessions',
    description: 'FDA-cleared LLLT to stimulate follicle revitalization. Best results with professional administration.',
    tags: ['LLLT', 'FDA-Cleared', 'Follicle Stimulation'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    link: '/laser-therapy',
    linkText: 'Inquire Now',
    isService: true,
  },
]

const products = [
  {
    id: 'ketoconazole-shampoo',
    name: 'Ketoconazole 2% Shampoo',
    price: 28,
    description: 'Prescription-strength DHT suppression at the scalp level. Clinically proven to support hair retention. Use 2-3x weekly.',
    tags: ['DHT blocker', 'anti-dandruff', 'scalp health'],
    color: 'from-amber-900/40 to-amber-800/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    id: 'adhesive-tape',
    name: 'Professional Adhesive Tape',
    subtitle: 'Walker Tape Ultra Hold',
    price: 24,
    description: 'Medical-grade tape for secure hair system bonding. Holds 3-4 weeks. Professional application recommended for best results.',
    tags: ['hair system tape', 'adhesive'],
    color: 'from-yellow-900/40 to-yellow-800/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'liquid-adhesive',
    name: 'Liquid Adhesive',
    subtitle: 'Ghost Bond XL',
    price: 32,
    description: 'Medical-grade bonding for active lifestyles. Water-resistant, hypoallergenic. Brian recommends professional application.',
    tags: ['hair system glue', 'adhesive'],
    color: 'from-stone-800/40 to-stone-700/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: 'adhesive-remover',
    name: 'Adhesive Remover',
    subtitle: 'C-22 Solvent',
    price: 18,
    description: 'Safely dissolve adhesive bonds without damaging your system or irritating your scalp.',
    tags: ['adhesive remover', 'cleanup'],
    color: 'from-emerald-900/40 to-emerald-800/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'boar-bristle-brush',
    name: 'Soft Round Boar Bristle Brush',
    price: 22,
    description: 'Minimizes hair shedding and breakage while distributing natural oils. Essential for daily maintenance of natural hair and systems.',
    tags: ['hair brush', 'daily care'],
    color: 'from-orange-900/40 to-orange-800/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    id: 'leave-in-conditioner',
    name: 'Leave-In Conditioner Serum',
    price: 26,
    description: 'Lightweight formula that detangles, protects, and extends the life of your hair system or natural hair.',
    tags: ['conditioner', 'hair care'],
    color: 'from-rose-900/40 to-rose-800/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 'uv-protection-spray',
    name: 'UV Protection Spray',
    price: 20,
    description: 'Shields hair from sun damage and color fading. Essential for active clients.',
    tags: ['UV protection', 'hair care'],
    color: 'from-sky-900/40 to-sky-800/20',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Shop() {
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(null)

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleCheckout = async (product) => {
    setLoading(product.id)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        showToast('Checkout unavailable. Please call or email to order.', 'error')
      }
    } catch {
      showToast('Something went wrong. Please call or email to order.', 'error')
    }
    setLoading(null)
  }

  return (
    <Layout dark={true}>
      <Head>
        <title>Shop Hair Restoration Products &amp; Services | Brian Ivie Hair &amp; Extensions</title>
        <meta name="description" content="Professional hair care products, custom hair systems, maintenance services, and laser therapy from Brian Ivie — St. Louis hair restoration specialist." />
        <link rel="canonical" href={`${SITE_URL}/shop`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shop | Brian Ivie Hair & Extensions" />
        <meta property="og:description" content="Professional hair care products, custom systems, and services from St. Louis's premier hair restoration specialist." />
        <meta property="og:url" content={`${SITE_URL}/shop`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop | Brian Ivie Hair & Extensions" />
        <meta name="twitter:description" content="Professional hair care products, custom systems, and services." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md border"
            style={{
              backgroundColor: toast.type === 'error' ? 'rgba(180, 50, 50, 0.9)' : 'rgba(197, 160, 89, 0.15)',
              borderColor: toast.type === 'error' ? 'rgba(180, 50, 50, 0.5)' : 'rgba(197, 160, 89, 0.3)',
              color: '#fdfdfb',
            }}
          >
            <p className="text-sm font-sans">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Hero */}
        <section className="section-padding pt-40 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm uppercase tracking-[0.3em] mb-4 font-sans"
              style={{ color: '#c5a059' }}
            >
              Professional Solutions
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              style={{ color: '#fdfdfb' }}
            >
              Products &amp; Services
            </h1>
            <p
              className="max-w-2xl mx-auto text-lg font-sans leading-relaxed"
              style={{ color: 'rgba(253, 253, 251, 0.6)' }}
            >
              Every recommendation is backed by years of hands-on experience. Products are most effective 
              when paired with professional guidance — and that&apos;s exactly what we provide.
            </p>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="section-padding py-20" style={{ backgroundColor: 'rgba(197, 160, 89, 0.03)' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p
                className="text-sm uppercase tracking-[0.3em] mb-3 font-sans"
                style={{ color: '#c5a059' }}
              >
                Expert Care
              </p>
              <h2
                className="text-3xl md:text-4xl font-serif mb-4"
                style={{ color: '#fdfdfb' }}
              >
                Professional Services
              </h2>
              <p
                className="max-w-xl mx-auto font-sans"
                style={{ color: 'rgba(253, 253, 251, 0.5)' }}
              >
                Our strongest recommendation: let a specialist handle the details. 
                Precision matters with hair systems.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={item}
                  className="card-shadow rounded-xl p-8 border transition-all duration-300 hover:border-opacity-50 group"
                  style={{
                    backgroundColor: 'rgba(253, 253, 251, 0.02)',
                    borderColor: 'rgba(197, 160, 89, 0.1)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: 'rgba(197, 160, 89, 0.1)',
                      color: '#c5a059',
                    }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="text-xl font-serif"
                      style={{ color: '#fdfdfb' }}
                    >
                      {service.name}
                    </h3>
                    <span
                      className="text-sm font-sans whitespace-nowrap px-3 py-1 rounded-full border"
                      style={{
                        color: '#c5a059',
                        borderColor: 'rgba(197, 160, 89, 0.3)',
                        backgroundColor: 'rgba(197, 160, 89, 0.05)',
                      }}
                    >
                      {service.price}
                    </span>
                  </div>
                  <p
                    className="font-sans text-sm leading-relaxed mb-5"
                    style={{ color: 'rgba(253, 253, 251, 0.5)' }}
                  >
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-sans px-2 py-0.5 rounded"
                        style={{
                          color: 'rgba(253, 253, 251, 0.4)',
                          backgroundColor: 'rgba(253, 253, 251, 0.05)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={service.link}>
                    <a
                      className="btn-outline inline-flex items-center gap-2 text-sm font-sans px-5 py-2.5 rounded-lg transition-all duration-300 hover:bg-[#c5a059] hover:text-[#0a0a0a] hover:border-[#c5a059]"
                      style={{ borderColor: 'rgba(197, 160, 89, 0.4)', color: '#c5a059' }}
                    >
                      {service.linkText}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px" style={{ backgroundColor: 'rgba(197, 160, 89, 0.15)' }} />
        </div>

        {/* Products Section */}
        <section className="section-padding py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p
                className="text-sm uppercase tracking-[0.3em] mb-3 font-sans"
                style={{ color: '#c5a059' }}
              >
                Curated Selection
              </p>
              <h2
                className="text-3xl md:text-4xl font-serif mb-4"
                style={{ color: '#fdfdfb' }}
              >
                Hair Care Products
              </h2>
              <p
                className="max-w-xl mx-auto font-sans"
                style={{ color: 'rgba(253, 253, 251, 0.5)' }}
              >
                These are the products we trust and use daily. For the best results, 
                ask Brian how they fit into your personalized plan.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={item}
                  className="card-shadow rounded-xl overflow-hidden border transition-all duration-300 hover:border-opacity-50 group flex flex-col"
                  style={{
                    backgroundColor: 'rgba(253, 253, 251, 0.02)',
                    borderColor: 'rgba(197, 160, 89, 0.08)',
                  }}
                >
                  {/* Image Placeholder */}
                  <div
                    className={`h-48 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.3) 0%, transparent 70%)',
                      }}
                    />
                    <div
                      className="relative z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ color: '#fdfdfb' }}
                    >
                      {product.icon}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2">
                      <h3
                        className="text-lg font-serif leading-tight"
                        style={{ color: '#fdfdfb' }}
                      >
                        {product.name}
                      </h3>
                      {product.subtitle && (
                        <p
                          className="text-xs font-sans mt-0.5 italic"
                          style={{ color: 'rgba(197, 160, 89, 0.7)' }}
                        >
                          {product.subtitle}
                        </p>
                      )}
                    </div>

                    <p
                      className="text-sm font-sans leading-relaxed mb-4 flex-1"
                      style={{ color: 'rgba(253, 253, 251, 0.45)' }}
                    >
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider font-sans px-2 py-0.5 rounded"
                          style={{
                            color: 'rgba(197, 160, 89, 0.7)',
                            backgroundColor: 'rgba(197, 160, 89, 0.08)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: 'rgba(253, 253, 251, 0.06)' }}>
                      <span
                        className="text-xl font-serif"
                        style={{ color: '#c5a059' }}
                      >
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleCheckout(product)}
                        disabled={loading === product.id}
                        className="btn-primary text-sm font-sans px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: '#c5a059',
                          color: '#0a0a0a',
                        }}
                      >
                        {loading === product.id ? 'Loading...' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section-padding py-20" style={{ backgroundColor: 'rgba(197, 160, 89, 0.04)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-3xl md:text-4xl font-serif mb-5"
                style={{ color: '#fdfdfb' }}
              >
                Not Sure What You Need?
              </h2>
              <p
                className="font-sans leading-relaxed mb-8 max-w-xl mx-auto"
                style={{ color: 'rgba(253, 253, 251, 0.5)' }}
              >
                Every hair loss situation is unique. Brian will assess your specific needs and recommend 
                the right combination of services and products — no guesswork involved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <a
                    className="btn-primary inline-flex items-center justify-center gap-2 font-sans px-8 py-3 rounded-lg transition-all duration-300"
                    style={{ backgroundColor: '#c5a059', color: '#0a0a0a' }}
                  >
                    Book a Consultation
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </Link>
                <a
                  href="tel:+13145551234"
                  className="btn-outline inline-flex items-center justify-center gap-2 font-sans px-8 py-3 rounded-lg transition-all duration-300 hover:bg-[#c5a059] hover:text-[#0a0a0a] hover:border-[#c5a059]"
                  style={{ borderColor: 'rgba(197, 160, 89, 0.4)', color: '#c5a059' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
