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
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "seoulfm",
    status: "live",
    emoji: "🎵",
    title: "Seoul.fm",
    tagline:
      "17 years on air. A full K-pop streaming platform — multi-bitrate spatial-audio HLS, pitch-scored karaoke, real-time chat, Chromecast, and a native Android app.",
    description:
      "A long-running K-pop internet radio station rebuilt into a full streaming platform: a Next.js web player on Cloudflare, a Flutter Android app, a self-hosted FFmpeg/CMAF encoder pipeline, a dual REST/SSE API, an edge HLS proxy, and a production chat service with AI-driven mood analysis. Listeners request and dedicate songs, follow now-playing over SSE, and sing along in a pitch-scored karaoke mode.",
    tags: ["17 Years Live", "K-pop Streaming", "Multi-repo Platform"],
    stats: [
      { label: "Community", value: "300k+" },
      { label: "Years Live", value: "17" },
      { label: "Bitrate Tiers", value: "6" },
      { label: "All-Time Plays", value: "91k+" },
    ],
    bullets: [
      "6-tier CMAF/fMP4 HLS encoder (48–320k AAC) with FFmpeg bs2b binaural crossfeed on the 128k+ spatial tiers",
      "Dual real-time API — Express REST + Server-Sent Events over Redis pub/sub, with a song-request pipeline forwarding to SAM Broadcaster over a raw TCP/XML socket",
      "Pitch-scored karaoke — in-browser Web Audio autocorrelation pitch detection synced to LRC lyrics, graded S–D per line",
      "Chromecast + AirPlay via the Google Cast SDK with a custom TV receiver showing now-playing art and synced lyrics",
      "Flutter Android app (15 screens) with background audio, live now-playing over SSE, charts, search, and chat",
      "Production chat — Flask + gevent SSE behind nginx, Redis ZSET store, plus a pub/sub 'SongEngine' running LLM mood analysis to steer playlist curation",
      "Self-hosted encoder with Prometheus /metrics, FFmpeg silence detection, watchdog auto-restart, and Telegram alerting",
      "Web player deployed to Cloudflare Workers via OpenNext; an edge HLS proxy worker rewrites manifests for iOS fMP4 compatibility",
    ],
    tech: [
      "Next.js 15", "Flutter", "Node.js/Express", "Python/FastAPI", "Flask",
      "MySQL", "Redis", "FFmpeg", "HLS/CMAF", "Cloudflare Workers", "BunnyCDN", "Google Cast SDK",
    ],
    featured: true,
  },
  {
    id: "mxsentinel",
    status: "new",
    emoji: "🛡️",
    title: "MX Sentinel",
    tagline:
      "Datadog for email infrastructure — a 19-service Go mesh correlating SMTP telemetry, DNS auth state, and DMARC reports into AI root-cause diagnostics.",
    description:
      "An email-infrastructure observability and deliverability platform written in Go. It parses Postfix maillogs, continuously validates SPF/DKIM/DMARC/MX, ingests DMARC aggregate reports, and correlates the signals into operational incidents — then uses a local LLM to generate root-cause narratives and remediation steps. Multi-tenant, built for hosting providers and mail operators.",
    tags: ["Go Service Mesh", "Email Security", "AI Diagnostics"],
    stats: [
      { label: "Go Services", value: "19" },
      { label: "REST Endpoints", value: "72" },
      { label: "DNS Findings", value: "19" },
      { label: "Go Source", value: "23k LOC" },
    ],
    bullets: [
      "19-binary Go service mesh (apid, dnsd, telemetryd, ingestd, dmarcd, correld, incidentd, aid…) over shared internal packages, communicating only via a NATS JetStream event bus",
      "DNS validation engine detecting 19 distinct finding codes across SPF/DKIM/DMARC/MX — SPF >10-lookup permerror, include loops, +all, DKIM weak/revoked, DMARC p=none/missing-rua",
      "Privacy by construction — telemetry extracts metadata only, hashes recipients, never stores message bodies, and spools to disk if the bus is down",
      "Correlation engine that detects per-provider rejection spikes and links them to recent DNS changes to emit a root-cause hypothesis",
      "Local-LLM diagnostics (Ollama/vLLM via an OpenAI-compatible endpoint) writing ai_summary and ai_remediation onto incidents — metadata only",
      "Outbound-security suite — DNSBL self-monitor with fail-open Postfix auto-pull, volume-baseline anomaly detection, ARF feedback loops, and per-credential compromise detection",
      "AES-256-GCM encryption for stored cPanel/WHMCS/SMTP credentials; WHM JSON API + WHMCS billing integration",
      "PostgreSQL + ClickHouse + Redis + MinIO datastores, UUIDv7 event envelopes, and a 21-page Next.js dashboard",
    ],
    tech: [
      "Go 1.26", "PostgreSQL", "ClickHouse", "NATS JetStream", "Redis",
      "MinIO/S3", "Next.js", "Docker Compose", "Caddy", "Ollama/vLLM",
    ],
  },
  {
    id: "dmarcparser",
    status: "live",
    emoji: "📨",
    title: "dmarcparser",
    tagline:
      "Turn raw DMARC aggregate XML into a live deliverability dashboard — a Go parser + viewer, plus a multi-tenant WHMCS client module.",
    description:
      "A DMARC reporting suite. A parser service ingests aggregate XML reports (with an IMAP poller) and exposes a REST API with per-domain health and readiness scoring; a Go + Postgres web viewer renders reports and analytics; and 'Email Captain' — a WHMCS addon — turns it into a per-customer DMARC dashboard.",
    tags: ["DMARC", "Go + Postgres", "WHMCS Module"],
    stats: [
      { label: "Deployment", value: "Live" },
      { label: "Backend", value: "Go + PG" },
      { label: "Integration", value: "WHMCS" },
    ],
    bullets: [
      "Parser service ingests DMARC aggregate (RUA) XML via an IMAP poller and exposes a scoped REST API (/api/v1) with per-domain health and readiness scoring",
      "Go + chi + pgx web viewer over PostgreSQL — report list, per-report detail with raw XML, and an analytics dashboard (pass/fail rates, volume, top failing senders)",
      "Dockerized stack behind Caddy with automatic TLS",
      "'Email Captain' WHMCS addon surfaces a per-customer DMARC dashboard — ownership-scoped so URL tampering can't expose another client's domains",
      "Server-side-only API keys with a MySQL cache layer; read-scoped access from the billing panel",
      "Weekly automated DMARC summary pushed to Confluence via the analytics JSON endpoint",
      "Chart.js timeseries of alignment rate, message volume, and policy state per domain",
    ],
    tech: ["Go", "PostgreSQL", "chi", "pgx", "Caddy", "Docker", "PHP/WHMCS", "Chart.js", "IMAP"],
  },
  {
    id: "aicx",
    status: "new",
    emoji: "💎",
    title: "AI CX System",
    tagline:
      "A luxury retailer's entire customer-experience layer — RAG knowledge base, Ritz-Carlton-grade reply generation, and n8n orchestration.",
    description:
      "An AI customer-experience system for a luxury retail brand. A ~130-chunk knowledge base — operations, sales guidance, CX writing rules, and emotional-intelligence reply standards — is embedded into a Supabase vector store and retrieved by an n8n RAG pipeline to draft replies in the brand's exact voice.",
    tags: ["RAG", "Supabase pgvector", "n8n"],
    stats: [
      { label: "Knowledge Chunks", value: "~130" },
      { label: "Domain Loaders", value: "5" },
      { label: "Retrieval", value: "top-8" },
    ],
    bullets: [
      "~130 knowledge chunks across 5 domain loaders — internal operations, sales/objection handling, five-star CX writing rules, Ritz-Carlton-level emotional intelligence, and public business facts",
      "OpenAI text-embedding-3-small embeddings inserted into a Supabase pgvector documents table",
      "Encodes real business logic — order-status flow, a 40/40/20 three-stage payment structure, refund-escalation rules, and the full client journey",
      "Feeds an n8n RAG retriever (top-8 chunks) that generates replies in the brand's voice",
      "Domain-split knowledge base keeps operational, sales, and tone guidance independently maintainable",
    ],
    tech: ["Supabase", "pgvector", "OpenAI Embeddings", "n8n", "Claude", "RAG", "Node.js"],
  },
  {
    id: "inboxai",
    status: "new",
    emoji: "📥",
    title: "InboxAI",
    tagline:
      "Every email read, classified hot/warm/cold, and drafted in the agent's voice — before they open Gmail.",
    description:
      "A Gmail triage and draft-generation system for a real-estate agent. An n8n workflow pulls unread mail every 5 minutes, Claude classifies each message and writes a draft reply in the agent's voice, everything persists to Supabase, an unsent Gmail draft is saved, and a Slack alert fires. A dashboard lets the agent review and approve before sending.",
    tags: ["Gmail OAuth", "Claude", "n8n"],
    stats: [
      { label: "Categories", value: "5" },
      { label: "Gmail Poll", value: "5 min" },
      { label: "Urgency", value: "4 levels" },
    ],
    bullets: [
      "5-category classification (lead, existing client, agent/colleague, listing, spam) with a 0–5 urgency score mapped to hot/warm/cold/skip",
      "Claude (claude-sonnet-4-6) with Anthropic prompt caching on the system block; returns strict JSON with category, urgency, reasoning, and a drafted reply",
      "n8n pipeline — Gmail trigger → normalize → Claude → Supabase → Gmail draft → Slack alert; the spam branch terminates with no draft",
      "Supabase schema with emails/classifications/drafts tables and a triage_summary view the dashboard reads",
      "Deployed as Vercel serverless functions plus a local Express server; a robust Gmail parser handles multiple API response shapes",
    ],
    tech: ["n8n", "Claude API", "Gmail OAuth", "Supabase", "Vercel", "Node.js", "Slack"],
  },
  {
    id: "listinglaunch",
    status: "new",
    emoji: "🏠",
    title: "ListingLaunch",
    tagline:
      "Paste a listing, get an HTML email, social captions, a PDF flyer, and a 9:16 Reels video in seconds — all in the agent's voice.",
    description:
      "A real-estate marketing-kit generator. Enter a property's address, price, and highlights and a Claude-backed route returns four outputs: an HTML email, platform-tuned social captions, a downloadable PDF flyer, and a 30-second 9:16 Remotion video — all written in the listing agent's brand voice.",
    tags: ["Remotion", "Claude API", "Next.js"],
    stats: [
      { label: "Output Types", value: "4" },
      { label: "Video Format", value: "9:16" },
      { label: "Voice", value: "Brand-trained" },
    ],
    bullets: [
      "One Claude (claude-sonnet-4-6) route returns a strict-JSON package: email, Instagram/LinkedIn/Facebook captions, PDF copy, and a video script",
      "Per-platform caption constraints baked into the prompt (word and hashtag caps per network)",
      "Brand voice centralized with explicit forbidden filler words ('stunning', 'breathtaking', 'don't miss out')",
      "9:16 Reels video via Remotion with Ken Burns photo effects and background music, exported through the browser MediaRecorder",
      "Client-side PDF flyer via jsPDF + html2canvas; Zod-typed inputs and outputs throughout",
    ],
    tech: ["Next.js 16", "React 19", "Claude API", "Remotion", "jsPDF", "Tailwind", "Zod"],
  },
  {
    id: "zoomtranscribe",
    status: "new",
    emoji: "🎙️",
    title: "ZoomTranscribe",
    tagline:
      "Drop in a Zoom recording, get a time-synced transcript and AI meeting notes on a YouTube-style watch page.",
    description:
      "A self-hosted web app that ingests Zoom recordings, extracts audio with FFmpeg, transcribes via OpenAI Whisper, and presents a time-synced, clickable transcript plus AI-generated meeting insights. Runs as a single Docker container.",
    tags: ["Whisper", "FastAPI", "Self-hosted"],
    stats: [
      { label: "Transcription", value: "Whisper" },
      { label: "Cost", value: "~$0.36/hr" },
      { label: "Exports", value: "3 formats" },
    ],
    bullets: [
      "FFmpeg pipeline downmixes to mono 16 kHz, auto-splits recordings into 20-minute chunks (under the 25 MB API limit), then merges with offset-corrected timestamps",
      "OpenAI Whisper (whisper-1) with segment-level timestamps; provider configurable via OPENAI_BASE_URL for self-hosted endpoints",
      "GPT-4o-mini generates meeting insights — overview, key points, to-dos, and decisions",
      "Optional speaker diarization via pyannote.audio + PyTorch",
      "Exports VTT/SRT/TXT; WebVTT captions overlaid on a searchable, auto-highlighting transcript player",
    ],
    tech: ["Python/FastAPI", "OpenAI Whisper", "GPT-4o-mini", "FFmpeg", "SQLite", "pyannote.audio", "Docker"],
  },
  {
    id: "plumbingbros",
    status: "new",
    emoji: "🚰",
    title: "PlumbingBros AI Quote Builder",
    tagline:
      "Paste messy trade job notes, get a professional Australian quote — pricing, GST, and compliance — in seconds.",
    description:
      "A full-stack AI quote builder for an Australian plumbing/electrical trade business. A tradesperson pastes rough job notes and the app returns an itemized, customer-ready quote with local trade pricing, GST, compliance notes, and upsell suggestions — with the maths recomputed server-side rather than trusted to the model.",
    tags: ["Claude Tools", "FastAPI", "Next.js"],
    stats: [
      { label: "GST", value: "10%" },
      { label: "Standards", value: "AS/NZS" },
      { label: "Output", value: "Branded PDF" },
    ],
    bullets: [
      "Forced Claude tool call (build_quote) for guaranteed structured output, with the system prompt sent as a cache_control ephemeral block",
      "Deterministic server-side maths — line totals, subtotal, 10% GST, and total recomputed rather than trusting the LLM",
      "Editable pricing settings (labour rates, call-out fee, common items) persisted in localStorage and injected into the prompt as exact rates",
      "System prompt encodes AS/NZS 3500 (plumbing) and AS/NZS 3000 (electrical) standards and refuses to invent facts",
      "Branded A4 PDF quote export via @react-pdf/renderer",
    ],
    tech: ["Python/FastAPI", "Claude API", "Next.js 14", "React", "@react-pdf/renderer", "Tailwind"],
  },
  {
    id: "help2move",
    status: "new",
    emoji: "📦",
    title: "Help2Move",
    tagline:
      "A conversion-focused Dutch moving-service landing page with a Google Places-powered, multi-step quote form.",
    description:
      "A Dutch-language marketing site and lead-gen tool for Help2Move, a transparent moving service. A multi-step 'offerte' (quote) form captures a move request with address autocomplete and live distance calculation, fronted by a conversion-oriented landing page.",
    tags: ["Next.js", "Google Places", "Lead-gen"],
    stats: [
      { label: "Quote Form", value: "Multi-step" },
      { label: "Address", value: "Places API" },
      { label: "Distance", value: "Haversine" },
    ],
    bullets: [
      "Multi-step quote form with per-step Zod validation via react-hook-form",
      "Google Places autocomplete restricted to NL/BE/DE with a 280ms debounce, parsing structured address + lat/lng",
      "Haversine distance calculation between pickup and drop-off, shown in the quote summary",
      "Conversion-oriented landing sections — hero, trust bar, services, how-it-works, testimonials, CTA",
      "Framer Motion animations with a tokenized brand design system",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Framer Motion", "Google Maps API", "Zod"],
  },
  {
    id: "testtools",
    status: "new",
    emoji: "🧰",
    title: "Test Tools",
    tagline:
      "Three tools, one app: AI email drafts from a CSV, a Telegram voice-note logger, and a live K-pop radio dashboard.",
    description:
      "A 3-in-1 Node/Express utility bundling a CSV-to-personalized-email generator, a Telegram voice-note logger with auto-summaries to Google Sheets, and a live Seoul.fm radio dashboard — with an in-browser settings tab to manage and test API keys.",
    tags: ["Express", "OpenAI", "Telegram Bot"],
    stats: [
      { label: "Tools", value: "3" },
      { label: "Integrations", value: "4" },
      { label: "Refresh", value: "20s" },
    ],
    bullets: [
      "CSV upload → per-contact personalized email via GPT-4o-mini with a mail-merge fallback; .eml export, capped at 50/run",
      "Telegram bot (long-polling) transcribes voice notes via Whisper, summarizes via GPT, and appends to Google Sheets",
      "Live radio dashboard proxying the Seoul.fm API server-side with TTL caching and 20s auto-refresh",
      "In-browser settings with per-integration 'Test connection' and hot bot-restart on key change; graceful degradation when a key is missing",
    ],
    tech: ["Node.js", "Express", "OpenAI", "node-telegram-bot-api", "Google Sheets API"],
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

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      className="glass-card rounded-xl p-7 cursor-pointer group relative overflow-hidden col-span-full"
      onClick={onClick}
      style={{
        border: "1px solid rgba(0,245,255,0.15)",
        background: "rgba(10,10,20,0.8)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-xl"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(0,245,255,0.06) 0%, transparent 60%)",
        }}
      />
      {/* Featured accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
        style={{ background: "linear-gradient(90deg, #00f5ff, #7c3aed)" }}
      />

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{project.emoji}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-mono font-bold text-2xl text-white">{project.title}</h3>
                <span className="badge-live">live</span>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(0,245,255,0.08)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    color: "rgba(0,245,255,0.7)",
                  }}
                >
                  Flagship
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,248,0.5)" }}>
                {project.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((t) => (
              <span key={t} className="tech-badge" style={{ fontSize: "10px" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right — inline stats */}
        <div className="flex gap-6 md:gap-8 flex-shrink-0">
          {project.stats.slice(0, 3).map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono font-bold text-xl" style={{ color: "#00f5ff" }}>
                {s.value}
              </div>
              <div className="font-mono text-xs mt-0.5" style={{ color: "rgba(240,240,248,0.35)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="font-mono text-xs flex items-center gap-1 mt-5 transition-all duration-200 group-hover:gap-2"
        style={{ color: "rgba(0,245,255,0.5)" }}
      >
        View Details
        <span style={{ color: "#00f5ff" }}>→</span>
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

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

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
            Every project below is real, built code — production platforms, client systems, and tools. Not portfolio demos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p) => (
            <FeaturedCard key={p.id} project={p} onClick={() => setActiveProject(p)} />
          ))}
          {rest.map((p) => (
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
