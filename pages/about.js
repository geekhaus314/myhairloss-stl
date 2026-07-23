import Head from 'next/head'
import Link from 'next/link'
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout dark={true}>
      <Head>
        <title>About Brian Ivie | St. Louis Hair Restoration Specialist</title>
        <meta name="description" content="Meet Brian Ivie — a lifetime of hair restoration expertise spanning three generations in St. Louis. Custom hair systems, laser therapy, extensions, and physician partnerships." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About Brian Ivie | Hair Restoration Specialist" />
        <meta property="og:description" content="A lifetime of hair restoration expertise spanning three generations in St. Louis. Custom hair systems, laser therapy, and compassionate care." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Brian Ivie | Hair Restoration Specialist" />
        <meta name="twitter:description" content="A lifetime of hair restoration expertise spanning three generations in St. Louis." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/about-brian.jpg"
          alt="Brian Ivie"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/70 to-[#0a0a0a]/50 z-1" />
        <div className="relative z-2 text-center max-w-3xl px-8">
          <p className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-6 font-bold">Three Generations of St. Louis Hair Care</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            A Lifetime of<br />
            <span className="text-[#c5a059]">Hair Restoration Expertise</span>
          </h1>
          <p className="text-xl text-gray-300 font-normal">
            From House of Ivie in 1967 to today — a lifetime of family tradition.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="mb-8 text-4xl font-serif">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-6 text-gray-300 leading-relaxed text-lg">
                Hair restoration runs in the Ivie family.                 In 1967, Brian&apos;s parents Billie J. and Brenda Ivie opened <strong>House of Ivie</strong> in Hazelwood, MO — a family-owned business with a barber shop on one side and a hair replacement studio on the other. Brian grew up in that shop alongside his older brothers <strong>BJ</strong> (Billie J. Jr.) and <strong>Barry</strong>, learning the craft from the ground up.
              </p>
              <p className="mb-6 text-gray-300 leading-relaxed text-lg">
                After Ivie&apos;s Hair Replacement, Brian opened his own shop carrying on the same dual-service tradition — barbering and hair replacement under one roof. He later moved the business to its current studio location, where he continues to build on the family legacy.
              </p>
              <p className="mb-6 text-gray-300 leading-relaxed text-lg">
                Now operating as Brian Ivie Hair &amp; Extensions, every client receives individualized attention, custom solutions, and ongoing support. The philosophy is simple: hair restoration should be seamless, natural, and confidence-restoring — whether you&apos;re seeking custom hair systems, professional styling, or medical-grade wig fitting.
              </p>
            </div>
            <img src="/images/about-brian.jpg" alt="Brian Ivie" className="rounded-lg w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="mb-16 text-4xl font-serif text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-[#333] rounded-lg p-8">
              <h3 className="text-[#c5a059] font-serif text-xl mb-4">Case-by-Case Assessment</h3>
              <p className="text-gray-300 leading-relaxed">
                Every client&apos;s hair loss is unique. We assess your specific situation, discuss all available options, and create a personalized plan.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-[#333] rounded-lg p-8">
              <h3 className="text-[#c5a059] font-serif text-xl mb-4">Medical Partnerships</h3>
              <p className="text-gray-300 leading-relaxed">
                We work directly with St. Louis medical professionals to connect you with treatments that are right for you — whether that&apos;s medication, transplant surgery, or non-surgical solutions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-[#333] rounded-lg p-8">
              <h3 className="text-[#c5a059] font-serif text-xl mb-4">Not a Medical Professional</h3>
              <p className="text-gray-300 leading-relaxed">
                Brian Ivie is a hair restoration specialist, not a medical doctor. He does not prescribe medication or perform medical procedures. His expertise lies in hair systems, styling, laser therapy, and coordinating your care with qualified physicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="mb-12 text-4xl font-serif text-center">Our Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div key={idx} className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-[#333] rounded-lg p-8">
                <h3 className="text-[#c5a059] font-serif text-xl mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="mb-12 text-4xl font-serif text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div key={idx} className="text-center p-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-lg">
                <h3 className="text-[#c5a059] font-serif text-xl mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <Link href="/blog" className="inline-block text-[#c5a059] text-sm uppercase tracking-[0.5em] font-bold border border-[#c5a059] px-10 py-4 rounded hover:bg-[#c5a059] hover:text-[#0a0a0a] transition-all">
            Read Our Hair Loss Research →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#c5a059] to-[#d4b46a] text-center">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[#0a0a0a] mb-4 text-4xl font-serif">
            Experience the Difference
          </h2>
          <p className="text-[#0a0a0a]/80 mb-8 text-lg">
            Schedule your consultation with Brian Ivie Hair &amp; Extensions today.
          </p>
          <Link href="/contact">
            <button className="bg-[#0a0a0a] text-[#c5a059] border-none rounded px-10 py-4 text-lg font-semibold cursor-pointer hover:bg-[#1a1a1a] transition-colors">
              Book Consultation
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
    </Layout>
  )
}
