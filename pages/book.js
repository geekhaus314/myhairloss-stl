import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Book() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Restoration Consultation',
    preferred_date: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const bookingOptions = [
    {
      title: 'Restoration Consultation',
      duration: '30-45 Minutes',
      price: 'Private Session',
      desc: 'Ideal for new clients. We discuss hair replacement, laser therapy, and transplant options.',
      type: 'New Client'
    },
    {
      title: 'Hair System Maintenance',
      duration: '60-90 Minutes',
      price: 'Standard Rate',
      desc: 'Regular cleaning, re-bonding, and styling for existing hair system wearers.',
      type: 'Returning Client'
    },
    {
      title: 'Cut & Style Only',
      duration: '45 Minutes',
      price: 'Standard Rate',
      desc: 'Precision haircut and styling for ANY hair system, regardless of where it was purchased.',
      type: 'Service'
    },
    {
      title: 'Repair & Ventilation',
      duration: 'Hourly Rate',
      price: '$50/Hour',
      desc: 'Expert repair work, filling in bald spots, and system ventilation.',
      type: 'Specialized'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'booking' })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Restoration Consultation',
          preferred_date: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfdfb]">
      <Head>
        <title>Book Session | Brian Ivie Hair and Extensions LLC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="bg-[#1a1a1a] text-[#d4af37] py-3 text-center">
        <Link href="/" className="text-lg md:text-2xl font-black tracking-[0.3em] uppercase text-[#d4af37] hover:text-white transition-colors">MYHAIRLOSS.COM</Link>
      </div>

      <header className="glass-nav px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span className="text-sm font-serif italic text-[#d4af37]">Executive Hair Restoration</span>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a1a1a] leading-none">
            BRIAN IVIE <span className="font-light">HAIR & EXTENSIONS</span>
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/laser-therapy" className="nav-link">Laser Therapy</Link>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5">
          <div className="h-0.5 w-6 bg-[#1a1a1a]" />
          <div className="h-0.5 w-6 bg-[#1a1a1a]" />
          <div className="h-0.5 w-6 bg-[#1a1a1a]" />
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center p-6">
          <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-[#d4af37] text-4xl">&times;</button>
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-serif text-white mb-8">Home</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)} className="text-2xl font-serif text-white mb-8">Services</Link>
          <Link href="/laser-therapy" onClick={() => setMenuOpen(false)} className="text-2xl font-serif text-white mb-8">Laser Therapy</Link>
        </div>
      )}

      <main className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] mb-4">Secure Your Appointment</h2>
            <h1 className="text-5xl md:text-6xl font-bold mb-8">Book a Session</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Please select the service you require. For new clients, we recommend starting with a Restoration Consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {bookingOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setFormData({ ...formData, service: opt.title })}
                className={`bg-white p-10 border text-left card-shadow transition-all group ${
                  formData.service === opt.title
                    ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                    : 'border-gray-100 hover:border-[#d4af37]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4 block">{opt.type}</span>
                <h3 className="text-2xl mb-4 group-hover:text-[#d4af37] transition-colors">{opt.title}</h3>
                <div className="flex justify-between items-center mb-6 text-sm text-gray-400 font-semibold uppercase tracking-widest">
                  <span>{opt.duration}</span>
                  <span className="text-[#1a1a1a]">{opt.price}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl mb-10 text-center">Request Appointment</h2>

            {status === 'success' ? (
              <div className="bg-white p-12 border border-gray-100 card-shadow text-center">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                <h3 className="text-2xl font-bold mb-4">Request Received</h3>
                <p className="text-gray-500 mb-8">Brian will reach out within 24 hours to confirm your appointment.</p>
                <button onClick={() => setStatus(null)} className="btn-outline">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-gray-100 card-shadow space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#d4af37] outline-none transition-colors font-light" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#d4af37] outline-none transition-colors font-light" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#d4af37] outline-none transition-colors font-light" placeholder="(314) 583-4843" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Service</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#d4af37] outline-none transition-colors font-light">
                      {bookingOptions.map((opt, i) => (
                        <option key={i} value={opt.title}>{opt.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Preferred Date</label>
                  <input type="date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#d4af37] outline-none transition-colors font-light" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Additional Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#d4af37] outline-none transition-colors font-light resize-none" placeholder="Tell us about your goals..." />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Sending Request...' : 'Submit Booking Request'}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">Failed to send. Please call (314) 583-4843.</p>
                )}
              </form>
            )}
          </div>

          <div className="mt-16 p-12 bg-[#1a1a1a] text-white text-center">
            <h3 className="text-[#d4af37] mb-4">Need Immediate Assistance?</h3>
            <p className="text-white/60 mb-8">Call or text us directly to coordinate your visit.</p>
            <a href="tel:3145834843" className="text-3xl font-bold hover:text-[#d4af37] transition-colors">(314) 583-4843</a>
          </div>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">BRIAN IVIE <span className="font-light text-[#d4af37]">HAIR & EXTENSIONS</span></h2>
          <p className="text-[10px] text-white/20 uppercase tracking-widest">© {new Date().getFullYear()} Brian Ivie Hair and Extensions LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
