"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(0,245,255,0.06)" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,245,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="section-label mb-4">Get in Touch</div>

        <h2
          className="font-mono font-bold mb-6 leading-tight"
          style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
        >
          You have a problem.{" "}
          <span className="gradient-text">I have the tools.</span>
        </h2>

        <p
          className="max-w-lg mx-auto text-sm leading-relaxed mb-12"
          style={{ color: "rgba(240,240,248,0.45)" }}
        >
          Whether it&apos;s a workflow eating 40 hours a week, a system that needs to think for
          itself, or a product that needs to move fast — I&apos;ve built for radio stations, real
          estate firms, luxury retailers, and my own 17-year platform. The pattern is always the
          same: the right AI stack + production-grade judgment = something that actually ships.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href="mailto:ramil.sususco@gmail.com"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>✉</span> Get In Touch
          </a>
          <a
            href="https://seoul.fm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <span>🎵</span> Seoul.fm →
          </a>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)" }}
        />

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-mono font-bold text-lg"
              style={{ color: "#00f5ff" }}
            >
              RS
              <span className="text-xs font-normal opacity-40">.dev</span>
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "rgba(240,240,248,0.3)" }}
            >
              Ramil Sususco
            </span>
          </div>

          <div
            className="flex items-center gap-2 font-mono text-xs"
            style={{ color: "rgba(240,240,248,0.3)" }}
          >
            <span>📍</span>
            <span>Antipolo, Philippines</span>
            <span className="mx-2">·</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            <span style={{ color: "#10b981" }}>Available globally</span>
          </div>

          <div
            className="font-mono text-xs"
            style={{ color: "rgba(240,240,248,0.2)" }}
          >
            Built with Next.js 15 · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </section>
  );
}
