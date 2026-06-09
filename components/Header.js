import Link from 'next/link'

export default function Header(){
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-wrap">
          <div className="arch-container">
            <img src="/arch-silhouette.svg" alt="St. Louis Arch silhouette" className="arch-svg" />
          </div>
          <div className="site-title">
            <h1>Brian Ivie Hair</h1>
            <div className="site-sub">a DBA of Saint Louis LLC</div>
          </div>
        </div>

        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
