import type { Metadata } from "next";
import { JetBrains_Mono, Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramil Sususco — AI-native engineer · Ships in days, runs for years",
  description:
    "AI-native engineer, 17 years shipping. I build complete production systems — distributed backends, AI pipelines, and the interfaces on top. Selected work: Seoul.fm, tofuvideo, MX Sentinel.",
  keywords: ["AI engineer", "distributed systems", "Go", "Next.js", "Python", "FFmpeg"],
  authors: [{ name: "Ramil Sususco" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Ramil Sususco — AI-native engineer",
    description: "Ships in days. Runs for years.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
