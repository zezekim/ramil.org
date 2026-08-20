# ramil.org redesign brief

## Information architecture

- `/` — positioning, selected systems, operating model, principles, credibility, technical range, contact.
- `/systems` — an index of systems as case studies.
- `/systems/[slug]` — a consistent case-study format: problem, constraints, approach, architecture, decisions, failure handling, result, and next changes.
- `/about` — working philosophy and AI-assisted development practice.
- `/experience` — concise production-operations foundation and technical range.

## Visual direction

Near-black graphite ground, warm-white type, slate surfaces, and a single restrained blue signal. The layout is a wide product/operations grid with calm, fine borders and mono metadata. Visual interest comes from information hierarchy, system diagrams, and a quiet radial glow—not illustrations or AI imagery.

## Homepage wireframe

```
Nav
Hero: thesis / concise context / two actions / availability
Selected systems: MX Sentinel / Northstar / Video Automation Service (VAS)
How I work: Understand → Model → Build → Operate
Architecture philosophy: practical operating rules
Experience foundation + credibility figures
Technical range: five-column matrix
Contact / footer
```

## Component map

- `SiteNav` / `SiteFooter` — shared navigation and contact surface
- `SystemCard` — system-case-study summary used on home and systems index
- `ArchitectureDiagram` — compact, accessible representation of system flow
- `CaseStudy` — reusable detail-page layout and content sections
- `Process` — four-stage operating model
- `RangeMatrix` — constrained capability groups

## Design tokens

- Background: `#0b0d10`; elevated surface: `#11151a`; border: `#242b33`
- Primary type: `#f1f0eb`; muted type: `#9ba4ae`; signal: `#8ab4f8`
- Sans: Archivo; mono: JetBrains Mono
- Container: 1200px; standard side padding: 24px / 48px desktop
- Radius: 10px; section rhythm: 112px desktop / 72px mobile

## Copy hierarchy

1. “I build systems that run without babysitting.”
2. Production systems across infrastructure, software, automation, data, and AI.
3. Systems described as operational outcomes, then implementation signals.
4. Operating judgment and reliability principles before technical breadth.
5. Infrastructure experience as the foundation for AI-native work.
