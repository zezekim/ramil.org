"use client";
import { useRef, useEffect, useState } from "react";

const SKILLS = [
  {
    icon: "🤖",
    category: "AI & Automation",
    color: "#00f5ff",
    items: [
      "Claude Code — primary dev environment",
      "RAG systems, pgvector, vector DBs",
      "n8n workflow orchestration",
      "OpenClaw agentic pipelines",
      "Prompt engineering & Claude Skills",
      "Google Gemini, OpenAI API",
    ],
  },
  {
    icon: "⚙️",
    category: "Backend Development",
    color: "#7c3aed",
    items: [
      "Python (Flask, FastAPI, async, Redis/RQ)",
      "Node.js / Express",
      "PHP (modern, strict typing)",
      "PostgreSQL / MySQL / Supabase / Redis",
      "REST API design (78-endpoint systems)",
    ],
  },
  {
    icon: "⚡",
    category: "Real-Time Systems",
    color: "#f59e0b",
    items: [
      "Server-Sent Events (SSE)",
      "Redis pub/sub messaging",
      "Event-driven architecture",
      "<200ms push update latency",
      "HLS/CMAF adaptive streaming",
    ],
  },
  {
    icon: "🎨",
    category: "Frontend & Mobile",
    color: "#10b981",
    items: [
      "React / Next.js / Modern JavaScript",
      "Flutter — Android app on Play Store",
      "Progressive Web Apps (PWA)",
      "Tailwind CSS, shadcn/ui",
      "Remotion — programmatic video",
    ],
  },
  {
    icon: "🔧",
    category: "Infrastructure",
    color: "#ef4444",
    items: [
      "Proxmox — multi-VM production hosting",
      "Docker / containerization",
      "Linux system administration (8+ years)",
      "FFmpeg / broadcast audio processing",
      "Cloudflare Workers, BunnyCDN",
    ],
  },
  {
    icon: "🚀",
    category: "Approach",
    color: "#00f5ff",
    items: [
      "AI-native development (3–5× faster)",
      "Autonomous systems design",
      "Production reliability focus",
      "Pieced-together systems thinking",
      "Ship it, learn, iterate",
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24"
      style={{ borderTop: "1px solid rgba(0,245,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="section-label mb-3">Capabilities</div>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-white mb-4">
            Full-stack, AI-native.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: "rgba(240,240,248,0.45)" }}>
            17 years of building across the entire stack, now supercharged with AI integration
            at every layer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.category}
              className="glass-card rounded-xl p-6 group"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${skill.color}14`, border: `1px solid ${skill.color}30` }}
                >
                  {skill.icon}
                </div>
                <h3
                  className="font-mono font-bold text-sm"
                  style={{ color: skill.color }}
                >
                  {skill.category}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs leading-relaxed"
                    style={{ color: "rgba(240,240,248,0.5)" }}
                  >
                    <span style={{ color: `${skill.color}80`, flexShrink: 0 }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
