import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, MapPin, Phone, Mail, CheckCircle, Clock, Calendar } from 'lucide-react'

const consultationTypes = [
  {
    id: 'in-person',
    title: 'In-Person Consultation',
    icon: <MapPin className="w-6 h-6" />,
    duration: '30-45 Minutes',
    location: '3674 Ashby Rd, St. Ann, MO 63074',
    desc: 'Meet Brian at his private studio for a hands-on assessment. Includes scalp evaluation, color matching, and personalized treatment planning.',
    bestFor: 'New clients, hair system fitting, extensions, laser therapy',
  },
  {
    id: 'virtual',
    title: 'Virtual Consultation',
    icon: <Video className="w-6 h-6" />,
    duration: '20-30 Minutes',
    location: 'Zoom or Phone',
    desc: 'Discuss your hair loss concerns from anywhere. Brian will review photos, discuss options, and create a preliminary plan before your in-person visit.',
    bestFor: 'Out-of-town clients, initial assessment, follow-ups',
  },
]

const services = [
  'Restoration Consultation (New Client)',
  'Hair System Fitting',
  'Hair System Maintenance',
  'Hair Extensions',
  'Laser Hair Therapy',
  'Cut & Style',
  'Repair & Ventilation',
  'General Inquiry',
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
]

export default function Book() {
  const [consultationType, setConsultationType] = useState('in-person')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Restoration Consultation (New Client)',
    preferred_date: '',
    preferred_time: '',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consultationType,
          type: 'booking',
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Restoration Consultation (New Client)',
          preferred_date: '',
          preferred_time: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#fdfdfb] min-h-screen">
      <Head>
        <title>Book a Consultation | MYHAIRLOSS.COM</title>
        <meta name="description" content="Book an in-person or virtual consultation with Brian Ivie. Hair loss assessment, treatment planning, and personalized solutions in St. Louis." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* Top Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-[#0a0a0a] text-[#c5a059] py-3 text-center"
      >
        <Link href="/" className="text-lg md:text-2xl font-black tracking-[0.4em] uppercase hover:text-white transition-colors">MYHAIRLOSS.COM</Link>
      </motion.div>

      {/* Nav */}
      <header className="glass-nav px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span className="text-sm font-serif italic text-[#c5a059]">Expert Hair Restoration</span>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a1a1a] leading-none">
            BRIAN IVIE <span className="font-light">HAIR & EXTENSIONS</span>
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-[#0a0a0a] text-white py-20 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.4em] mb-4 font-bold">Confidential Consultations</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Book Your <br/><span className="italic font-serif font-light text-[#c5a059]">Session.</span></h1>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Every consultation is private and personalized. Choose in-person at our St. Ann studio or virtual from anywhere.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Consultation Type Selection */}
        <section className="section-padding">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.4em] mb-4 font-bold">Step 1</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Choose Consultation Type</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {consultationTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setConsultationType(type.id)}
                  className={`bg-white p-10 border text-left transition-all duration-300 ${
                    consultationType === type.id
                      ? 'border-[#c5a059] ring-2 ring-[#c5a059]/20 shadow-lg'
                      : 'border-gray-100 hover:border-[#c5a059]/50'
                  }`}
                >
                  <div className={`w-14 h-14 flex items-center justify-center mb-6 ${
                    consultationType === type.id
                      ? 'bg-[#c5a059] text-white'
                      : 'bg-[#0a0a0a] text-[#c5a059]'
                  }`}>
                    {type.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-3">{type.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {type.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {type.location}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{type.desc}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059]">Best for: {type.bestFor}</p>
                </motion.button>
              ))}
            </div>

            {/* Booking Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={consultationType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="text-center mb-10">
                  <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.4em] mb-4 font-bold">Step 2</h2>
                  <h3 className="text-3xl font-bold">Request Your Appointment</h3>
                </div>

                {status === 'success' ? (
                  <div className="bg-white p-12 border border-gray-100 card-shadow text-center">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Booking Request Received</h3>
                    <p className="text-gray-500 mb-4">
                      A confirmation email has been sent to your inbox.
                    </p>
                    <p className="text-gray-500 mb-8">
                      Brian will reach out within 24 hours to confirm your {consultationType === 'in-person' ? 'in-person' : 'virtual'} appointment.
                    </p>
                    <button onClick={() => setStatus(null)} className="btn-outline">
                      Book Another Session
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-gray-100 card-shadow space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light"
                          placeholder="(314) 583-4843"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Service *</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light"
                        >
                          {services.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Preferred Date *</label>
                        <input
                          type="date"
                          name="preferred_date"
                          value={formData.preferred_date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Preferred Time *</label>
                        <select
                          name="preferred_time"
                          value={formData.preferred_time}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((t, i) => (
                            <option key={i} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Tell Us About Your Goals</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light resize-none"
                        placeholder="Describe your hair loss concerns, what you've tried, and what you're hoping to achieve..."
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? 'Submitting...' : `Request ${consultationType === 'in-person' ? 'In-Person' : 'Virtual'} Appointment`}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">
                        Failed to submit. Please call (314) 583-4843.
                      </p>
                    )}
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Location Info */}
            {consultationType === 'in-person' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-16 bg-[#0a0a0a] text-white p-12 text-center"
              >
                <h3 className="text-[#c5a059] text-sm uppercase tracking-[0.4em] mb-4 font-bold">Studio Location</h3>
                <p className="text-2xl font-serif mb-2">3674 Ashby Rd</p>
                <p className="text-xl text-white/60 mb-6">St. Ann, MO 63074</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a href="tel:3145834843" className="flex items-center gap-2 text-white/80 hover:text-[#c5a059] transition-colors">
                    <Phone className="w-4 h-4" /> (314) 583-4843
                  </a>
                  <a href="mailto:info@myhairloss.com" className="flex items-center gap-2 text-white/80 hover:text-[#c5a059] transition-colors">
                    <Mail className="w-4 h-4" /> info@myhairloss.com
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white py-16 px-6 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
          © {new Date().getFullYear()} Personal Image Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
