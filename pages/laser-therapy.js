import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function LaserTherapy() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#fdfdfb]">
      <Head>
        <title>Laser Hair Therapy | Brian Ivie Hair &amp; Extensions</title>
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

      <main>
        <section className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
          <div className="container mx-auto">
            <h2 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] mb-4">Advanced Restoration</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Laser Hair Therapy</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              The non-invasive gold standard for hair density and follicle revitalization.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-center text-4xl mb-16">The Science of LLLT</h2>
            <div className="space-y-12">
              <div className="bg-white p-10 border border-gray-100 card-shadow">
                <h3 className="text-[#d4af37] mb-4">Photobiomodulation</h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  Laser therapy works through a process called photobiomodulation. The laser light is absorbed by the cells in your hair follicles, stimulating ATP production and cellular activity. This revitalizes dormant follicles and extends the growth phase of your hair cycle.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-[#1a1a1a] text-white">
                  <h4 className="text-[#d4af37] mb-4 uppercase tracking-widest text-xs">Increased Blood Flow</h4>
                  <p className="text-sm leading-relaxed text-white/60">
                    The laser energy increases microcirculation to the scalp, ensuring your follicles receive the oxygen and nutrients they need to thrive.
                  </p>
                </div>
                <div className="p-8 bg-[#1a1a1a] text-white">
                  <h4 className="text-[#d4af37] mb-4 uppercase tracking-widest text-xs">Follicle Revitalization</h4>
                  <p className="text-sm leading-relaxed text-white/60">
                    By stimulating the mitochondria within the hair cells, laser therapy can actually reverse the miniaturization process of the hair follicle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-24">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl mb-16">The Treatment Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Consultation', desc: 'We assess your hair density and determine if you are a candidate for laser therapy.' },
                { step: '02', title: 'Session Plan', desc: 'A custom schedule is created, typically involving 20-30 minute sessions.' },
                { step: '03', title: 'Monitoring', desc: 'We track your progress over 3-6 months to ensure optimal results.' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-10 border border-gray-100">
                  <div className="text-5xl font-black text-[#d4af37]/10 mb-6">{s.step}</div>
                  <h4 className="text-xl mb-4">{s.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white text-center px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl mb-8">Post-Transplant Excellence</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              We use laser hair therapy to help after transplants to get more hairs to grow and generate thick, healthy hair in the anagen phase.
            </p>
            <Link href="/book" className="btn-primary">Book Laser Consultation</Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">BRIAN IVIE <span className="font-light text-[#d4af37]">HAIR & EXTENSIONS</span></h2>
          <p className="text-[10px] text-white/20 uppercase tracking-widest">© {new Date().getFullYear()} Personal Image Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
