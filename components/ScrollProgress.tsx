"use client";
import { useEffect, useState } from "react";
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]" style={{ background: "rgba(0,245,255,0.06)" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #7c3aed, #00f5ff)",
          boxShadow: "0 0 10px rgba(0,245,255,0.6)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
