import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Services() {
  const [menuOpen, setMenuOpen] = useState(false);

  const detailedServices = [
    {
      id: 'replacement',
      title: 'Hair Replacement',
      subtitle: 'Custom Molded & Perfected Fit',
      desc: 'Our hair systems are not off-the-shelf. Each unit is custom molded and color-matched to your specific needs. We specialize in precision application and styling to ensure a result that is indistinguishable from natural hair.',
      features: ['Custom Molding', 'Color Matching', 'Precision Cutting', 'Glue-on & Tape-on Units']
    },
    {
      id: 'laser',
      title: 'Laser Hair Therapy',
      subtitle: 'Clinical-grade LLLT',
      desc: 'Stimulate growth and revitalize follicles with our clinical laser protocols. Ideal for early-stage thinning or as essential post-transplant care to maximize density and hair health.',
      features: ['Photobiomodulation', 'Increased Blood Flow', 'Follicle Revitalization', 'Post-Op Care']
    },
    {
      id: 'extensions',
      title: 'Hair Extensions',
      subtitle: 'Premium Volume & Length',
      desc: 'Expertly applied extensions using the highest quality hair. Whether you need length, volume, or a pop of color, we provide a seamless blend that moves and feels like your own.',
      features: ['Seamless Blending', 'Natural Movement', 'Custom Color Matching', 'Professional Removal']
    },
    {
      id: 'transplant',
      title: 'Transplant Consultations',
      subtitle: 'Professional Coordination',
      desc: 'We are not medical doctors, but we partner with the best physicians in STL. We coordinate your transplant journey and provide the necessary post-op care to ensure your investment thrives.',
      features: ['Physician Referrals', 'Pre-Op Planning', 'Post-Op Laser Support', 'Recovery Monitoring']
    }
  ];

  return (
    <div className="bg-[#fdfdfb]">
      <Head>
        <title>Services | Brian Ivie Hair and Extensions</title>
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
          <Link href="/laser-therapy" className="nav-link">Laser Therapy</Link>
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
          <Link href="/laser-therapy" onClick={() => setMenuOpen(false)} className="text-2xl font-serif text-white mb-8">Laser Therapy</Link>
          <Link href="/book" onClick={() => setMenuOpen(false)} className="btn-primary bg-[#d4af37] text-[#1a1a1a] w-full max-w-xs py-5">Book Now</Link>
        </div>
      )}

      <main>
        <section className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
          <div className="container mx-auto">
            <h2 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] mb-4">Mastery & Precision</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Services</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Comprehensive restoration solutions tailored for the modern professional. From custom systems to clinical technology.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto">
            <div className="space-y-32">
              {detailedServices.map((s, i) => (
                <div key={i} id={s.id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
                  <div className="md:w-1/2">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#1a1a1a]/5"></div>
                      <div className="text-[#d4af37] font-serif italic text-2xl opacity-20 uppercase tracking-widest">
                        {s.title}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-[#d4af37] text-sm uppercase tracking-[0.3em] mb-4">{s.subtitle}</h3>
                    <h2 className="text-4xl md:text-5xl mb-8 leading-tight">{s.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{s.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {s.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-semibold">
                          <span className="h-1 w-4 bg-[#d4af37]"></span> {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/book" className="btn-primary">Book Consultation</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl mb-8">Need a Custom Repair?</h2>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">
              We offer expert hair ventilation and system repairs at $50/hour. Restore your system to its original glory.
            </p>
            <Link href="/book" className="btn-outline">Inquire About Repairs</Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">BRIAN IVIE <span className="font-light text-[#d4af37]">HAIR & EXTENSIONS</span></h2>
          <p className="text-[10px] text-white/20 uppercase tracking-widest">© {new Date().getFullYear()} Brian Ivie Hair and Extensions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
