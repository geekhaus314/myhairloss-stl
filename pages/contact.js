import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'
import Layout from '../components/Layout'

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [consultStatus, setConsultStatus] = useState(null);
  const [consultLoading, setConsultLoading] = useState(false);

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

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setConsultLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setConsultStatus('success');
        e.target.reset();
      } else {
        setConsultStatus('error');
      }
    } catch {
      setConsultStatus('error');
    } finally {
      setConsultLoading(false);
    }
  };

  return (
    <Layout dark={true}>
      <Head>
        <title>Contact Brian Ivie Hair &amp; Extensions | St. Louis Hair Restoration</title>
        <meta name="description" content="Schedule a free consultation with Brian Ivie in St. Louis. Hair loss assessment, treatment planning, and personalized solutions." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Brian Ivie Hair & Extensions" />
        <meta property="og:description" content="Schedule a free consultation. Hair loss assessment and personalized solutions in St. Louis." />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Brian Ivie Hair & Extensions" />
        <meta name="twitter:description" content="Schedule a free consultation. Hair loss assessment and personalized solutions in St. Louis." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <main className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-6 font-bold">Get In Touch</h2>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">Let&apos;s Discuss <br/><span className="italic font-serif font-light text-[#c5a059]">Your Look.</span></h1>
              
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
                      <a href="mailto:info@myhairloss.com" className="hover:text-[#c5a059] transition-colors">info@myhairloss.com</a>
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
                      3674 Ashby Rd<br/>
                      St. Ann, MO 63074
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-16">
              {/* Consultation Inquiry */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0a0a0a] p-12 md:p-16 text-white border border-[#333]"
              >
                <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-4 font-bold">Free Consultation</h2>
                <h3 className="text-3xl font-serif mb-8">Consultation Inquiry</h3>

                {consultStatus === 'success' ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif mb-4">Consultation Request Received</h3>
                    <p className="text-gray-400 font-light">Brian will review your information and reach out within 24 hours.</p>
                    <button onClick={() => setConsultStatus(null)} className="mt-8 text-xs font-bold uppercase tracking-widest text-[#c5a059] hover:text-white transition-colors">Submit Another Request</button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Full Name</label>
                        <input type="text" name="name" required className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#c5a059] outline-none transition-colors font-light" placeholder="John Doe" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Email</label>
                        <input type="email" name="email" required className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#c5a059] outline-none transition-colors font-light" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Phone</label>
                      <input type="tel" name="phone" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#c5a059] outline-none transition-colors font-light" placeholder="(314) 583-4843" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Type of Hair Loss</label>
                      <select name="hairLossType" required className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#c5a059] outline-none transition-colors font-light appearance-none">
                        <option value="" className="bg-[#0a0a0a]">Select one...</option>
                        <option value="Male Pattern Baldness" className="bg-[#0a0a0a]">Male Pattern Baldness</option>
                        <option value="Female Pattern Hair Loss" className="bg-[#0a0a0a]">Female Pattern Hair Loss</option>
                        <option value="Thinning All Over" className="bg-[#0a0a0a]">Thinning All Over</option>
                        <option value="Patchy Hair Loss" className="bg-[#0a0a0a]">Patchy Hair Loss</option>
                        <option value="Postpartum" className="bg-[#0a0a0a]">Postpartum</option>
                        <option value="Menopause" className="bg-[#0a0a0a]">Menopause</option>
                        <option value="Medical Condition" className="bg-[#0a0a0a]">Medical Condition</option>
                        <option value="Other" className="bg-[#0a0a0a]">Other</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">How Long Have You Noticed This?</label>
                      <select name="duration" required className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#c5a059] outline-none transition-colors font-light appearance-none">
                        <option value="" className="bg-[#0a0a0a]">Select one...</option>
                        <option value="Recently noticed" className="bg-[#0a0a0a]">Recently noticed</option>
                        <option value="6 months" className="bg-[#0a0a0a]">6 months</option>
                        <option value="1-2 years" className="bg-[#0a0a0a]">1-2 years</option>
                        <option value="3+ years" className="bg-[#0a0a0a]">3+ years</option>
                        <option value="5+ years" className="bg-[#0a0a0a]">5+ years</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Additional Concerns</label>
                      <textarea name="concerns" rows="4" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#c5a059] outline-none transition-colors font-light resize-none" placeholder="Tell us about your concerns or goals..."></textarea>
                    </div>

                    <button type="submit" disabled={consultLoading} className="w-full bg-[#c5a059] text-[#0a0a0a] py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-[#d4b46a] transition-colors flex items-center justify-center gap-3 disabled:opacity-50">
                      {consultLoading ? 'Submitting...' : (
                        <>
                          Request Consultation <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {consultStatus === 'error' && (
                      <p className="text-red-400 text-xs text-center font-bold uppercase tracking-widest">Error submitting request. Please call (314) 583-4843.</p>
                    )}
                  </form>
                )}

                <p className="text-gray-600 text-xs mt-6 leading-relaxed">
                  Brian Ivie is a hair restoration specialist, not a medical doctor. For medical concerns, please consult a healthcare provider.
                </p>
              </motion.div>

              {/* General Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-12 md:p-20 card-shadow border border-gray-100"
              >
                <h2 className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-4 font-bold">General Inquiry</h2>
                <h3 className="text-3xl font-serif mb-8">Send a Message</h3>

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
        </div>
      </main>
    </Layout>
  )
}
