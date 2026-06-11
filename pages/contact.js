import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://formspree.io/f/xyzabc123', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div style={{ background: '#0a0a0a', color: '#f5f5f5' }}>
      <Head>
        <title>Contact | Brian Ivie Hair LLC</title>
        <meta name="description" content="Get in touch with Brian Ivie Hair LLC. Schedule a consultation or ask questions about our services." />
      </Head>

      {/* Navigation */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%)',
        padding: '1.5rem 0',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', margin: 0, fontFamily: "'Playfair Display', serif" }}>
            <span style={{ color: '#d4af37' }}>Brian Ivie</span> Hair LLC
          </h1>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#d1d5db' }}>Home</Link>
            <Link href="/services" style={{ color: '#d1d5db' }}>Services</Link>
            <Link href="/about" style={{ color: '#d1d5db' }}>About</Link>
            <Link href="/physicians" style={{ color: '#d1d5db' }}>Physician Partners</Link>
            <Link href="/contact" style={{ color: '#d4af37', fontWeight: 600 }}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
        textAlign: 'center',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db' }}>
            Ready to restore your confidence? Contact us today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontFamily: "'Playfair Display', serif" }}>
                Contact Information
              </h2>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#d4af37', marginBottom: '0.5rem' }}>Address</h3>
                <p style={{ color: '#d1d5db' }}>3674 Ashby Rd<br />Saint Louis, MO</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#d4af37', marginBottom: '0.5rem' }}>Email</h3>
                <p style={{ color: '#d1d5db' }}>
                  <a href="mailto:info@myhairloss.com" style={{ color: '#d4af37' }}>info@myhairloss.com</a>
                </p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#d4af37', marginBottom: '0.5rem' }}>Phone</h3>
                <p style={{ color: '#d1d5db' }}>
                  <a href="tel:+15551234567" style={{ color: '#d4af37' }}>(555) 123-4567</a>
                </p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#d4af37', marginBottom: '0.5rem' }}>Hours</h3>
                <p style={{ color: '#d1d5db' }}>
                  Monday - Friday: 10am - 6pm<br />
                  Saturday: 10am - 4pm<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontFamily: "'Playfair Display', serif" }}>
                Send us a Message
              </h2>
              {submitted && (
                <div style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)',
                  color: '#0a0a0a',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  ✓ Thank you! We'll be in touch soon.
                </div>
              )}
              <form onSubmit={handleSubmit} style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem',
                padding: '2rem'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '0.375rem',
                      color: '#f5f5f5',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '0.375rem',
                      color: '#f5f5f5',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '0.375rem',
                      color: '#f5f5f5',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '0.375rem',
                      color: '#f5f5f5',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="">Select a service...</option>
                    <option value="custom-hair-systems">Custom Hair Systems</option>
                    <option value="haircuts">Professional Haircuts</option>
                    <option value="color-extensions">Color & Extensions</option>
                    <option value="wig-fitting">Medical-Grade Wig Fitting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '0.375rem',
                      color: '#f5f5f5',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)',
                    color: '#0a0a0a',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Send Message
                </button>
              </form>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999', textAlign: 'center' }}>
                We'll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%)',
        borderTop: '1px solid #333',
        padding: '3rem 0',
        marginTop: '5rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ color: '#d4af37', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
                Brian Ivie Hair LLC
              </h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.8 }}>
                Premium hair restoration and custom solutions in Saint Louis.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#d4af37', marginBottom: '1rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/services" style={{ color: '#d1d5db' }}>Services</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/about" style={{ color: '#d1d5db' }}>About</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/physicians" style={{ color: '#d1d5db' }}>Physician Partners</Link></li>
                <li><Link href="/contact" style={{ color: '#d1d5db' }}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#d4af37', marginBottom: '1rem' }}>Contact</h4>
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>📍 3674 Ashby Rd, Saint Louis, MO</p>
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>📧 <a href="mailto:info@myhairloss.com" style={{ color: '#d4af37' }}>info@myhairloss.com</a></p>
              <p style={{ color: '#d1d5db' }}>📞 <a href="tel:+15551234567" style={{ color: '#d4af37' }}>(555) 123-4567</a></p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#999'
          }}>
            <p>© {new Date().getFullYear()} Brian Ivie Hair LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
