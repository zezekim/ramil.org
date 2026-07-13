"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Project = {
  id: string;
  status: "live" | "new";
  title: string;
  kind: string;
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
    title: "Seoul.fm",
    kind: "K-pop streaming platform",
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
    id: "tofuvideo",
    status: "new",
    title: "tofuvideo",
    kind: "AI video production platform",
    tagline:
      "Type a topic, get a finished video — a distributed AI pipeline that scripts, illustrates, voices, captions and assembles a full MP4. Local-first, runs with zero API keys.",
    description:
      "An AI video production platform. From a single topic (or a pasted script) it writes the script and scene breakdown, generates or sources each scene's visual, records a voiceover, times captions, produces avatar intro/outro, and assembles the final MP4 with FFmpeg. Every stage is a local-first provider chain that degrades gracefully, so the whole pipeline runs offline on free/local models — paid APIs (Claude, ElevenLabs, Replicate, HeyGen) are optional upgrades, not requirements.",
    tags: ["AI Video", "Distributed Pipeline", "Local-first"],
    stats: [
      { label: "Pipeline Stages", value: "8" },
      { label: "Provider Chains", value: "9" },
      { label: "Zero-key Mode", value: "$0" },
    ],
    bullets: [
      "8-stage job state machine (script → scenes → visuals → audio → avatar → assemble) run on a background thread pool with atomic job claiming and crash recovery",
      "Provider registry with per-stage fallback chains across 9 engines — Ollama/Claude scripts, Kokoro/ElevenLabs voices, stock/ComfyUI/Replicate visuals, SadTalker/HeyGen avatars",
      "Content-addressed clip cache — each scene clip is fingerprinted so editing one scene of a 40-scene video re-encodes only that clip while concat-copy stays valid",
      "Parallel FFmpeg assembly with Ken Burns motion, sidechain-ducked background music, and libass-free TikTok word-by-word captions rendered via a Pillow overlay",
      "Claude vision used only to select the best stock photo (never to generate it), with costs booked to a separate category so the image-source badge stays honest",
      "Local-only mode structurally blocks every paid provider — a real product that renders end-to-end for $0",
    ],
    tech: ["Python/FastAPI", "Next.js", "FFmpeg", "ComfyUI", "Kokoro", "Claude", "SQLite/Postgres"],
    featured: true,
  },
  {
    id: "mxsentinel",
    status: "new",
    title: "MX Sentinel",
    kind: "Email-infra observability",
    tagline:
      "Datadog for email infrastructure — a 20-service Go mesh correlating SMTP telemetry, DNS auth state, and DMARC reports into AI root-cause diagnostics.",
    description:
      "An email-infrastructure observability and deliverability platform written in Go. It parses Postfix maillogs, continuously validates SPF/DKIM/DMARC/MX, ingests DMARC aggregate reports, and correlates the signals into operational incidents — then uses a local LLM to generate root-cause narratives and remediation steps. Multi-tenant, built for hosting providers and mail operators.",
    tags: ["Go Service Mesh", "Email Security", "AI Diagnostics"],
    stats: [
      { label: "Go Services", value: "20" },
      { label: "REST Endpoints", value: "72" },
      { label: "DNS Findings", value: "19" },
      { label: "Go Source", value: "25k LOC" },
    ],
    bullets: [
      "20-service Go mesh (apid, dnsd, telemetryd, ingestd, dmarcd, correld, incidentd, aid…) over shared internal packages, communicating only via a schema-validated NATS JetStream event bus",
      "DNS validation engine detecting 19 distinct finding codes across SPF/DKIM/DMARC/MX — SPF >10-lookup permerror, include loops, +all, DKIM weak/revoked, DMARC p=none/missing-rua",
      "Deterministic correlation engine that detects per-provider rejection spikes and links them to recent DNS changes to emit a confidence-scored root-cause hypothesis",
      "Local-LLM diagnostics (Ollama/vLLM via an OpenAI-compatible endpoint) writing ai_summary and ai_remediation onto incidents — metadata only, never message bodies",
      "Privacy by construction — telemetry extracts metadata only, HMAC-hashes recipients, never stores bodies, and spools to disk if the bus is down",
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
    title: "dmarcparser",
    kind: "DMARC suite + WHMCS module",
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
    title: "AI CX System",
    kind: "RAG customer-experience layer",
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
    title: "InboxAI",
    kind: "Gmail triage + draft generation",
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
    title: "ListingLaunch",
    kind: "Real-estate marketing kit",
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
    title: "ZoomTranscribe",
    kind: "Transcription + meeting notes",
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
    title: "PlumbingBros AI Quote Builder",
    kind: "Trade quoting tool",
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
    title: "Help2Move",
    kind: "Lead-gen landing + quote form",
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
    title: "Test Tools",
    kind: "3-in-1 utility bundle",
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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8"
      style={{ background: "rgba(21,20,15,0.35)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl my-auto"
        style={{ background: "var(--paper)", border: "1px solid var(--ink-line)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-start justify-between gap-4 p-6 md:p-8"
          style={{ borderBottom: "2px solid var(--ink-line)", background: "var(--paper)" }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: "8px" }}>{project.kind}</div>
            <h2 className="display" style={{ fontSize: "2rem", lineHeight: 1 }}>{project.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2" style={{ color: "var(--ink-2)" }}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: "1px solid var(--rule)" }}>
            {project.stats.map((s) => (
              <div key={s.label} style={{ padding: "14px 0", borderBottom: "1px solid var(--rule)", borderRight: "1px solid var(--rule)", paddingRight: "12px" }}>
                <div className="tabnum" style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.02em", color: "var(--red)" }}>{s.value}</div>
                <div className="mono" style={{ fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-3)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: "15px" }}>{project.description}</p>

          <div>
            <div className="label" style={{ marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)" }}>Technical detail</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-2)" }}>
                  <span className="mono" style={{ color: "var(--red)", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label" style={{ marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)" }}>Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkRow({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="work-row"
      style={{
        display: "grid",
        gridTemplateColumns: "46px minmax(0,1.5fr) minmax(0,2fr) auto",
        gap: "24px",
        alignItems: "baseline",
        textAlign: "left",
        width: "100%",
        background: "transparent",
        border: 0,
        borderTop: "1px solid var(--rule)",
        padding: "24px 0",
        cursor: "pointer",
      }}
    >
      <span className="mono tabnum" style={{ fontSize: "13px", fontWeight: 600, color: "var(--red)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>
        <span style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span className="display" style={{ fontSize: "1.5rem", lineHeight: 1.1 }}>{project.title}</span>
          {project.featured && (
            <span className="mono" style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--red)", border: "1px solid var(--red)", padding: "2px 6px" }}>
              Flagship
            </span>
          )}
        </span>
        <span className="mono" style={{ display: "block", fontSize: "11px", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: "6px" }}>
          {project.kind}
        </span>
      </span>
      <span style={{ fontSize: "14px", lineHeight: 1.5, color: "var(--ink-2)" }}>{project.tagline}</span>
      <span className={`status ${project.status}`} style={{ justifySelf: "end" }}>
        <span className="dot" />
        {project.status === "live" ? "Live" : "New"}
      </span>
    </button>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" style={{ padding: "80px 0" }}>
      <div className="wrap">
        <div className="flex items-baseline justify-between" style={{ marginBottom: "10px" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "14px" }}>Selected Work</div>
            <h2 className="display" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>None of these are demos.</h2>
          </div>
          <span className="mono" style={{ fontSize: "12px", color: "var(--ink-3)", whiteSpace: "nowrap" }}>
            {PROJECTS.length} systems / 2009–2026
          </span>
        </div>

        <p style={{ maxWidth: "52ch", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-2)", marginBottom: "36px" }}>
          Production platforms, client systems, and internal tools — every one shipped, and most still running. Open any row for the full technical detail.
        </p>

        <div style={{ borderBottom: "1px solid var(--rule)" }}>
          {PROJECTS.map((p, i) => (
            <WorkRow key={p.id} project={p} index={i} onClick={() => setActiveProject(p)} />
          ))}
        </div>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}

      <style jsx>{`
        .work-row:hover {
          padding-left: 10px !important;
          padding-right: 10px !important;
          background: var(--paper-2) !important;
        }
        @media (max-width: 760px) {
          .work-row {
            grid-template-columns: 34px 1fr auto !important;
            gap: 8px 14px !important;
          }
          .work-row > :nth-child(3) {
            grid-column: 2 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
