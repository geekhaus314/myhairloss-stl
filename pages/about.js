import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f5f5' }}>
      <Head>
        <title>About | Brian Ivie Hair LLC</title>
        <meta name="description" content="Learn about Brian Ivie Hair LLC, our expertise, and our commitment to premium hair restoration services." />
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
            <Link href="/about" style={{ color: '#d4af37', fontWeight: 600 }}>About</Link>
            <Link href="/physicians" style={{ color: '#d1d5db' }}>Physician Partners</Link>
            <Link href="/contact" style={{ color: '#d1d5db' }}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img
          src="/images/about-brian.jpg"
          alt="Brian Ivie"
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
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
            About Brian Ivie Hair LLC
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#d1d5db' }}>
            Premium hair restoration with 15+ years of expertise
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif" }}>
            Our Story
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Brian Ivie has spent over 15 years perfecting the art and science of hair restoration. Starting with Ivies Hair Replacement and later House of Ivie, Brian developed a reputation for delivering exceptional, natural-looking results that transform lives.
              </p>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Now operating as Brian Ivie Hair LLC, Brian combines his deep expertise with a personalized approach. Every client receives individualized attention, custom solutions, and ongoing support. The philosophy is simple: hair restoration should be seamless, natural, and confidence-restoring.
              </p>
              <p style={{ marginBottom: '1rem', color: '#d1d5db', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Whether you're seeking custom hair systems, professional styling, or medical-grade wig fitting, Brian's commitment to excellence ensures you get results that exceed expectations.
              </p>
            </div>
            <img src="/images/about-brian.jpg" alt="Brian Ivie" style={{
              borderRadius: '0.75rem',
              width: '100%',
              height: 'auto'
            }} />
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
            Our Expertise
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Custom Molding & Fitting',
                desc: 'Each unit is individually molded to your exact head shape and specifications for perfect comfort and natural appearance.'
              },
              {
                title: 'Color Matching',
                desc: 'Expert color formulation ensures your hair system matches your natural hair perfectly, regardless of shade or tone.'
              },
              {
                title: 'Hairline Design',
                desc: 'Undetectable hairlines are our specialty. We create natural-looking fronts that blend seamlessly with your skin.'
              },
              {
                title: 'Medical-Grade Solutions',
                desc: 'Experience with alopecia, post-surgery, and chemotherapy patients. We understand medical and emotional needs.'
              },
              {
                title: 'Ongoing Maintenance',
                desc: 'Lifetime support includes adjustments, replacements, and care guidance to keep your hair looking perfect.'
              },
              {
                title: 'Physician Partnerships',
                desc: 'Coordinated care with St. Louis medical professionals for comprehensive hair loss treatment.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem',
                padding: '2rem'
              }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", color: '#d4af37' }}>
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

      {/* Values */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
            Our Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Excellence',
                desc: 'We never compromise on quality. Every detail matters, from material selection to final fitting.'
              },
              {
                title: 'Personalization',
                desc: 'Your needs are unique. We customize every solution to match your specific requirements and preferences.'
              },
              {
                title: 'Confidentiality',
                desc: 'Your privacy is paramount. All consultations and patient information are handled with complete discretion.'
              },
              {
                title: 'Compassion',
                desc: 'We understand the emotional impact of hair loss. Our approach is always caring and supportive.'
              },
              {
                title: 'Innovation',
                desc: 'We stay current with the latest techniques and materials to deliver cutting-edge solutions.'
              },
              {
                title: 'Integrity',
                desc: 'Transparent communication, honest pricing, and genuine care for your satisfaction.'
              }
            ].map((value, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: '1px solid #333',
                borderRadius: '0.75rem'
              }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", color: '#d4af37' }}>
                  {value.title}
                </h3>
                <p style={{ color: '#d1d5db', lineHeight: 1.6 }}>
                  {value.desc}
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
            Experience the Difference
          </h2>
          <p style={{ color: '#0a0a0a', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Schedule your consultation with Brian Ivie Hair LLC today.
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
