import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { getSystem, systems } from "@/lib/systems";

export function generateStaticParams() { return systems.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const system = getSystem(slug); return { title: system ? `${system.title} — Ramil Sususco` : "System not found" }; }

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const system = getSystem(slug); if (!system) notFound();
  return <><SiteNav /><main className="shell case-study"><Link href="/systems" className="back-link">← All systems</Link><header className="case-hero"><p className="kicker">{system.eyebrow}</p><h1>{system.title}</h1><p>{system.description}</p>{system.confidential && <small>This is a sanitized demonstration based on production architecture. Confidential client-specific workflows have been removed.</small>}</header><div className="case-layout"><aside className="case-index"><a href="#problem">Problem</a><a href="#approach">Approach</a><a href="#architecture">Architecture</a><a href="#decisions">Key decisions</a><a href="#failures">Failure handling</a></aside><div className="case-body"><section id="problem"><p className="kicker">Problem</p><h2>{system.problem}</h2></section><section><p className="kicker">Constraints</p><ul className="constraint-list">{system.constraints.map(item => <li key={item}>{item}</li>)}</ul></section><section id="approach"><p className="kicker">Approach</p><p>{system.approach}</p></section><section id="architecture"><p className="kicker">Architecture</p><ArchitectureDiagram nodes={system.architecture} /></section><section id="decisions"><p className="kicker">Key decisions</p><div className="decisions">{system.decisions.map((decision, i) => <div key={decision.title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</div></section><section id="failures"><p className="kicker">Failure handling</p><p>{system.failures}</p></section><section><p className="kicker">Result</p><p>{system.result}</p></section><section><p className="kicker">What I’d change next</p><p>{system.next}</p></section></div></div></main><SiteFooter /></>;
}
