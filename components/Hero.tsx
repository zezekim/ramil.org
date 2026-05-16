"use client";
import { useEffect, useState } from "react";

// Status dashboard rows: [delay in ms, content type]
type DashRow =
  | { type: "cmd"; delay: number }
  | { type: "blank"; delay: number }
  | { type: "header"; delay: number }
  | { type: "row"; delay: number; name: string; status: string; uptime: string }
  | { type: "footer"; delay: number };

const DASH_ROWS: DashRow[] = [
  { type: "cmd",    delay: 0 },
  { type: "blank",  delay: 300 },
  { type: "header", delay: 700 },
  { type: "row",    delay: 1000, name: "Seoul.fm",        status: "LIVE",    uptime: "17yr · 6 continents" },
  { type: "row",    delay: 1300, name: "API v2 (42 eps)", status: "ONLINE",  uptime: "<4ms avg response" },
  { type: "row",    delay: 1600, name: "AI Pipeline",     status: "RUNNING", uptime: "24/7 autonomous" },
  { type: "row",    delay: 2200, name: "Community",       status: "ACTIVE",  uptime: "300k+ members" },
  { type: "blank",  delay: 2600 },
  { type: "footer", delay: 2900 },
];

function pad(s: string, n: number) {
  return s.length >= n ? s : s + " ".repeat(n - s.length);
}

function AntipoloClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // UTC+8
      const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);
      const h = utc8.getUTCHours().toString().padStart(2, "0");
      const m = utc8.getUTCMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m} PHT · UTC+8`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="mt-3 flex items-center gap-2"
      style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(240,240,248,0.35)" }}
    >
      <span style={{ color: "rgba(0,245,255,0.4)" }}>◷</span>
      <span>Current time in Antipolo — {time}</span>
    </div>
  );
}

function TerminalWindow() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    DASH_ROWS.forEach((row, i) => {
      setTimeout(() => setVisible((prev) => [...prev, i]), row.delay + 600);
    });
  }, []);

  const isVisible = (i: number) => visible.includes(i);

  return (
    <div className="terminal w-full max-w-lg">
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
      <div className="p-5 min-h-[220px]" style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
        {DASH_ROWS.map((row, i) => {
          if (!isVisible(i)) return null;
          const style: React.CSSProperties = {
            animation: "fadeIn 0.3s ease",
            whiteSpace: "pre",
          };
          if (row.type === "cmd") {
            return (
              <div key={i} style={style}>
                <span style={{ color: "rgba(0,245,255,0.6)" }}>$</span>
                <span style={{ color: "rgba(240,240,248,0.8)" }}> ramil.dev --status</span>
              </div>
            );
          }
          if (row.type === "blank") {
            return <div key={i} style={{ height: "0.6em" }} />;
          }
          if (row.type === "header") {
            return (
              <div key={i} style={{ ...style, color: "rgba(240,240,248,0.35)", fontSize: "11px", letterSpacing: "0.08em" }}>
                {pad("SYSTEM", 18)}{pad("STATUS", 12)}UPTIME
              </div>
            );
          }
          if (row.type === "row") {
            return (
              <div key={i} style={{ ...style, color: "rgba(240,240,248,0.75)", fontSize: "12px" }}>
                {pad(row.name, 18)}
                <span style={{ color: "#10b981" }}>● {pad(row.status, 10)}</span>
                <span style={{ color: "rgba(240,240,248,0.45)" }}>{row.uptime}</span>
              </div>
            );
          }
          if (row.type === "footer") {
            return (
              <div key={i} style={{ ...style, color: "#00f5ff", fontSize: "12px" }}>
                → All systems operational.
                <span
                  className="inline-block w-2 h-3.5 ml-1 align-middle"
                  style={{ background: "#00f5ff", animation: "cursor-blink 1s step-end infinite" }}
                />
              </div>
            );
          }
          return null;
        })}
        {visible.length < DASH_ROWS.length && (
          <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
            <span style={{ color: "rgba(240,240,248,0.4)" }}>$</span>
            <span
              className="inline-block w-2 h-4"
              style={{ background: "#00f5ff", animation: "cursor-blink 1s step-end infinite" }}
            />
          </div>
        )}
      </div>
      <AntipoloClock />
      <div style={{ height: "12px" }} />
    </div>
  );
}

function HeroHeadline() {
  const words = ["I build systems", "that know what", "to do next."];
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
              <span className="w-8 h-px" style={{ background: "#00f5ff" }} />
              <span className="section-label">AI-native developer</span>
            </div>

            <HeroHeadline />

            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: "rgba(240,240,248,0.55)" }}
            >
              Most developers build features. I build systems that know what to do next.
              17 years of production instincts, now multiplied by AI — I ship in days what
              agencies quote in months.
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
                  <div className="font-mono font-bold text-xl" style={{ color: "#00f5ff" }}>
                    {num}
                  </div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: "rgba(240,240,248,0.35)" }}>
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
            background: "linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)",
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
