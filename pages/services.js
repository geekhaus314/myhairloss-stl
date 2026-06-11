import Head from 'next/head'
import Link from 'next/link'

export default function Services() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f5f5' }}>
      <Head>
        <title>Services | Brian Ivie Hair LLC</title>
        <meta name="description" content="Custom hair systems, professional haircuts, color treatments, extensions, and medical-grade wig fitting." />
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
            <Link href="/services" style={{ color: '#d4af37', fontWeight: 600 }}>Services</Link>
            <Link href="/about" style={{ color: '#d1d5db' }}>About</Link>
            <Link href="/physicians" style={{ color: '#d1d5db' }}>Physician Partners</Link>
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
            Our Services
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
            Comprehensive hair restoration and styling solutions tailored to your unique needs.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          {[
            {
              title: 'Custom Hair Systems & Toupees',
              desc: 'Our flagship service. Each custom hair system is individually molded and perfected for your exact specifications. We work with premium materials to create natural-looking, undetectable results.',
              details: [
                'Individually custom-molded for perfect fit',
                'Color-matched to your exact specifications',
                'Natural hairline and seamless blending',
                'Comfortable all-day wear',
                'Non-surgical, immediate results',
                'Lifetime maintenance and support'
              ],
              img: '/images/custom-unit-hero.jpg'
            },
            {
              title: 'Professional Haircuts & Styling',
              desc: 'Expert cuts of any kind. From precision fades to complex shapes, we deliver sharp, clean lines and professional styling for all hair types.',
              details: [
                'Precision fades and line work',
                'Custom shapes and designs',
                'All hair types and textures',
                'Professional styling advice',
                'Maintenance recommendations',
                'Walk-ins and appointments welcome'
              ],
              img: '/images/service-haircut.jpg'
            },
            {
              title: 'Color Treatment & Extensions',
              desc: 'Custom hair color services and premium extensions. Whether you want a bold new look or added volume and length, we deliver professional results.',
              details: [
                'Custom color formulation',
                'Premium hair extensions',
                'Seamless blending',
                'Color correction services',
                'Maintenance and care guidance',
                'Natural-looking results'
              ],
              img: '/images/service-color.jpg'
            },
            {
              title: 'Medical-Grade Wig Fitting',
              desc: 'Specialized wig consultation and fitting for alopecia, post-surgery, and chemotherapy patients. We understand the medical and emotional aspects of hair loss.',
              details: [
                'Medical-grade wig selection',
                'Expert fitting and adjustment',
                'Comfort and security focus',
                'Natural appearance',
                'Insurance documentation support',
                'Compassionate, confidential service'
              ],
              img: '/images/service-extensions.jpg'
            }
          ].map((service, idx) => (
            <div key={idx} style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: idx < 3 ? '1px solid #333' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
                  <h2 style={{ marginBottom: '1rem', fontSize: '2rem', fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h2>
                  <p style={{ marginBottom: '1.5rem', color: '#d1d5db', lineHeight: 1.8 }}>
                    {service.desc}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {service.details.map((detail, i) => (
                      <li key={i} style={{ marginBottom: '0.75rem', color: '#d1d5db', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#d4af37', marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <img src={service.img} alt={service.title} style={{
                  borderRadius: '0.75rem',
                  width: '100%',
                  height: 'auto',
                  order: idx % 2 === 0 ? 1 : 0
                }} />
              </div>
            </div>
          ))}
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
            Ready to Get Started?
          </h2>
          <p style={{ color: '#0a0a0a', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Schedule your consultation today.
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
              Book Consultation
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
