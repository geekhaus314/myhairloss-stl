import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_URL, DEFAULT_OG_IMAGE, generateShopSchema } from '../lib/seo'
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
    name: 'Nizoral A-D Anti-Dandruff Shampoo',
    subtitle: 'Ketoconazole 1% · 7 fl oz',
    brand: 'Nizoral',
    sku: 'Nizoral A-D 7 fl oz',
    price: 16,
    description: 'The strongest over-the-counter ketoconazole shampoo (1%) — the formula hair loss specialists trust most. Clinically proven to fight dandruff and support scalp health for hair retention. Use 2-3x weekly.',
    tags: ['ketoconazole', 'anti-dandruff', 'scalp health'],
    image: '/images/products/nizoral-ad.png',
  },
  {
    id: 'adhesive-tape',
    name: 'Walker Tape Ultra Hold Tape',
    subtitle: '1" × 12 yd roll',
    brand: 'Walker Tape',
    sku: 'WK-ULHT-RL-0112',
    price: 19,
    description: 'The industry-standard 1-inch tape for hair system bonding. Holds 3-4 weeks, sweat-resistant, and gentle enough for daily-wear clients. Professional application recommended for best results.',
    tags: ['hair system tape', 'adhesive'],
    image: '/images/products/walker-ultra-hold.jpg',
  },
  {
    id: 'liquid-adhesive',
    name: 'Ghost Bond XL Adhesive',
    subtitle: '1.3 oz · clear, water-resistant',
    brand: 'Ghost Bond',
    sku: 'PHL202GBXLNTLNTOz1.3PB',
    price: 17,
    description: 'The #1 liquid adhesive in the hair system industry. Clear, hypoallergenic, and water-resistant bonding that holds through workouts and swims. Dries fast and removes clean.',
    tags: ['hair system glue', 'adhesive'],
    image: '/images/products/ghost-bond-xl.png',
  },
  {
    id: 'adhesive-remover',
    name: 'Walker Tape C-22 Solvent Spray',
    subtitle: '4 fl oz spray',
    brand: 'Walker Tape',
    sku: 'WK-C022-SY-04OZ',
    price: 15,
    description: 'Safely dissolves adhesive bonds without damaging your system or irritating your scalp. The standard remover used in professional studios.',
    tags: ['adhesive remover', 'cleanup'],
    image: '/images/products/walker-c22.jpg',
  },
  {
    id: 'scalp-protector-spray',
    name: 'Walker Tape Scalp Protector Spray',
    subtitle: '2 fl oz spray',
    brand: 'Walker Tape',
    sku: 'WK-SCPR-SY-02OZ',
    price: 13,
    description: 'Protects your scalp before every re-bond. Dries to a protective film that shields skin from adhesive irritation while helping bonds hold longer. Essential for sensitive scalps.',
    tags: ['scalp protection', 'prep'],
    image: '/images/products/walker-scalp-protector.png',
  },
  {
    id: 'boar-bristle-brush',
    name: 'Spornette Italian Rounder Brush',
    subtitle: 'Extra boar bristle · #854',
    brand: 'Spornette',
    sku: '854',
    price: 34,
    description: 'Professional-grade round boar bristle brush that minimizes hair shedding and breakage while distributing natural oils. Essential for daily maintenance of natural hair and systems.',
    tags: ['hair brush', 'daily care'],
    image: '/images/products/spornette-854.jpg',
  },
  {
    id: 'leave-in-conditioner',
    name: 'Olaplex No. 6 Bond Smoother',
    subtitle: '100 ml · leave-in styling treatment',
    brand: 'Olaplex',
    sku: '20142954',
    price: 28,
    description: 'The bond-repairing leave-in styler that protects hair systems and natural hair from damage and frizz. Repairs broken bonds for smoother, shinier, healthier-looking results.',
    tags: ['bond repair', 'hair care'],
    image: '/images/products/olaplex-no6.png',
  },
  {
    id: 'nioxin-system-2',
    name: 'Nioxin System 2 Cleanser Shampoo',
    subtitle: '33.8 fl oz · salon size',
    brand: 'Nioxin',
    sku: '81629284',
    price: 26,
    description: 'The salon-standard derma-purifying cleanser for noticeably thinning natural hair. Removes sebum, DHT, and environmental residue for a healthier scalp. Use with professional guidance.',
    tags: ['thinning hair', 'scalp health'],
    image: '/images/products/nioxin-system2.jpg',
  },
]

const stockHairSystems = [
  {
    id: 'hollywood-lace-front',
    name: 'Champion Full French Lace System',
    subtitle: 'Lordhair · full French lace base',
    brand: 'Lordhair',
    sku: 'Champion',
    price: 329,
    description: 'Lordhair\'s #1 stock system: full French lace with pre-bleached knots for an undetectable hairline. The athletes\' choice — breathable, durable, and hand-tied 100% human hair.',
    tags: ['french lace', 'natural hairline'],
    image: '/images/products/lordhair-champion.jpg',
  },
  {
    id: 'swiss-lace-system',
    name: 'Air Swiss Lace System',
    subtitle: 'Lordhair · ultra-fine Swiss lace',
    brand: 'Lordhair',
    sku: 'Air',
    price: 349,
    description: 'Ultra-fine Swiss lace base with hand-tied ventilated hair for the most natural-looking scalp simulation. Lightweight, breathable, and virtually invisible. Ideal for warm climates and active lifestyles.',
    tags: ['swiss lace', 'breathable', 'premium'],
    image: '/images/products/lordhair-air.jpg',
  },
  {
    id: 'french-lace-hybrid',
    name: 'Neo Hybrid System',
    subtitle: 'Lordhair · lace front, skin perimeter',
    brand: 'Lordhair',
    sku: 'Neo',
    price: 339,
    description: 'Lordhair\'s most versatile stock system: a natural French lace front with a durable skin perimeter. Balances the breathability of lace with the security of skin — the best of both worlds.',
    tags: ['hybrid', 'french lace', 'durable'],
    image: '/images/products/lordhair-neo.jpg',
  },
  {
    id: 'mono-base-system',
    name: 'Champion-M Medium Density System',
    subtitle: 'Lordhair · full French lace, medium density',
    brand: 'Lordhair',
    sku: 'Champion-M',
    price: 284,
    originalPrice: 329,
    description: 'The medium-density version of the Champion — a full French lace base at a lighter, more natural density. Great entry-level stock option with premium quality at an accessible price.',
    tags: ['french lace', 'medium density', 'value'],
    image: '/images/products/lordhair-champion-m.jpg',
  },
]

const womenWigs = [
  {
    id: 'lace-front-straight',
    name: 'Undetectable HD Lace Straight Wig',
    subtitle: 'Chinalacewig CF247 · 13x4 HD lace',
    brand: 'Chinalacewig',
    sku: 'CF247',
    price: 269,
    description: '100% virgin human hair, one donor. Pre-plucked and pre-bleached hairline with 180% density for a natural, undetectable finish. Perfect for everyday wear or special occasions.',
    tags: ['lace front', 'straight', 'HD lace'],
    image: '/images/products/clw-cf247.jpg',
  },
  {
    id: 'lace-front-highlight',
    name: 'Highlight Body Wave Wig',
    subtitle: 'Chinalacewig NCF71 · HD lace highlight',
    brand: 'Chinalacewig',
    sku: 'NCF71',
    price: 285,
    description: 'Show-stopping highlight color body wave with undetectable real HD lace. Pre-plucked with baby hair for a realistic hairline, and a body wave texture that holds curls beautifully.',
    tags: ['highlight', 'body wave', 'HD lace'],
    image: '/images/products/clw-ncf71.png',
  },
  {
    id: 'lace-front-straight-2',
    name: 'Silky Straight Blonde Wig',
    subtitle: 'Chinalacewig NCF76 · 13x4 transparent lace',
    brand: 'Chinalacewig',
    sku: 'NCF76',
    price: 239,
    description: 'Sleek blonde silky straight wig with transparent 13x4 lace that melts into any skin tone. Pre-bleached knots, adjustable band, and 150% density for instant, comfortable wear.',
    tags: ['silky straight', 'blonde', 'transparent lace'],
    image: '/images/products/clw-ncf76.jpg',
  },
  {
    id: 'essence-premium-wig',
    name: 'Ombre HD Film Lace Wig',
    subtitle: 'Chinalacewig NCF70 · 13x4/13x6 HD film lace',
    brand: 'Chinalacewig',
    sku: 'NCF70',
    price: 299,
    description: 'Ombre color body wave on ultra-thin HD film lace — 180% density, 22" length, 100% virgin hair from one donor. Our most premium stock wig for a flawless, natural finish.',
    tags: ['ombre', 'body wave', 'premium'],
    image: '/images/products/clw-ncf70.jpg',
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
  const [inquiryProduct, setInquiryProduct] = useState(null)
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' })

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
          brand: product.brand,
          sku: product.sku,
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

  const handleInquiry = (product) => {
    setInquiryProduct(product)
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in the ${product.name}. Please send me pricing and availability.`,
    })
  }

  const submitInquiry = async (e) => {
    e.preventDefault()
    if (!inquiryForm.name || !inquiryForm.email) {
      showToast('Name and email are required.', 'error')
      return
    }
    setLoading(inquiryProduct.id)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryForm.name,
          email: inquiryForm.email,
          phone: inquiryForm.phone,
          service: inquiryProduct.name,
          message: inquiryForm.message,
          type: 'inquiry',
        }),
      })
      const data = await res.json()
      if (res.ok) {
        showToast('Inquiry sent! Brian will reach out soon.', 'success')
        setInquiryProduct(null)
      } else {
        showToast('Something went wrong. Please email brian@myhairloss.com directly.', 'error')
      }
    } catch {
      showToast('Something went wrong. Please email brian@myhairloss.com directly.', 'error')
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateShopSchema([...stockHairSystems, ...womenWigs, ...products])),
          }}
        />
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

        {/* Stock Hair Systems Section */}
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
                Ready to Wear
              </p>
              <h2
                className="text-3xl md:text-4xl font-serif mb-4"
                style={{ color: '#fdfdfb' }}
              >
                Premade Hair Systems
              </h2>
              <p
                className="max-w-xl mx-auto font-sans"
                style={{ color: 'rgba(253, 253, 251, 0.5)' }}
              >
                Stock hair systems available for immediate order. Premium 100% human hair,
                pre-sized and ready to be customized to your exact needs.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {stockHairSystems.map((system) => (
                <motion.div
                  key={system.id}
                  variants={item}
                  className="card-shadow rounded-xl overflow-hidden border transition-all duration-300 hover:border-opacity-50 group flex flex-col"
                  style={{
                    backgroundColor: 'rgba(253, 253, 251, 0.02)',
                    borderColor: 'rgba(197, 160, 89, 0.08)',
                  }}
                >
                  {system.image && (
                    <div className="h-52 bg-[#111] overflow-hidden relative">
                      <img
                        src={system.image}
                        alt={system.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2">
                      <h3
                        className="text-lg font-serif leading-tight"
                        style={{ color: '#fdfdfb' }}
                      >
                        {system.name}
                      </h3>
                      {system.subtitle && (
                        <p
                          className="text-xs font-sans mt-0.5 italic"
                          style={{ color: 'rgba(197, 160, 89, 0.7)' }}
                        >
                          {system.subtitle}
                        </p>
                      )}
                      {(system.brand || system.sku) && (
                        <p
                          className="text-[10px] uppercase tracking-wider font-sans mt-1"
                          style={{ color: 'rgba(253, 253, 251, 0.3)' }}
                        >
                          {[system.brand, system.sku].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <p
                      className="text-sm font-sans leading-relaxed mb-4 flex-1"
                      style={{ color: 'rgba(253, 253, 251, 0.45)' }}
                    >
                      {system.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {system.tags.map((tag) => (
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
                      <div>
                        <span
                          className="text-xl font-serif block"
                          style={{ color: '#c5a059' }}
                        >
                          ${system.price}
                        </span>
                        {system.originalPrice && (
                          <span
                            className="text-xs font-sans line-through"
                            style={{ color: 'rgba(253, 253, 251, 0.25)' }}
                          >
                            ${system.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleInquiry(system)}
                        disabled={loading === system.id}
                        className="btn-primary text-sm font-sans px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: '#c5a059',
                          color: '#0a0a0a',
                        }}
                      >
                        {loading === system.id ? 'Loading...' : 'Inquire'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Women's Wigs Section */}
        <section className="section-padding py-20" style={{ backgroundColor: 'rgba(197, 160, 89, 0.02)' }}>
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
                For Her
              </p>
              <h2
                className="text-3xl md:text-4xl font-serif mb-4"
                style={{ color: '#fdfdfb' }}
              >
                Women&apos;s Premium Wigs
              </h2>
              <p
                className="max-w-xl mx-auto font-sans"
                style={{ color: 'rgba(253, 253, 251, 0.5)' }}
              >
                Premium human hair wigs for women experiencing thinning, traction alopecia, breakage, 
                or simply wanting a versatile new look. Expertly sourced and ready to wear.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {womenWigs.map((wig) => (
                <motion.div
                  key={wig.id}
                  variants={item}
                  className="card-shadow rounded-xl overflow-hidden border transition-all duration-300 hover:border-opacity-50 group flex flex-col"
                  style={{
                    backgroundColor: 'rgba(253, 253, 251, 0.02)',
                    borderColor: 'rgba(197, 160, 89, 0.08)',
                  }}
                >
                  {wig.image && (
                    <div className="h-52 bg-[#111] overflow-hidden relative">
                      <img
                        src={wig.image}
                        alt={wig.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2">
                      <h3
                        className="text-lg font-serif leading-tight"
                        style={{ color: '#fdfdfb' }}
                      >
                        {wig.name}
                      </h3>
                      {wig.subtitle && (
                        <p
                          className="text-xs font-sans mt-0.5 italic"
                          style={{ color: 'rgba(197, 160, 89, 0.7)' }}
                        >
                          {wig.subtitle}
                        </p>
                      )}
                      {(wig.brand || wig.sku) && (
                        <p
                          className="text-[10px] uppercase tracking-wider font-sans mt-1"
                          style={{ color: 'rgba(253, 253, 251, 0.3)' }}
                        >
                          {[wig.brand, wig.sku].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <p
                      className="text-sm font-sans leading-relaxed mb-4 flex-1"
                      style={{ color: 'rgba(253, 253, 251, 0.45)' }}
                    >
                      {wig.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {wig.tags.map((tag) => (
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
                        ${wig.price}
                      </span>
                      <button
                        onClick={() => handleInquiry(wig)}
                        disabled={loading === wig.id}
                        className="btn-primary text-sm font-sans px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: '#c5a059',
                          color: '#0a0a0a',
                        }}
                      >
                        {loading === wig.id ? 'Loading...' : 'Inquire'}
                      </button>
                    </div>
                  </div>
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
                  {/* Product Image */}
                  {product.image && (
                    <div className="h-48 bg-[#111] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

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
                      {(product.brand || product.sku) && (
                        <p
                          className="text-[10px] uppercase tracking-wider font-sans mt-1"
                          style={{ color: 'rgba(253, 253, 251, 0.3)' }}
                        >
                          {[product.brand, product.sku].filter(Boolean).join(' · ')}
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
                  href="tel:3145834843"
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

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={() => setInquiryProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-xl p-6 border overflow-hidden"
              style={{
                backgroundColor: '#0f0f0f',
                borderColor: 'rgba(197, 160, 89, 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif" style={{ color: '#fdfdfb' }}>
                  Inquire About
                </h3>
                <button onClick={() => setInquiryProduct(null)} className="p-1 rounded hover:bg-white/5 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'rgba(253,253,251,0.5)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm font-sans mb-5" style={{ color: '#c5a059' }}>
                {inquiryProduct.name}
              </p>
              <form onSubmit={submitInquiry}>
                <div className="space-y-3 mb-5">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-sans border transition-colors focus:outline-none"
                    style={{
                      backgroundColor: 'rgba(253,253,251,0.04)',
                      borderColor: 'rgba(197,160,89,0.15)',
                      color: '#fdfdfb',
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-sans border transition-colors focus:outline-none"
                    style={{
                      backgroundColor: 'rgba(253,253,251,0.04)',
                      borderColor: 'rgba(197,160,89,0.15)',
                      color: '#fdfdfb',
                    }}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-sans border transition-colors focus:outline-none"
                    style={{
                      backgroundColor: 'rgba(253,253,251,0.04)',
                      borderColor: 'rgba(197,160,89,0.15)',
                      color: '#fdfdfb',
                    }}
                  />
                  <textarea
                    placeholder="Message"
                    rows={3}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-sans border transition-colors focus:outline-none resize-none"
                    style={{
                      backgroundColor: 'rgba(253,253,251,0.04)',
                      borderColor: 'rgba(197,160,89,0.15)',
                      color: '#fdfdfb',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading === inquiryProduct.id}
                  className="w-full btn-primary text-sm font-sans px-5 py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50"
                  style={{ backgroundColor: '#c5a059', color: '#0a0a0a' }}
                >
                  {loading === inquiryProduct.id ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}
