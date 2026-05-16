"use client";

const ROW_1 = [
  "React", "Node.js", "Python", "Flutter", "Next.js", "PostgreSQL",
  "Redis", "Supabase", "Docker", "FFmpeg", "Claude AI", "n8n",
  "OpenClaw", "HLS Streaming", "Gemini", "Home Assistant",
];

const ROW_2 = [
  "FastAPI", "TypeScript", "Tailwind", "Framer Motion", "Remotion",
  "pgvector", "RAG", "SSE", "JWT", "Proxmox", "BunnyCDN",
  "Cloudflare", "pfSense", "Frigate AI", "Asterisk", "Modbus RTU",
];

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: string[];
  direction?: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} 35s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="tech-badge mx-2 my-1 inline-block">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(0,245,255,0.06)", borderBottom: "1px solid rgba(0,245,255,0.06)" }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #02020a, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #02020a, transparent)" }}
      />

      <div className="space-y-3">
        <MarqueeRow items={ROW_1} direction="left" />
        <MarqueeRow items={ROW_2} direction="right" />
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
