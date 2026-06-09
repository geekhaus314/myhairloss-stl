import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Brian Ivie Hair — a DBA of Saint Louis LLC</title>
        <meta name="description" content="Hair replacement & restoration services — consultations, custom solutions, and maintenance." />
      </Head>

      <header style={{padding:'24px',borderBottom:'1px solid #eee'}}>
        <h1 style={{margin:0}}>Brian Ivie Hair — a DBA of Saint Louis LLC</h1>
        <nav style={{marginTop:8}}>
          <Link href="/">Home</Link> {' | '}
          <Link href="/services">Services</Link> {' | '}
          <Link href="/about">About</Link> {' | '}
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main style={{padding: '32px'}}>
        <section>
          <h2>Natural-looking hair replacement</h2>
          <p>Specializing in custom hair replacement solutions, consultations, and ongoing maintenance. Serving the Saint Louis area.</p>
          <p>
            <a href="/services">See services</a> • <a href="/contact">Book a consultation</a>
          </p>
        </section>

        <section style={{marginTop:32}}>
          <h3>Quick contact</h3>
          <p>Email: <a href="mailto:hello@myhairloss.com">hello@myhairloss.com</a></p>
          <p>Phone: (replace with business phone)</p>
        </section>
      </main>

      <footer style={{padding:24, borderTop:'1px solid #eee'}}>
        <small>© {new Date().getFullYear()} Brian Ivie Hair — a DBA of Saint Louis LLC</small>
      </footer>
    </div>
  )
}
