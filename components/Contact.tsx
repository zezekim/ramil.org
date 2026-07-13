"use client";

export default function Contact() {
  const year = new Date().getFullYear();
  return (
    <section id="contact" style={{ padding: "90px 0 40px", borderTop: "2px solid var(--ink-line)" }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: "24px" }}>Get in Touch</div>

        <h2 className="display" style={{ fontSize: "clamp(2.4rem,7vw,5.5rem)", marginBottom: "28px" }}>
          You have a problem.
          <br />
          <span style={{ color: "var(--red)" }}>I have the tools.</span>
        </h2>

        <p style={{ maxWidth: "56ch", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-2)", marginBottom: "40px" }}>
          Whether it&apos;s a workflow eating 40 hours a week, a system that needs to think for
          itself, or a product that needs to move fast — I&apos;ve built for radio stations, real
          estate firms, luxury retailers, and my own 17-year platform. The pattern is always the
          same: the right AI stack plus production-grade judgment equals something that actually ships.
        </p>

        {/* CTA row */}
        <div
          className="flex flex-col sm:flex-row"
          style={{ borderTop: "2px solid var(--ink-line)", borderBottom: "1px solid var(--rule)", marginBottom: "56px" }}
        >
          <a
            href="https://seoul.fm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red"
            style={{ flex: 1, justifyContent: "center", border: 0 }}
          >
            Seoul.fm ↗
          </a>
          <a
            href="https://github.com/zezekim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ flex: 1, justifyContent: "center", border: 0, borderLeft: "1px solid var(--rule)" }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Footer meta */}
        <div
          className="mono flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ fontSize: "11.5px", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)" }}
        >
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>Ramil Sususco</span>
          <span className="flex items-center gap-2">
            Manila, Philippines
            <span style={{ margin: "0 4px" }}>·</span>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--live)" }} />
            <span style={{ color: "var(--live)" }}>Available globally</span>
          </span>
          <span>Built with Next.js · {year}</span>
        </div>
      </div>
    </section>
  );
}
