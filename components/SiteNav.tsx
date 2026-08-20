import Link from "next/link";

const links = [
  { href: "/systems", label: "Systems" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="service-bar"><div className="shell">RAMIL.ORG <span>Independent systems building and technical operations</span></div></div>
    <header className="site-header">
      <nav className="shell nav" aria-label="Main navigation">
        <Link href="/" className="wordmark">RAMIL<span>.</span></Link>
        <div className="nav-links">
          {links.map((link) => link.href.startsWith("#") ? <a key={link.label} href={link.href}>{link.label}</a> : <Link key={link.label} href={link.href}>{link.label}</Link>)}
          <a href="/cv.pdf">CV <span aria-hidden="true">↓</span></a>
          <a href="https://github.com/zezekim" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
    </>
  );
}
