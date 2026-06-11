import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#fdfdfb] min-h-screen text-[#2d2d2d] font-sans">
      <Head>
        <title>Brian Ivie Hair LLC | Hair Restoration & Custom Solutions | St. Louis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* Clean Navigation */}
      <header className="sticky top-0 w-full z-50 bg-white border-b border-[#f0eee6] px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-[#3c2a21]">
          BRIAN IVIE <span className="text-[#9a6137]">HAIR LLC</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          {['Services', 'About', 'Physicians', 'Contact'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-[#3c2a21] hover:text-[#9a6137] transition">
              {item}
            </Link>
          ))}
          <Link href="/book" className="bg-[#3c2a21] text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#9a6137] transition">
            Book Now
          </Link>
        </nav>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        >
          <div className={`h-0.5 w-6 bg-[#3c2a21] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`h-0.5 w-6 bg-[#3c2a21] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 w-6 bg-[#3c2a21] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center p-6 animate-in fade-in">
          <nav className="flex flex-col gap-10 text-center">
            {['Home', 'Services', 'About', 'Physicians', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-extrabold uppercase text-[#3c2a21]"
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/book" 
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-[#3c2a21] text-white px-12 py-5 rounded-xl text-lg font-bold uppercase"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}

      {/* Hero Section: Clean & Informative */}
      <section className="py-16 md:py-24 bg-[#f0eee6]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#9a6137] font-bold uppercase tracking-widest text-sm mb-4">St. Louis, MO • Salon Lofts on Olive</p>
            <h1 className="mb-8 text-[#3c2a21]">
              Professional Hair Restoration & Custom Solutions
            </h1>
            <p className="text-xl leading-relaxed text-[#4a4a4a] mb-10">
              Expert hair replacement, custom molded units, and precision cuts. We partner with top St. Louis physicians to provide complete hair loss treatments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="bg-[#3c2a21] text-white text-center px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#9a6137] transition">
                Book a Consultation
              </Link>
              <Link href="/services" className="bg-white text-[#3c2a21] text-center px-10 py-5 rounded-xl font-bold text-lg border border-[#f0eee6] hover:bg-[#f0eee6] transition">
                View All Services
              </Link>
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-3xl border border-white">
            <div className="bg-[#e0ddd0] w-full aspect-video rounded-2xl flex items-center justify-center text-[#9a6137] font-bold uppercase tracking-widest text-xs">
              [ Portfolio Image Placeholder ]
            </div>
          </div>
        </div>
      </section>

      {/* Services Section: Detail Focused */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="mb-6 text-[#3c2a21]">Our Expertise</h2>
            <p className="text-lg text-[#4a4a4a]">
              Brian Ivie specializes in custom-molded hair systems perfected for each customer's unique color, fit, and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { 
                title: 'Custom Hair Systems', 
                desc: 'Individually molded and perfected units. We handle the molding, color-matching, and fitting to ensure a natural, undetectable look.',
                points: ['Custom molded to your head shape', 'Exact color matching', 'Glue-on and tape-on units', 'Natural hairline perfection']
              },
              { 
                title: 'Precision Haircuts', 
                desc: 'Expert cuts of any kind. From classic styles to modern fades, every cut is tailored to your face shape and hair texture.',
                points: ['All hair types welcome', 'Precision fades and tapers', 'Custom styling', 'Shape-ups and beard work']
              },
              { 
                title: 'Color & Extensions', 
                desc: 'Professional color services and premium extensions. We use high-quality products to achieve the perfect shade and length.',
                points: ['Custom color formulation', 'Premium hair extensions', 'Seamless blending', 'Wig and unit coloring']
              },
              { 
                title: 'Wig Fitting & Care', 
                desc: 'Medical-grade solutions for alopecia, chemotherapy, and other hair loss conditions. Compassionate, private service.',
                points: ['Custom fitting', 'Natural styling', 'Maintenance and care', 'Private consultations']
              }
            ].map((s, i) => (
              <div key={i} className="bg-[#fdfdfb] border border-[#f0eee6] p-10 rounded-2xl">
                <h3 className="mb-4 text-[#3c2a21]">{s.title}</h3>
                <p className="text-lg text-[#4a4a4a] mb-8">{s.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-bold text-[#3c2a21]/70">
                      <div className="w-1.5 h-1.5 bg-[#9a6137] rounded-full" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physician Section: Informative */}
      <section className="py-20 bg-[#f0eee6]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mb-8 text-[#3c2a21]">Medical Partnerships</h2>
            <p className="text-lg leading-relaxed text-[#4a4a4a] mb-8">
              We work alongside the best physicians in St. Louis to connect clients to comprehensive treatments. While medical treatments work internally, we provide the aesthetic restoration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                'Minoxidil / Rogaine',
                'Finasteride',
                'Microneedling',
                'Ketoconazole',
                'Clinical Coordination',
                'Patient Referral Loop'
              ].map((item) => (
                <div key={item} className="bg-white px-6 py-4 rounded-xl border border-white/50 text-sm font-bold text-[#3c2a21]">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/physicians" className="inline-block bg-[#3c2a21] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#9a6137] transition">
              Information for Physicians
            </Link>
          </div>
          <div className="bg-[#e0ddd0] aspect-square rounded-3xl flex items-center justify-center text-[#9a6137] font-bold uppercase tracking-widest text-xs">
            [ Clinical Partnership Image ]
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-[#3c2a21]">Book Your Appointment</h2>
          <p className="text-xl text-[#4a4a4a] max-w-2xl mx-auto mb-12">
            Schedule a private consultation for hair restoration or book a regular haircut at our Salon Lofts location.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/book?type=consultation" className="bg-[#9a6137] text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-[#3c2a21] transition">
              Hair Restoration Consultation
            </Link>
            <Link href="/book?type=appointment" className="bg-[#3c2a21] text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-[#9a6137] transition">
              Regular Hair Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#3c2a21] text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-white mb-6">BRIAN IVIE HAIR LLC</h3>
              <p className="text-[#f0eee6]/60 text-sm">
                Premium hair restoration and custom solutions in St. Louis. Professional standards, clinical partnerships, and perfected fit.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Location</h4>
              <p className="text-[#f0eee6]/80">
                Salon Lofts on Olive Blvd<br />
                Saint Louis, MO
              </p>
            </div>
            <div>
              <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Contact</h4>
              <p className="text-[#f0eee6]/80 mb-2">info@myhairloss.com</p>
              <p className="text-[#f0eee6]/80">(314) 555-1234</p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 text-center">
            <p className="text-xs opacity-40 uppercase tracking-widest">© {new Date().getFullYear()} Brian Ivie Hair LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
