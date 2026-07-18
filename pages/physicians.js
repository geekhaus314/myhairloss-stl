import Head from 'next/head'
import Link from 'next/link'
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'

export default function Physicians() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f5f5' }}>
      <Head>
        <title>Physician Partnership Program | Brian Ivie Hair &amp; Extensions — St. Louis</title>
        <meta name="description" content="Partner with Brian Ivie Hair & Extensions for comprehensive hair loss care. Physician referral program for St. Louis dermatologists and medical professionals." />
        <link rel="canonical" href={`${SITE_URL}/physicians`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Physician Partnership Program | Brian Ivie Hair & Extensions" />
        <meta property="og:description" content="Partner for comprehensive hair loss care. Physician referral program for St. Louis medical professionals." />
        <meta property="og:url" content={`${SITE_URL}/physicians`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Physician Partnership Program | Brian Ivie Hair & Extensions" />
        <meta name="twitter:description" content="Partner for comprehensive hair loss care. Referral program for St. Louis physicians." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
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
            <span style={{ color: '#d4af37' }}>Brian Ivie</span> Hair &amp; Extensions
          </h1>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#d1d5db' }}>Home</Link>
            <Link href="/services" style={{ color: '#d1d5db' }}>Services</Link>
            <Link href="/about" style={{ color: '#d1d5db' }}>About</Link>
            <Link href="/physicians" style={{ color: '#d4af37', fontWeight: 600 }}>Physician Partners</Link>
            <Link href="/contact" style={{ color: '#d1d5db' }}>Contact</Link>
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
            Physician Partnership Program
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db', maxWidth: '700px', margin: '0 auto' }}>
            Expand your hair loss treatment offerings with a trusted partner. Offer your patients comprehensive care—medical treatment + aesthetic restoration.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
            The Challenge
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
            border: '1px solid #333',
            borderRadius: '0.75rem',
            padding: '3rem',
            marginBottom: '3rem'
          }}>
            <p style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
              Hair loss patients seeking medical treatment face a critical gap. While finasteride, minoxidil, microneedling, and other clinical treatments address the underlying biology, they often take months to show results. Patients become frustrated waiting and seek alternative solutions independently.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem' }}>
              <strong style={{ color: '#d4af37' }}>The Result:</strong> Patients find low-quality providers, lose confidence in your treatment plan, and you lose touch with them during a critical period.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
            The Solution
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <strong style={{ color: '#d4af37' }}>Brian Ivie Hair &amp; Extensions</strong> bridges this gap by offering custom hair systems, professional styling, and medical-grade wig fitting. By partnering with us, you can refer patients to a trusted specialist who complements—not competes with—your medical treatment.
              </p>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Your patients receive immediate confidence restoration while medical treatments work. They stay engaged, satisfied, and loyal. And they return to you with better outcomes.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              border: '1px solid #333',
              borderRadius: '0.75rem',
              padding: '2rem'
            }}>
              <h3 style={{ color: '#d4af37', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
                Partnership Benefits
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Comprehensive patient care',
                  'Improved patient satisfaction',
                  'Increased patient retention',
                  'Referral revenue opportunities',
                  'Practice differentiation',
                  'Better treatment outcomes',
                  'Coordinated patient care'
                ].map((benefit, idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem', color: '#d1d5db', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#d4af37', marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
            Partnership Models
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Basic Referral',
                desc: 'Refer patients to Brian Ivie Hair &amp; Extensions. We provide exceptional service; patients return to you with improved outcomes.',
                features: ['No formal agreement', 'Mutual benefit through patient satisfaction', 'Direct referral link']
              },
              {
                title: 'Preferred Provider',
                desc: 'Formal partnership with dedicated support, priority scheduling, and referral commission.',
                features: ['Referral commission (15-25%)', 'Dedicated support', 'Priority patient scheduling', 'Joint marketing materials']
              },
              {
                title: 'Clinical Collaboration',
                desc: 'Full integration with shared patient data, outcome tracking, and co-marketing.',
                features: ['Bi-directional referrals', 'Outcome tracking', 'Joint webinars', 'Published case studies']
              }
            ].map((model, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem',
                padding: '2rem'
              }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", color: '#d4af37' }}>
                  {model.title}
                </h3>
                <p style={{ marginBottom: '1.5rem', color: '#d1d5db', lineHeight: 1.6 }}>
                  {model.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {model.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', color: '#d1d5db', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#d4af37', marginRight: '0.5rem' }}>•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Brian Ivie */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
            Why Partner with Brian Ivie Hair &amp; Extensions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            {[
              { title: '15+ Years Experience', desc: 'Expert in hair replacement, restoration, and custom solutions.' },
              { title: '100% Custom Solutions', desc: 'Every unit individually molded and perfected for each patient.' },
              { title: 'Medical-Grade Quality', desc: 'Professional standards, HIPAA compliance, and clinical expertise.' },
              { title: 'Patient-Focused', desc: 'Compassionate care with focus on patient satisfaction and outcomes.' },
              { title: 'Reliable Partner', desc: 'Consistent, professional service your patients can trust.' },
              { title: 'St. Louis Based', desc: 'Local partner serving your community.' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem',
                padding: '2rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontFamily: "'Playfair Display', serif", color: '#d4af37' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#d1d5db', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ color: '#0a0a0a', marginBottom: '1rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif" }}>
            Ready to Expand Your Treatment Offerings?
          </h2>
          <p style={{ color: '#0a0a0a', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Let's discuss how a partnership with Brian Ivie Hair &amp; Extensions can benefit your practice and patients.
          </p>
          <Link href="/contact">
            <button style={{
              padding: '1rem 2.5rem',
              background: '#0a0a0a',
              color: '#d4af37',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Schedule Consultation
            </button>
          </Link>
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
                Brian Ivie Hair &amp; Extensions
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
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>📍 3674 Ashby Rd, St. Ann, MO 63074</p>
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>📧 <a href="mailto:info@myhairloss.com" style={{ color: '#d4af37' }}>info@myhairloss.com</a></p>
              <p style={{ color: '#d1d5db' }}>📞 <a href="tel:3145834843" style={{ color: '#d4af37' }}>(314) 583-4843</a></p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#999'
          }}>
            <p>© {new Date().getFullYear()} Personal Image Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
