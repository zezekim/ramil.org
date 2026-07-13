"use client";
import { useRef, useEffect, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Think before you build",
    body: "I spend more time in a doc than in an editor before touching code. Every constraint named, every edge case mapped. Rewrites are expensive. Clarity is free.",
    note: "requirements: deep · constraints: explicit · edge-cases: exhaustive",
  },
  {
    num: "02",
    title: "Multiply, don't shortcut",
    body: "AI is a force multiplier — paired with schema enforcement, validation layers, and the right human gates. I move 3–5× faster because the model handles volume while I handle judgment.",
    note: "schema: strict · validation: enforced · human-gate: high-risk only",
  },
  {
    num: "03",
    title: "Ship for the long run",
    body: "Production means it runs at 3am without me. Seoul.fm has been self-sustaining for 17 years. I build every system to that standard — monitoring, error handling, and the reliability to be forgotten about.",
    note: "monitoring: on · self-healing: on · expected-uptime: 17+ years",
  },
];

export default function Process() {
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
      id="process"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: "80px 0", borderTop: "2px solid var(--ink-line)" }}
    >
      <div className="wrap">
        <div style={{ marginBottom: "44px" }}>
          <div className="eyebrow" style={{ marginBottom: "14px" }}>How I Work</div>
          <h2 className="display" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", marginBottom: "16px" }}>
            Speed without shortcuts.
          </h2>
          <p style={{ maxWidth: "52ch", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-2)" }}>
            An AI-native workflow that ships production features in hours, with the
            reliability you&apos;d expect from months of development.
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal ${active ? "in" : ""}`}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
                gap: "32px",
                alignItems: "start",
                padding: "36px 0",
                borderBottom: "1px solid var(--rule)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div style={{ display: "flex", gap: "24px" }}>
                <span
                  className="display tabnum"
                  style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "var(--red)", lineHeight: 0.9, flexShrink: 0 }}
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="display" style={{ fontSize: "1.4rem", marginBottom: "12px" }}>{step.title}</h3>
                  <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-2)" }}>{step.body}</p>
                </div>
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "12px",
                  lineHeight: 1.9,
                  color: "var(--ink-2)",
                  background: "var(--paper-2)",
                  borderLeft: "2px solid var(--red)",
                  padding: "16px 18px",
                }}
              >
                <span style={{ color: "var(--ink-3)" }}>{"// "}approach</span>
                <br />
                {step.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
