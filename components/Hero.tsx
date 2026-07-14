"use client";
import { useEffect, useState } from "react";

function ManilaClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);
      const h = utc8.getUTCHours().toString().padStart(2, "0");
      const m = utc8.getUTCMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabnum">
      Manila {time} · UTC+8
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative" style={{ paddingTop: "64px" }}>
      <div className="wrap">
        {/* Metadata bar */}
        <div
          className="mono flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3"
          style={{
            fontSize: "11px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <span>Systems builder</span>
          <ManilaClock />
          <span>Building since 2009 — 17 yrs</span>
          <span style={{ color: "var(--live)" }}>Available for work</span>
        </div>

        {/* Masthead */}
        <div style={{ padding: "clamp(40px, 8vw, 88px) 0 44px" }}>
          <div className="eyebrow" style={{ marginBottom: "26px" }}>
            — Full systems, one builder
          </div>

          <h1
            className="display"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)", marginBottom: "36px" }}
          >
            Ships in days.
            <br />
            Runs for{" "}
            <span style={{ color: "var(--red)" }}>years.</span>
          </h1>

          <div
            className="grid gap-x-12 gap-y-8"
            style={{ gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", alignItems: "end" }}
          >
            <p style={{ fontSize: "clamp(15px, 1.9vw, 18px)", lineHeight: 1.55, maxWidth: "46ch", color: "var(--ink)" }}>
              I&apos;m Ramil — a systems builder. I build complete production
              systems: distributed backends, AI pipelines, and the interfaces on
              top, shipped in days, not months. Seventeen years ago I put a radio
              station online. It&apos;s still running today, and I&apos;ve never had
              to touch it.
            </p>

            <div
              className="mono"
              style={{ fontSize: "12.5px", lineHeight: 2, color: "var(--ink-2)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--rule)", padding: "3px 0" }}>
                <span style={{ color: "var(--ink-3)" }}>Focus</span>
                <span style={{ color: "var(--ink)" }}>AI · Backend · Media</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--rule)", padding: "3px 0" }}>
                <span style={{ color: "var(--ink-3)" }}>Stack</span>
                <span style={{ color: "var(--ink)" }}>Go · Python · Next.js</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--rule)", padding: "3px 0" }}>
                <span style={{ color: "var(--ink-3)" }}>Shipped</span>
                <span style={{ color: "var(--ink)" }}>11 production systems</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                <span style={{ color: "var(--ink-3)" }}>Flagship</span>
                <span style={{ color: "var(--ink)" }}>Seoul.fm — 17 yrs live</span>
              </div>
            </div>
          </div>

          {/* CTA row — ruled */}
          <div
            className="flex flex-col sm:flex-row"
            style={{ marginTop: "44px", borderTop: "2px solid var(--ink-line)", borderBottom: "1px solid var(--rule)" }}
          >
            <a href="#contact" className="btn btn-red" style={{ flex: 1, justifyContent: "center", borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
              Start a project
            </a>
            <a href="#work" className="btn" style={{ flex: 1, justifyContent: "center", border: 0, borderLeft: "1px solid var(--rule)" }}>
              See selected work
            </a>
            <a href="https://seoul.fm" target="_blank" rel="noopener noreferrer" className="btn" style={{ flex: 1, justifyContent: "center", border: 0, borderLeft: "1px solid var(--rule)" }}>
              Seoul.fm ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
