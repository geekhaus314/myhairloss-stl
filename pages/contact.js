import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#fdfdfb]">
      <Head>
        <title>Contact | Brian Ivie Hair and Extensions LLC</title>
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
          <Link href="/book" className="btn-primary py-3 px-6">Book Now</Link>
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
          <Link href="/book" onClick={() => setMenuOpen(false)} className="btn-primary bg-[#d4af37] text-[#1a1a1a] w-full max-w-xs py-5">Book Now</Link>
        </div>
      )}

      <main className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] mb-4">Connect With Us</h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">Get In Touch</h1>
              <p className="text-gray-500 text-lg mb-12 leading-relaxed">
                Whether you have a question about our laser protocols, want to discuss a custom system, or need to schedule a repair, we're here to help.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Location</h4>
                  <p className="text-lg font-semibold">Salon Lofts Heritage Place, 12511 Olive Blvd, Creve Coeur, MO 63141, Saint Louis, MO</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Email</h4>
                  <a href="mailto:info@myhairloss.com" className="text-lg font-semibold hover:text-[#d4af37]">info@myhairloss.com</a>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Phone</h4>
                  <a href="tel:+15551234567" className="text-lg font-semibold hover:text-[#d4af37]">(555) 123-4567</a>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 bg-white p-10 md:p-16 border border-gray-100 card-shadow">
              <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                  <input type="text" name="name" required className="w-full border-b-2 border-gray-100 py-3 focus:border-[#d4af37] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full border-b-2 border-gray-100 py-3 focus:border-[#d4af37] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Subject</label>
                  <select name="subject" className="w-full border-b-2 border-gray-100 py-3 focus:border-[#d4af37] outline-none transition-colors bg-transparent">
                    <option>Restoration Consultation</option>
                    <option>Laser Hair Therapy</option>
                    <option>Hair System Repair</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                  <textarea name="message" rows="4" required className="w-full border-b-2 border-gray-100 py-3 focus:border-[#d4af37] outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-5">Send Message</button>
              </form>
            </div>
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
