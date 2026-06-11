import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f5f5' }}>
      <Head>
        <title>Brian Ivie Hair LLC | Premium Hair Restoration & Custom Solutions | St. Louis</title>
        <meta name="description" content="Expert hair replacement, custom wigs, extensions, and color services. Partnered with St. Louis physicians for comprehensive hair loss solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(15, 15, 15, 0.95) 100%)',
        padding: '1.5rem 0',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', margin: 0, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}>
            <span style={{ color: '#d4af37' }}>Brian Ivie</span> Hair LLC
          </h1>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#d4af37', fontWeight: 600 }}>Home</Link>
            <Link href="/services" style={{ color: '#d1d5db', fontWeight: 500 }}>Services</Link>
            <Link href="/about" style={{ color: '#d1d5db', fontWeight: 500 }}>About</Link>
            <Link href="/physicians" style={{ color: '#d1d5db', fontWeight: 500 }}>Physician Partners</Link>
            <Link href="/contact" style={{ color: '#d1d5db', fontWeight: 500 }}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury barbershop"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.5) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
            Premium Hair Restoration
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#d1d5db', lineHeight: 1.8 }}>
            Custom hair systems, professional cuts, color services, and medical partnerships. Restore your confidence with expert care.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services">
              <button style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Explore Services
              </button>
            </Link>
            <Link href="/contact">
              <button style={{
                padding: '1rem 2.5rem',
                background: 'transparent',
                color: '#d4af37',
                border: '2px solid #d4af37',
                borderRadius: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Book Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ padding: '5rem 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif" }}>
            Our Services
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Custom Hair Systems',
                desc: 'Individually molded and perfected toupees for natural-looking results. Non-surgical, immediate confidence.',
                img: '/images/custom-unit-hero.jpg'
              },
              {
                title: 'Professional Haircuts',
                desc: 'Expert cuts of any kind—fades, shapes, and precision styling for all hair types.',
                img: '/images/service-haircut.jpg'
              },
              {
                title: 'Color & Extensions',
                desc: 'Custom color treatments and premium hair extensions. Tailored to your exact specifications.',
                img: '/images/service-color.jpg'
              },
              {
                title: 'Wig Fitting & Consultation',
                desc: 'Medical-grade wigs for alopecia, post-surgery, and chemotherapy patients. Expert fitting.',
                img: '/images/service-extensions.jpg'
              }
            ].map((service, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem',
                overflow: 'hidden'
              }}>
                <img src={service.img} alt={service.title} style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#d1d5db', lineHeight: 1.6 }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physician Partnerships */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif" }}>
                Medical Partnerships
              </h2>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8 }}>
                We partner with St. Louis physicians to provide comprehensive hair loss solutions. While you prescribe finasteride, minoxidil, and other treatments, we provide immediate aesthetic restoration.
              </p>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8 }}>
                <strong style={{ color: '#d4af37' }}>The Result:</strong> Your patients get complete care—medical treatment + confidence restoration. Patients stay engaged, satisfied, and loyal.
              </p>
              <p style={{ marginBottom: '2rem', color: '#d1d5db', lineHeight: 1.8 }}>
                Physicians benefit from referral partnerships, improved patient outcomes, and differentiated practice positioning.
              </p>
              <Link href="/physicians">
                <button style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #d4af37 0%, #e5c158 100%)',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Learn About Physician Partnerships
                </button>
              </Link>
            </div>
            <img src="/images/service-physician.jpg" alt="Medical consultation" style={{
              borderRadius: '0.75rem',
              width: '100%',
              height: 'auto'
            }} />
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section style={{ padding: '5rem 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif" }}>
            Why Choose Brian Ivie Hair LLC
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '✓', title: '15+ Years Experience', desc: 'Expert in hair replacement, restoration, and custom solutions.' },
              { icon: '✓', title: '100% Custom Solutions', desc: 'Every unit individually molded and perfected for your unique needs.' },
              { icon: '✓', title: 'Natural Results', desc: 'Undetectable hairlines and seamless blending. Confidence restored.' },
              { icon: '✓', title: 'Medical-Grade Quality', desc: 'Professional standards, HIPAA compliance, and clinical expertise.' },
              { icon: '✓', title: 'Ongoing Support', desc: 'Maintenance, adjustments, and lifetime customer care.' },
              { icon: '✓', title: 'Physician Partnerships', desc: 'Coordinated care with St. Louis medical professionals.' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', color: '#d4af37', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
            Ready to Restore Your Confidence?
          </h2>
          <p style={{ color: '#0a0a0a', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Schedule a consultation with Brian Ivie Hair LLC today.
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
              Book Your Consultation
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
                Brian Ivie Hair LLC
              </h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.8 }}>
                Premium hair restoration and custom solutions in Saint Louis. Partnered with local physicians for comprehensive care.
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
