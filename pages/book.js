import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Book() {
  const router = useRouter()
  const { type } = router.query
  const [bookingType, setBookingType] = useState(type || 'consultation')

  useEffect(() => {
    if (type) setBookingType(type)
  }, [type])

  return (
    <div className="bg-[#fdfdfb] min-h-screen text-[#2d2d2d] selection:bg-gold selection:text-[#f5f5f0]">
      <Head>
        <title>Book Your Session | Brian Ivie Hair</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* Minimal Header */}
      <header className="p-6 flex justify-between items-center border-b border-white/5">
        <Link href="/" className="text-lg font-bold tracking-tighter uppercase italic">
          Brian Ivie <span className="text-gold">Hair</span>
        </Link>
        <Link href="/" className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition">
          Close
        </Link>
      </header>

      <main className="container max-w-lg py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase italic mb-2 tracking-tighter">
          Secure Your <span className="text-gold">Slot</span>
        </h1>
        <p className="text-sm opacity-60 mb-10 font-medium">
          Professional hair restoration & precision cuts at Salon Lofts on Olive Blvd.
        </p>

        {/* Booking Toggle */}
        <div className="flex bg-[#3c2a21] p-1 rounded-xl mb-8 border border-white/10">
          <button 
            onClick={() => setBookingType('consultation')}
            className={`flex-1 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition ${bookingType === 'consultation' ? 'bg-gold text-[#f5f5f0]' : 'opacity-40'}`}
          >
            Consultation
          </button>
          <button 
            onClick={() => setBookingType('appointment')}
            className={`flex-1 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition ${bookingType === 'appointment' ? 'bg-gold text-[#f5f5f0]' : 'opacity-40'}`}
          >
            Hair Appointment
          </button>
        </div>

        {/* Booking Card */}
        <div className="space-y-6">
          {bookingType === 'consultation' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-[#3c2a21] border border-white/10 p-6 rounded-2xl mb-6">
                <h3 className="text-xl font-bold mb-2">Restoration Consultation</h3>
                <p className="text-xs opacity-60 mb-4">30 Minutes • No Obligation • Private Session</p>
                <p className="text-sm leading-relaxed mb-6 italic">
                  "Let's talk about your hair. No sales pitch, just a real look at your options—custom units, medical treatments, or a mix of both. We'll find the perfect fit for your look."
                </p>
                <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Available This Week
                </div>
                <a 
                  href="https://squareup.com/appointments/book/placeholder-consultation" 
                  className="btn btn-primary w-full py-4 rounded-xl uppercase font-extrabold tracking-widest italic"
                >
                  Pick a Time
                </a>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-[#3c2a21] border border-white/10 p-6 rounded-2xl mb-6">
                <h3 className="text-xl font-bold mb-2">Precision Cut & Style</h3>
                <p className="text-xs opacity-60 mb-4">45-60 Minutes • All Hair Types • Custom Finish</p>
                <p className="text-sm leading-relaxed mb-6 italic">
                  "Regular cuts, fades, color, or system maintenance. I don't do 'generic'—every cut is tailored to your face shape and hair texture. Let's get it right."
                </p>
                <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Next Openings: Friday
                </div>
                <a 
                  href="https://squareup.com/appointments/book/placeholder-appointment" 
                  className="btn btn-primary w-full py-4 rounded-xl uppercase font-extrabold tracking-widest italic"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          )}

          {/* Alternative Contact */}
          <div className="text-center py-8">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 mb-4">Need something custom?</p>
            <div className="flex flex-col gap-3">
              <a href="tel:+13145551234" className="text-sm font-bold hover:text-gold transition underline decoration-gold/30">
                Call/Text: (314) 555-1234
              </a>
              <Link href="/contact" className="text-xs opacity-50 hover:opacity-100 transition">
                Send a Message Instead
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Grainy Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-150" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  )
}
