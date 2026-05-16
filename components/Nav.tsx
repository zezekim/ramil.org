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
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(2, 2, 10, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0, 245, 255, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-lg font-bold tracking-wider"
          style={{ color: "#00f5ff" }}
        >
          RS
          <span
            className="ml-1 text-xs font-normal opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            .dev
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                style={{
                  color: isActive ? "#00f5ff" : "rgba(240,240,248,0.5)",
                  textShadow: isActive ? "0 0 12px rgba(0,245,255,0.5)" : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive
                    ? "#00f5ff"
                    : "rgba(240,240,248,0.5)")
                }
              >
                {l.label}
              </a>
            );
          })}

          {/* Available badge */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200"
            style={{
              border: "1px solid rgba(16,185,129,0.3)",
              background: "rgba(16,185,129,0.06)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-green-400 tracking-wide">
              Available
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "rgba(240,240,248,0.7)" }}
        >
          <div className="w-5 space-y-1">
            <span
              className="block h-px bg-current transition-all duration-200"
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="block h-px bg-current transition-all duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px bg-current transition-all duration-200"
              style={{
                transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 space-y-4"
          style={{
            background: "rgba(2, 2, 10, 0.98)",
            borderTop: "1px solid rgba(0, 245, 255, 0.08)",
          }}
        >
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className="block font-mono text-sm tracking-widest uppercase py-2"
                style={{ color: isActive ? "#00f5ff" : "rgba(240,240,248,0.6)" }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            );
          })}
          <div className="flex items-center gap-2 pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-green-400">
              Available for Remote Work
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
