import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
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
    <div className="bg-[#fdfdfb] min-h-screen">
      <Head>
        <title>Contact | Brian Ivie Hair and Extensions LLC</title>
      </Head>

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
            BRIAN IVIE <span className="font-light text-[#c5a059]">HAIR & EXTENSIONS LLC</span>
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/laser-therapy" className="nav-link">Laser Therapy</Link>
          <Link href="/book" className="btn-primary">Book Session</Link>
        </nav>
      </header>

      <main className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-6 font-bold">Get In Touch</h2>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">Let's Discuss <br/><span className="italic font-serif font-light text-[#c5a059]">Your Look.</span></h1>
              
              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-[#0a0a0a] text-[#c5a059] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Direct Line</p>
                    <a href="tel:3145834843" className="text-3xl font-serif hover:text-[#c5a059] transition-colors">(314) 583-4843</a>
                  </div>
                </div>

                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-[#0a0a0a] text-[#c5a059] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Email</p>
                    <p className="text-xl font-serif leading-relaxed">
                      <a href="mailto:info@myhairloss.com" className="hover:text-[#c5a059] transition-colors">info@myhairloss.com</a><br/>
                      <a href="mailto:booking@myhairloss.com" className="hover:text-[#c5a059] transition-colors">booking@myhairloss.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-[#0a0a0a] text-[#c5a059] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Private Studio</p>
                    <p className="text-2xl font-serif leading-relaxed">
                      Salon Lofts Heritage Place<br/>
                      12511 Olive Blvd, Suite 25<br/>
                      Creve Coeur, MO 63141
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-12 md:p-20 card-shadow border border-gray-100"
            >
              {status === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Inquiry Received</h3>
                  <p className="text-gray-500 font-light">Brian will reach out to you personally within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="mt-10 text-xs font-bold uppercase tracking-widest text-[#c5a059]">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <input type="hidden" name="type" value="contact" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                      <input type="text" name="name" required className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light" placeholder="John Doe" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                      <input type="tel" name="phone" required className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light" placeholder="(314) 583-4843" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">How can we help?</label>
                    <textarea name="message" rows="4" required className="w-full bg-transparent border-b border-gray-200 py-4 focus:border-[#c5a059] outline-none transition-colors font-light resize-none" placeholder="Describe your hair restoration goals..."></textarea>
                  </div>
                  
                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-4">
                    {loading ? 'Processing...' : (
                      <>
                        Send Executive Inquiry <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">Error sending inquiry. Please call (314) 583-4843.</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-white py-20 px-6 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">© {new Date().getFullYear()} Brian Ivie Hair and Extensions LLC. Confidential Restoration.</p>
      </footer>
    </div>
  )
}
