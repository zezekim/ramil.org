export default function SiteFooter() {
  return <footer id="contact" className="footer"><div className="shell footer-inner">
    <div><p className="kicker">Start with the system, not the tool.</p><h2>Have an operational problem worth fixing?</h2></div>
    <div className="footer-action"><a className="button button-primary" href="mailto:hi@ramil.org">Email Ramil <span aria-hidden="true">↗</span></a><p>Manila · Remote · Available for select architecture and engineering work</p></div>
    <div className="footer-meta"><span>© {new Date().getFullYear()} Ramil Sususco</span><span>Built with Next.js</span></div>
  </div></footer>;
}
