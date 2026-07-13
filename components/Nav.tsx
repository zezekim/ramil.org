"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(244,243,239,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
      }}
    >
      <div className="wrap h-[64px] flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="font-bold tracking-tight"
          style={{ fontSize: "17px", letterSpacing: "0.02em", color: "var(--ink)" }}
        >
          RAMIL<span style={{ color: "var(--red)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className="mono transition-colors duration-200"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--red)" : "var(--ink-2)",
                  borderBottom: isActive ? "1px solid var(--red)" : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {l.label}
              </a>
            );
          })}
          <span
            className="mono flex items-center gap-2"
            style={{ fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--live)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--live)" }} />
            Available
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--ink)" }}
        >
          <div className="w-5 space-y-1">
            <span className="block h-px bg-current transition-all duration-200" style={{ transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none" }} />
            <span className="block h-px bg-current transition-all duration-200" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px bg-current transition-all duration-200" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none" }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-[30px] pb-6 space-y-4"
          style={{ background: "var(--paper)", borderTop: "1px solid var(--rule)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="mono block py-2"
              style={{ fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="mono flex items-center gap-2 pt-2" style={{ fontSize: "11px", color: "var(--live)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--live)" }} />
            Available for remote work
          </div>
        </div>
      )}
    </nav>
  );
}
