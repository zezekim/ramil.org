import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramil Sususco — AI-native developer",
  description:
    "I build systems that run themselves. AI-native developer shipping production features in hours, not months. 17 years of building autonomous systems.",
  keywords: ["AI developer", "autonomous systems", "Next.js", "React", "Python"],
  authors: [{ name: "Ramil Sususco" }],
  openGraph: {
    title: "Ramil Sususco — AI-native developer",
    description: "I build systems that run themselves.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="scanlines">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
