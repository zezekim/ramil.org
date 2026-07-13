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
    <div aria-hidden className="fixed top-0 left-0 right-0 h-[2px] z-[60]" style={{ background: "transparent" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "var(--red)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
