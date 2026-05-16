"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Project = {
  id: string;
  status: "live" | "new";
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  stats: { label: string; value: string }[];
  bullets: string[];
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    id: "seouFm",
    status: "live",
    emoji: "🎵",
    title: "Seoul.fm",
    tagline: "K-pop streaming platform — 300k+ community, 6 continents, 17 years.",
    description:
      "K-pop streaming platform with 300k+ community across 6 continents. 17 years running. Android app live on the Play Store. Broadcast-grade audio via Omnia + StereoTool + BS2B binaural.",
    tags: ["300k Community", "Android App", "17 Years"],
    stats: [
      { label: "Community", value: "300k+" },
      { label: "All-Time Plays", value: "91.3k" },
      { label: "Uptime", value: "17yr" },
      { label: "Max Bitrate", value: "320k" },
    ],
    bullets: [
      "CMAF HLS adaptive streaming — 6 quality tiers (48k–320k AAC)",
      "BS2B binaural crossfeed on 128k+ streams — headphone-optimized spatial audio",
      "Omnia + StereoTool broadcast audio processing chain",
      "Flutter Android app live on Google Play Store",
      "TV Karaoke via Chromecast/AirPlay with synced romanized lyrics",
      "Custom analytics tracking 30+ telemetry metrics per session",
      "Serving 6 continents on $44/month infrastructure",
    ],
    tech: ["React", "Flutter", "Node.js", "PHP", "Python", "PostgreSQL", "Redis", "FFmpeg", "HLS/CMAF", "Proxmox", "BunnyCDN"],
  },
  {
    id: "messagebox",
    status: "new",
    emoji: "📬",
    title: "MessageBox",
    tagline: "Autonomous comm hub — iMessage, SMS, Gmail unified with AI drafting.",
    description:
      "Autonomous communication hub aggregating iMessage, SMS, and Gmail into one dark-mode interface. Claude drafts replies, OpenClaw sends autonomously based on confidence thresholds.",
    tags: ["Agentic", "Next.js 15", "OpenClaw"],
    stats: [
      { label: "Channels", value: "3" },
      { label: "Sending", value: "Auto" },
      { label: "Triage Time", value: "~0ms" },
    ],
    bullets: [
      "Next.js 15 App Router with streaming UI and Suspense",
      "FastAPI backend connecting macOS Messages DB, Gmail API, and Claude",
      "Two-layer caching — HTTP revalidation for GETs, unstable_cache for LLM calls",
      "Financial SMS parsing — GCash, BDO, Atome auto-parsed into structured cards",
      "Auto-draft with edit protection — useRef dirty flag prevents overwriting user edits",
      "OpenClaw integration for autonomous sending with confidence scoring",
      "Deterministic avatar colors via djb2 hash",
    ],
    tech: ["Next.js 15", "FastAPI", "Claude API", "OpenClaw", "Gmail OAuth", "Tailwind", "shadcn/ui", "macOS Messages DB"],
  },
  {
    id: "aicx",
    status: "new",
    emoji: "💎",
    title: "AI CX System",
    tagline: "RAG email triage for luxury retail. Built in a weekend. Under $0.10 CAD/reply.",
    description:
      "Full AI-powered customer experience system for a luxury retail studio in Toronto. Gmail OAuth trigger → n8n orchestration → Claude Opus generation in the client's exact voice.",
    tags: ["RAG", "n8n", "Supabase"],
    stats: [
      { label: "Knowledge Chunks", value: "120" },
      { label: "Cost per Reply", value: "$0.10 CAD" },
      { label: "Build Time", value: "1 Weekend" },
    ],
    bullets: [
      "Gmail OAuth trigger → n8n orchestration → OpenAI embeddings → Supabase pgvector",
      "Claude Opus generation in the client's exact voice — Ritz-Carlton level CX standards",
      "120-chunk knowledge base across 5 loaders — SOPs, voice guidelines, emotional intelligence",
      "Live operations dashboard showing active orders, production pipeline, email draft review",
      "RAG-powered chat widget embedded on client website",
      "Stress-tested with 10 complex client scenarios before going live",
    ],
    tech: ["n8n", "Supabase", "pgvector", "Claude Opus", "OpenAI Embeddings", "Gmail OAuth", "Caddy", "RAG"],
  },
  {
    id: "listinglaunch",
    status: "new",
    emoji: "🏠",
    title: "ListingLaunch",
    tagline: "AI listing kit generator for real estate. Address in → HTML email, PDF, Reels out.",
    description:
      "AI listing package generator built for a Texas real estate firm. Enter a property's address, price, and highlights — get a complete marketing kit in seconds.",
    tags: ["Remotion", "Claude API", "React"],
    stats: [
      { label: "Output Types", value: "4" },
      { label: "Generation Time", value: "<30s" },
      { label: "Video Format", value: "9:16" },
    ],
    bullets: [
      "HTML email — ready to send to contact list",
      "Social captions — three versions: Instagram, LinkedIn, Facebook",
      "PDF flyer copy — headline, description, specs, contact info",
      "Reels-ready video — 30s animated property highlight via Remotion",
      "Voice-trained on agent's existing website content for brand consistency",
      "One-click post buttons for each social platform",
    ],
    tech: ["React", "Tailwind", "Claude API", "Remotion", "Vercel", "jsPDF"],
  },
  {
    id: "inboxai",
    status: "new",
    emoji: "📥",
    title: "InboxAI",
    tagline: "Gmail triage for real estate. Hot/warm/cold classification, drafts queued for review.",
    description:
      "Gmail triage and response system for a commercial real estate operation. Reads every incoming email, classifies it by urgency and type, drafts a reply in the agent's voice.",
    tags: ["Gmail OAuth", "Claude", "n8n"],
    stats: [
      { label: "Urgency Levels", value: "4" },
      { label: "Classification", value: "Auto" },
      { label: "Unseen Leads", value: "0" },
    ],
    bullets: [
      "Hot / Warm / Cold / Skip classification on every incoming email",
      "Lead type tagging — New Lead, Existing Client, Agent/Colleague, Spam",
      "Claude drafts reply in agent's voice — saves to Gmail Drafts automatically",
      "Dashboard with urgency filters, AI summaries, and review status tracking",
      "n8n orchestration polling Gmail every 5 minutes",
    ],
    tech: ["n8n", "Claude API", "Gmail OAuth", "Supabase", "React", "Vercel"],
  },
  {
    id: "tvkaraoke",
    status: "live",
    emoji: "📺",
    title: "TV Karaoke System",
    tagline: "First K-pop platform with Chromecast/AirPlay + synced lyrics. Zero competitors.",
    description:
      "First and only K-pop streaming platform with Chromecast/AirPlay support featuring synced romanized lyrics on TV. Built custom receiver with 4 complete design iterations in 4 hours.",
    tags: ["ONLY In Market", "4hrs Build"],
    stats: [
      { label: "Build Time", value: "4hrs" },
      { label: "Iterations", value: "4" },
      { label: "Market", value: "ONLY" },
    ],
    bullets: [
      "Custom Google Cast SDK receiver at seoul.fm/cast-receiver",
      "Synced romanized + English lyrics displayed on TV screen",
      "Real-time queue updates with album art carousel",
      "AirPlay support via Safari native API",
      "Optimized for 43\" screens — couch-readable typography",
    ],
    tech: ["Google Cast SDK", "Chromecast", "AirPlay", "LRC Lyrics", "JavaScript"],
  },
  {
    id: "dualapi",
    status: "live",
    emoji: "⚡",
    title: "Dual API Architecture",
    tagline: "78 endpoints, two APIs, one weekend. Node.js v2 + PHP v1, Redis pub/sub, SSE.",
    description:
      "Production REST API with dual architecture. Node.js v2 (42 private endpoints) for internal use + PHP v1 (36 public endpoints) with Swagger docs. Built complete system in one weekend.",
    tags: ["78 Endpoints", "Weekend Build"],
    stats: [
      { label: "Total Endpoints", value: "78" },
      { label: "Avg Response", value: "<4ms" },
      { label: "Error Rate", value: "0.00%" },
    ],
    bullets: [
      "API v2 (Node.js): 42 private endpoints with SSE real-time streams",
      "API v1 (PHP): 36 public endpoints with Swagger/OpenAPI documentation",
      "Redis pub/sub for real-time updates (<200ms latency)",
      "JWT authentication + rate limiting",
      "Triggers iOS MediaSession API for native controls",
    ],
    tech: ["Node.js", "PHP", "Redis pub/sub", "SSE", "JWT", "Swagger", "MySQL"],
  },
  {
    id: "songingest",
    status: "live",
    emoji: "🎧",
    title: "SongIngest",
    tagline: "MP3 broadcast pipeline. -16 LUFS normalization, AI Hangul romanization, 6,400 songs.",
    description:
      "MP3 preparation pipeline for broadcast. Turns messy MP3s into clean, radio-safe files with proper metadata, loudness normalization, and AI-powered romanization.",
    tags: ["Broadcast", "AI Metadata"],
    stats: [
      { label: "Library Size", value: "6,400" },
      { label: "Output", value: "-16 LUFS" },
      { label: "Bitrate", value: "320kbps" },
    ],
    bullets: [
      "Force ID3v2.3 compatibility — USLT/TXXX/COMM mirrors, latin-1 fallback",
      "AI Hangul romanization via OpenAI or Gemini (switchable)",
      "Spotify + iTunes API autofill for missing metadata",
      "FFmpeg loudnorm at -16 LUFS, 320kbps output",
      "Parallel encoding via ThreadPoolExecutor with fcntl locking",
    ],
    tech: ["Python", "Flask", "FFmpeg", "Mutagen", "OpenAI", "Gemini", "Spotify API"],
  },
  {
    id: "smarthome",
    status: "live",
    emoji: "🏡",
    title: "Integrated Home Infrastructure",
    tagline: "18-camera AI security, 6-zone audio, VoIP, weather station, dual-WAN — all via Home Assistant.",
    description:
      "Complete smart home ecosystem coordinating security, audio, environment, and telecom via Home Assistant. Self-installed electrical and Cat6 cabling.",
    tags: ["IoT", "AI Vision"],
    stats: [
      { label: "Cameras", value: "18" },
      { label: "Audio Zones", value: "6" },
      { label: "WAN Links", value: "2" },
    ],
    bullets: [
      "18-camera CCTV + Frigate AI person detection (Google Coral TPU)",
      "6-zone audio via REST API + VoIP intercom (Asterisk/SIP)",
      "Weather station with Modbus RTU sensors + air quality monitoring",
      "Proxmox VMs + dual fiber (500/100Mbps) with pfSense failover",
      "Complete electrical wiring and Cat6 cabling (self-installed)",
    ],
    tech: ["Proxmox", "Frigate AI", "Coral TPU", "pfSense", "Home Assistant", "Asterisk", "Modbus RTU"],
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,2,10,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background: "#080810",
          border: "1px solid rgba(0,245,255,0.15)",
          boxShadow: "0 0 60px rgba(0,245,255,0.08), 0 32px 64px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between p-6"
          style={{ borderBottom: "1px solid rgba(0,245,255,0.08)", background: "#080810" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.emoji}</span>
            <div>
              <h2 className="font-mono font-bold text-xl text-white">{project.title}</h2>
              <span className={project.status === "live" ? "badge-live" : "badge-new"}>
                {project.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "rgba(240,240,248,0.4)" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {project.stats.map((s) => (
              <div key={s.label} className="glass-card rounded-lg p-3 text-center">
                <div className="font-mono font-bold text-lg" style={{ color: "#00f5ff" }}>
                  {s.value}
                </div>
                <div className="font-mono text-xs mt-0.5" style={{ color: "rgba(240,240,248,0.4)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{ color: "rgba(240,240,248,0.65)", lineHeight: 1.7 }}>
            {project.description}
          </p>

          {/* Bullets */}
          <div>
            <div className="section-label mb-3">Technical Details</div>
            <ul className="space-y-2">
              {project.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: "rgba(240,240,248,0.6)" }}>
                  <span style={{ color: "#00f5ff", flexShrink: 0 }}>›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <div className="section-label mb-3">Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      className="glass-card rounded-xl p-5 cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-xl"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(0,245,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{project.emoji}</span>
        <span className={project.status === "live" ? "badge-live" : "badge-new"}>
          {project.status}
        </span>
      </div>

      <h3 className="font-mono font-bold text-base text-white mb-2">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,240,248,0.45)" }}>
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="tech-badge" style={{ fontSize: "10px" }}>{t}</span>
        ))}
      </div>

      <div
        className="font-mono text-xs flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
        style={{ color: "rgba(0,245,255,0.5)" }}
      >
        View Details
        <span style={{ color: "#00f5ff" }}>→</span>
      </div>
    </div>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-3">Selected Work</div>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-white mb-4">
            Systems that deliver.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: "rgba(240,240,248,0.45)" }}>
            From streaming platforms to AI pipelines, every project is built for production
            reliability and radical speed.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setActiveProject(p)} />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
