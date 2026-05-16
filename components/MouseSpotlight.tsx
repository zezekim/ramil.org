"use client";
import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--x", `${e.clientX}px`);
      ref.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-30 transition-none"
      style={{
        background: "radial-gradient(700px circle at var(--x, 50%) var(--y, 50%), rgba(0,245,255,0.045), transparent 40%)",
      }}
    />
  );
}
