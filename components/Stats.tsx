"use client";
import { useRef, useEffect, useState } from "react";
import { useCounter } from "@/hooks/useCounter";

const STATS = [
  { value: 17, suffix: "", label: "Years Building", sublabel: "Since 2007" },
  { value: 300, suffix: "k+", label: "Community", sublabel: "Across 6 continents" },
  { value: 78, suffix: "", label: "API Endpoints", sublabel: "Dual architecture" },
  { value: 91, suffix: "k+", label: "All-Time Plays", sublabel: "Seoul.fm streams" },
];

function StatCard({
  value,
  suffix,
  label,
  sublabel,
  active,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  active: boolean;
  index: number;
}) {
  const count = useCounter(value, 2000, active);

  return (
    <div
      className="glass-card rounded-xl p-6 relative overflow-hidden"
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(0,245,255,0.06) 0%, transparent 100%)",
        }}
      />

      <div
        className="font-mono font-bold leading-none mb-1"
        style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#00f5ff" }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="font-mono text-xs uppercase tracking-widest mb-1"
        style={{ color: "rgba(240,240,248,0.7)" }}
      >
        {label}
      </div>
      <div
        className="font-mono text-xs"
        style={{ color: "rgba(240,240,248,0.3)" }}
      >
        {sublabel}
      </div>
    </div>
  );
}

export default function Stats() {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 max-w-7xl mx-auto px-6"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} active={active} index={i} />
        ))}
      </div>
    </section>
  );
}
