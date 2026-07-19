import Head from 'next/head'
import Link from 'next/link'
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'
import Layout from '../components/Layout'

export default function LaserTherapy() {
  return (
    <Layout dark={false}>
      <Head>
        <title>Laser Hair Therapy | Brian Ivie Hair &amp; Extensions — St. Louis</title>
        <meta name="description" content="Clinical-grade low-level laser therapy (LLLT) for hair growth stimulation and follicle revitalization. Essential post-transplant care in St. Louis." />
        <link rel="canonical" href={`${SITE_URL}/laser-therapy`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Laser Hair Therapy | Brian Ivie Hair & Extensions" />
        <meta property="og:description" content="Clinical-grade LLLT for hair growth stimulation and follicle revitalization in St. Louis." />
        <meta property="og:url" content={`${SITE_URL}/laser-therapy`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Laser Hair Therapy | Brian Ivie Hair & Extensions" />
        <meta name="twitter:description" content="Clinical-grade LLLT for hair growth stimulation and follicle revitalization." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

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
    </Layout>
  )
}
