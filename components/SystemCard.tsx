import Link from "next/link";
import ArchitectureDiagram from "./ArchitectureDiagram";

export type System = { slug: string; number: string; title: string; eyebrow: string; description: string; summary: string; tags: string[]; nodes: string[]; confidential?: boolean };

export default function SystemCard({ system }: { system: System }) {
  return <article className="system-card">
    <div className="system-topline"><span>{system.number}</span><span>{system.confidential ? "Sanitized production architecture" : "Selected system"}</span></div>
    <div className="system-content"><div><p className="kicker">{system.eyebrow}</p><h3>{system.title}</h3><p className="system-description">{system.description}</p></div><p className="system-summary">{system.summary}</p></div>
    <ArchitectureDiagram nodes={system.nodes} />
    <div className="system-bottom"><div className="tags">{system.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link href={`/systems/${system.slug}`} className="text-link">Read case study <span aria-hidden="true">→</span></Link></div>
  </article>;
}
