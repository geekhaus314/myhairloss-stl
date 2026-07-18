import Head from 'next/head'
import Link from 'next/link'
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo'

export default function About() {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5]">
      <Head>
        <title>About Brian Ivie | St. Louis Hair Restoration Specialist</title>
        <meta name="description" content="Meet Brian Ivie — 15+ years of hair restoration expertise in St. Louis. Custom hair systems, laser therapy, extensions, and physician partnerships." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About Brian Ivie | Hair Restoration Specialist" />
        <meta property="og:description" content="15+ years of hair restoration expertise in St. Louis. Custom hair systems, laser therapy, and compassionate care." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Brian Ivie | Hair Restoration Specialist" />
        <meta name="twitter:description" content="15+ years of hair restoration expertise in St. Louis." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      {/* Navigation */}
      <header className="bg-[#0a0a0a]/95 border-b border-[#333] py-6 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif m-0">
            <span className="text-[#c5a059]">Brian Ivie</span> Hair &amp; Extensions
          </h1>
          <nav className="flex gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link href="/about" className="text-[#c5a059] font-semibold">About</Link>
            <Link href="/physicians" className="text-gray-300 hover:text-white transition-colors">Physician Partners</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/about-brian.jpg"
          alt="Brian Ivie"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/70 to-[#0a0a0a]/50 z-1" />
        <div className="relative z-2 text-center max-w-3xl px-8">
          <p className="text-[#c5a059] text-sm uppercase tracking-[0.5em] mb-6 font-bold">St. Louis Hair Restoration</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Hair Loss Expert<br />
            <span className="text-[#c5a059]">15+ Years of Restoration Mastery</span>
          </h1>
          <p className="text-xl text-gray-300 font-light">
            One of St. Louis&apos;s most experienced hair restoration specialists.
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
                Brian Ivie has spent over 15 years perfecting the art and science of hair restoration. Starting with Ivies Hair Replacement and later House of Ivie, Brian developed a reputation for delivering exceptional, natural-looking results that transform lives.
              </p>
              <p className="mb-6 text-gray-300 leading-relaxed text-lg">
                Now operating as Brian Ivie Hair &amp; Extensions, Brian combines his deep expertise with a personalized approach. Every client receives individualized attention, custom solutions, and ongoing support. The philosophy is simple: hair restoration should be seamless, natural, and confidence-restoring.
              </p>
              <p className="mb-6 text-gray-300 leading-relaxed text-lg">
                Whether you&apos;re seeking custom hair systems, professional styling, or medical-grade wig fitting, Brian&apos;s commitment to excellence ensures you get results that exceed expectations.
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
      <footer className="bg-[#0a0a0a] border-t border-[#333] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-[#c5a059] font-serif mb-4">
                Brian Ivie Hair &amp; Extensions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Premium hair restoration and custom solutions in Saint Louis.
              </p>
            </div>
            <div>
              <h4 className="text-[#c5a059] mb-4">Quick Links</h4>
              <ul className="list-none p-0 m-0 space-y-2">
                <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/physicians" className="text-gray-300 hover:text-white transition-colors">Physician Partners</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#c5a059] mb-4">Contact</h4>
              <p className="text-gray-300 mb-2">3674 Ashby Rd, St. Ann, MO 63074</p>
              <p className="text-gray-300 mb-2">
                <a href="mailto:info@myhairloss.com" className="text-[#c5a059] hover:underline">info@myhairloss.com</a>
              </p>
              <p className="text-gray-300">
                <a href="tel:3145834843" className="text-[#c5a059] hover:underline">(314) 583-4843</a>
              </p>
            </div>
          </div>
          <div className="border-t border-[#333] pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Personal Image Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
