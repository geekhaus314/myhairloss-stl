import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Brian Ivie Hair — a DBA of Saint Louis LLC</title>
        <meta name="description" content="Hair replacement & restoration services — consultations, custom solutions, and maintenance." />
      </Head>

      <Header />

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
