"use client";
import { useRef, useEffect, useState } from "react";

const SKILLS = [
  {
    num: "A",
    category: "AI & Automation",
    items: [
      "Claude Code — primary dev environment",
      "RAG systems, pgvector, vector DBs",
      "n8n workflow orchestration",
      "Agentic pipelines & tool use",
      "Prompt engineering & Claude Skills",
      "Google Gemini, OpenAI API",
    ],
  },
  {
    num: "B",
    category: "Backend Development",
    items: [
      "Go (service meshes, NATS, ClickHouse)",
      "Python (FastAPI, Flask, async, Redis/RQ)",
      "Node.js / Express",
      "PostgreSQL / MySQL / Supabase / Redis",
      "REST API design (72-endpoint systems)",
    ],
  },
  {
    num: "C",
    category: "Real-Time & Media",
    items: [
      "Server-Sent Events & Redis pub/sub",
      "Event-driven architecture",
      "HLS/CMAF adaptive streaming",
      "FFmpeg / broadcast audio processing",
      "Remotion — programmatic video",
    ],
  },
  {
    num: "D",
    category: "Frontend & Mobile",
    items: [
      "React / Next.js / TypeScript",
      "Flutter — Android app on Play Store",
      "Progressive Web Apps (PWA)",
      "Tailwind CSS, shadcn/ui",
      "Design systems & motion",
    ],
  },
  {
    num: "E",
    category: "Infrastructure",
    items: [
      "Proxmox — multi-VM production hosting",
      "Docker / containerization",
      "Linux system administration (8+ yrs)",
      "Caddy, NATS, MinIO, distroless builds",
      "Cloudflare Workers, BunnyCDN",
    ],
  },
  {
    num: "F",
    category: "Approach",
    items: [
      "AI-native development (3–5× faster)",
      "Distributed / autonomous systems",
      "Production reliability focus",
      "Privacy & correctness by construction",
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "80px 0", borderTop: "2px solid var(--ink-line)" }}
    >
      <div className="wrap">
        <div style={{ marginBottom: "44px" }}>
          <div className="eyebrow" style={{ marginBottom: "14px" }}>Capabilities</div>
          <h2 className="display" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", marginBottom: "16px" }}>
            Full-stack, AI-native.
          </h2>
          <p style={{ maxWidth: "54ch", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-2)" }}>
            The full picture — from a Claude prompt to a Proxmox VM, from a pgvector query
            to a Go service mesh. Seventeen years across the stack means nothing is a black box.
          </p>
        </div>

        <div
          className="grid gap-x-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", borderTop: "1px solid var(--rule)" }}
        >
          {SKILLS.map((skill, i) => (
            <div
              key={skill.category}
              className={`reveal ${active ? "in" : ""}`}
              style={{
                padding: "26px 0",
                borderBottom: "1px solid var(--rule)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
                <span className="mono" style={{ fontSize: "12px", color: "var(--red)", fontWeight: 600 }}>{skill.num}</span>
                <h3 className="display" style={{ fontSize: "1.15rem" }}>{skill.category}</h3>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {skill.items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "10px", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-2)" }}>
                    <span style={{ color: "var(--red)", flexShrink: 0 }}>—</span>
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
