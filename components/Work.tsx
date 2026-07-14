"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Project = {
  id: string;
  status: "live" | "new";
  title: string;
  kind: string;
  blurb: string;
  description: string;
  stats: { label: string; value: string }[];
  bullets: string[];
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    id: "seoulfm",
    status: "live",
    title: "Seoul.fm",
    kind: "K-pop streaming platform",
    blurb: "A K-pop radio station rebuilt into a full streaming platform — 17 years live.",
    description:
      "A long-running K-pop internet radio station rebuilt into a full streaming platform: a Next.js web player on Cloudflare, a Flutter Android app, a self-hosted FFmpeg/CMAF encoder pipeline, a dual REST/SSE API, an edge HLS proxy, and a production chat service with AI-driven mood analysis. Listeners request and dedicate songs, follow now-playing over SSE, and sing along in a pitch-scored karaoke mode.",
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
  },
  {
    id: "tofuvideo",
    status: "new",
    title: "tofuvideo",
    kind: "AI video production platform",
    blurb: "Type a topic, get a finished video — scripted, voiced, captioned and assembled.",
    description:
      "An AI video production platform. From a single topic (or a pasted script) it writes the script and scene breakdown, generates or sources each scene's visual, records a voiceover, times captions, produces avatar intro/outro, and assembles the final MP4 with FFmpeg. Every stage is a local-first provider chain that degrades gracefully, so the whole pipeline runs offline on free/local models — paid APIs (Claude, ElevenLabs, Replicate, HeyGen) are optional upgrades, not requirements.",
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
  },
  {
    id: "mxsentinel",
    status: "new",
    title: "MX Sentinel",
    kind: "Email-infra observability",
    blurb: "Datadog for email infrastructure — a 20-service Go mesh with AI diagnostics.",
    description:
      "An email-infrastructure observability and deliverability platform written in Go. It parses Postfix maillogs, continuously validates SPF/DKIM/DMARC/MX, ingests DMARC aggregate reports, and correlates the signals into operational incidents — then uses a local LLM to generate root-cause narratives and remediation steps. Multi-tenant, built for hosting providers and mail operators.",
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
    blurb: "Raw DMARC reports turned into a live, multi-tenant deliverability dashboard.",
    description:
      "A DMARC reporting suite. A parser service ingests aggregate XML reports (with an IMAP poller) and exposes a REST API with per-domain health and readiness scoring; a Go + Postgres web viewer renders reports and analytics; and 'Email Captain' — a WHMCS addon — turns it into a per-customer DMARC dashboard.",
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
    blurb: "A luxury retailer's entire customer-experience layer, grounded in RAG.",
    description:
      "An AI customer-experience system for a luxury retail brand. A ~130-chunk knowledge base — operations, sales guidance, CX writing rules, and emotional-intelligence reply standards — is embedded into a Supabase vector store and retrieved by an n8n RAG pipeline to draft replies in the brand's exact voice.",
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

function WorkRow({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button onClick={onClick} className="work-row">
      <span className="work-main">
        <span className="work-head">
          <span className="display work-title">{project.title}</span>
          <span className={`status ${project.status}`}>
            <span className="dot" />
            {project.status === "live" ? "Live" : "New"}
          </span>
        </span>
        <span className="work-blurb">{project.blurb}</span>
      </span>
      <span aria-hidden className="work-arrow">→</span>
    </button>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" style={{ padding: "clamp(84px, 12vw, 140px) 0" }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: "18px" }}>Selected Work</div>
        <h2 className="display" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: "20px" }}>
          None of these are demos.
        </h2>
        <p style={{ maxWidth: "48ch", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-2)", marginBottom: "clamp(32px, 5vw, 56px)" }}>
          A selection — each one shipped and running. Open any for the full technical detail.
        </p>

        <div style={{ borderBottom: "1px solid var(--rule)" }}>
          {PROJECTS.map((p) => (
            <WorkRow key={p.id} project={p} onClick={() => setActiveProject(p)} />
          ))}
        </div>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
}
