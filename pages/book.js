import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Book() {
  const [menuOpen, setMenuOpen] = useState(false);

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookingOptions.map((opt, i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 card-shadow hover:border-[#d4af37] transition-all group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4 block">{opt.type}</span>
                <h3 className="text-2xl mb-4 group-hover:text-[#d4af37] transition-colors">{opt.title}</h3>
                <div className="flex justify-between items-center mb-6 text-sm text-gray-400 font-semibold uppercase tracking-widest">
                  <span>{opt.duration}</span>
                  <span className="text-[#1a1a1a]">{opt.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">{opt.desc}</p>
                <button className="btn-primary w-full">Request Appointment</button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-12 bg-[#1a1a1a] text-white text-center">
            <h3 className="text-[#d4af37] mb-4">Direct Booking</h3>
            <p className="text-white/60 mb-8">Prefer to talk to a real person? Call or text us directly to coordinate your visit.</p>
            <a href="tel:+15551234567" className="text-3xl font-bold hover:text-[#d4af37] transition-colors">(555) 123-4567</a>
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
