"use client";
import { useRef, useEffect, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Understand the Problem",
    body: "Deep-dive into requirements, constraints, and edge cases before writing a single line. The fastest code is code you don't have to rewrite.",
    code: `// requirements.ts
const constraints = await analyze({
  requirements: userNeeds,
  edgeCases: true,
  depth: 'exhaustive'
});`,
  },
  {
    num: "02",
    title: "Build with AI Leverage",
    body: "Use AI as a multiplier, not a crutch. Schema-enforced outputs, validation layers, and human approval gates ensure quality at speed.",
    code: `// pipeline.ts
const output = await claude.generate({
  schema: z.object({ ... }),
  validation: strict,
  humanGate: highRisk ? true : auto
});`,
  },
  {
    num: "03",
    title: "Ship to Production",
    body: "Not a prototype. Not a demo. Production-grade systems with monitoring, error handling, and the reliability to run for years unattended.",
    code: `// deploy.ts
await deploy({
  target: 'production',
  monitoring: true,
  errorHandling: 'comprehensive',
  uptime: '99.9%'
});`,
  },
];

export default function Process() {
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
      id="process"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24"
      style={{ borderTop: "1px solid rgba(0,245,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="section-label mb-3">How I Work</div>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-white mb-4">
            Speed without shortcuts.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: "rgba(240,240,248,0.45)" }}>
            AI-native workflow that ships production features in hours, with the reliability
            you&apos;d expect from months of development.
          </p>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="glass-card rounded-xl overflow-hidden"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
              }}
            >
              <div className="grid md:grid-cols-2">
                {/* Left */}
                <div className="p-8 border-r border-[rgba(0,245,255,0.06)]">
                  <div
                    className="font-mono font-bold text-5xl mb-4 leading-none"
                    style={{ color: "rgba(0,245,255,0.15)" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-mono font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,248,0.5)" }}>
                    {step.body}
                  </p>
                </div>
                {/* Right — code */}
                <div
                  className="p-6"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                >
                  <div
                    className="text-xs leading-relaxed whitespace-pre"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "rgba(240,240,248,0.4)",
                    }}
                  >
                    <span style={{ color: "rgba(0,245,255,0.5)" }}>
                      {step.code.split("\n")[0]}
                    </span>
                    {"\n"}
                    {step.code.split("\n").slice(1).map((line, li) => (
                      <div key={li}>
                        {line.includes("await") || line.includes("const") || line.includes("//") ? (
                          <span style={{ color: line.includes("//") ? "rgba(107,114,128,0.8)" : "rgba(167,139,250,0.7)" }}>
                            {line}
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
