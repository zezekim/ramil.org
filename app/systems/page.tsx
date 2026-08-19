import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SystemCard from "@/components/SystemCard";
import { systems } from "@/lib/systems";

export const metadata = { title: "Systems — Ramil Sususco", description: "Selected production systems and sanitized architecture case studies." };

export default function SystemsPage() { return <><SiteNav /><main className="shell page"><p className="kicker">Selected systems</p><h1>Architecture with an operational point of view.</h1><p className="page-lede">These are systems designed to make complex work legible, resilient, and easier to operate. The public examples preserve useful engineering context without exposing confidential workflows.</p><div className="systems-list">{systems.map(system => <SystemCard system={system} key={system.slug} />)}</div></main><SiteFooter /></>; }
