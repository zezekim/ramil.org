"use client";
import { useEffect, useState } from "react";

const TERMINAL_LINES = [
  { prefix: "$", text: " ai-dev --mode=autonomous", delay: 0 },
  { prefix: "✓", text: " AI pipeline initialized", delay: 600, color: "#10b981" },
  { prefix: "✓", text: " 78 endpoints online", delay: 1100, color: "#10b981" },
  { prefix: "✓", text: " Seoul.fm streaming 6 continents", delay: 1600, color: "#10b981" },
  { prefix: "✓", text: " Production deploy: 1.3s", delay: 2100, color: "#10b981" },
  { prefix: ">", text: " Ready. Systems running.", delay: 2700, color: "#00f5ff" },
];

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay + 800);
    });
  }, []);

  return (
    <div className="terminal w-full max-w-md">
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: "#ff5f56" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#27c93f" }} />
        <span
          className="ml-3 text-xs"
          style={{ color: "rgba(240,240,248,0.3)", fontFamily: "var(--font-mono)" }}
        >
          ~/ramil — zsh
        </span>
      </div>
      <div className="p-5 space-y-2 min-h-[180px]">
        {TERMINAL_LINES.map((line, i) =>
          visibleLines.includes(i) ? (
            <div
              key={i}
              className="flex gap-2 text-sm"
              style={{
                fontFamily: "var(--font-mono)",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <span style={{ color: line.color || "rgba(240,240,248,0.4)" }}>
                {line.prefix}
              </span>
              <span style={{ color: line.color || "rgba(240,240,248,0.8)" }}>
                {line.text}
              </span>
              {i === visibleLines[visibleLines.length - 1] &&
                i === TERMINAL_LINES.length - 1 && (
                  <span
                    className="inline-block w-2 h-4 ml-0.5"
                    style={{
                      background: "#00f5ff",
                      animation: "cursor-blink 1s step-end infinite",
                    }}
                  />
                )}
            </div>
          ) : null
        )}
        {visibleLines.length < TERMINAL_LINES.length && (
          <div
            className="flex gap-2 text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span style={{ color: "rgba(240,240,248,0.4)" }}>$</span>
            <span
              className="inline-block w-2 h-4"
              style={{
                background: "#00f5ff",
                animation: "cursor-blink 1s step-end infinite",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function HeroHeadline() {
  const words = ["I build systems", "that run", "themselves."];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible((v) => {
        if (v >= words.length) {
          clearInterval(timer);
          return v;
        }
        return v + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="font-mono font-bold leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="block transition-all duration-500"
          style={{
            opacity: visible > i ? 1 : 0,
            transform: visible > i ? "translateY(0)" : "translateY(12px)",
            color: i === 2 ? "#00f5ff" : "#f0f0f8",
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
      style={{ paddingTop: "80px" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,255,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Corner decoration */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-px"
                style={{ background: "#00f5ff" }}
              />
              <span className="section-label">AI-native developer</span>
            </div>

            <HeroHeadline />

            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: "rgba(240,240,248,0.55)" }}
            >
              Shipping production features in hours, not months. 17 years of
              building autonomous systems — from streaming platforms serving 6
              continents to AI pipelines that never sleep.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                Let&apos;s Talk →
              </a>
              <a href="#work" className="btn-secondary">
                See My Work
              </a>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 pt-2">
              {[
                ["17", "Years"],
                ["300k+", "Community"],
                ["78", "Endpoints"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div
                    className="font-mono font-bold text-xl"
                    style={{ color: "#00f5ff" }}
                  >
                    {num}
                  </div>
                  <div
                    className="font-mono text-xs mt-0.5"
                    style={{ color: "rgba(240,240,248,0.35)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — terminal */}
          <div className="hidden lg:flex justify-end">
            <div className="relative">
              {/* Glow behind terminal */}
              <div
                className="absolute -inset-8 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,245,255,0.06) 0%, transparent 70%)",
                }}
              />
              <TerminalWindow />
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-lg"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400">
                    Available for Remote Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "rgba(240,240,248,0.25)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
