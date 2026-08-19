import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramil Sususco — AI-Native Systems Architect",
  description:
    "I build production systems that run without babysitting: infrastructure, internal platforms, data, automation, and AI.",
  keywords: ["systems architect", "technical operations", "AI systems", "production systems", "FastAPI", "Go"],
  authors: [{ name: "Ramil Sususco" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ramil Sususco — AI-Native Systems Architect",
    description: "I build systems that run without babysitting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
