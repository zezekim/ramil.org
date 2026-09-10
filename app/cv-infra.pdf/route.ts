import { readFile } from "node:fs/promises";
import path from "node:path";
import { after, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE_PATH = path.join(process.cwd(), "assets", "cv-infra.pdf");
const DOWNLOAD_NAME = "Ramil-Sususco-Infrastructure-CV.pdf";

// Swap to "inline" if you would rather the PDF opened in the browser viewer.
const DISPOSITION = "attachment";

const BOT_UA =
  /bot|crawler|spider|crawl|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|slack|twitter|linkedin|embedly|pinterest|headless|lighthouse|uptime|monitor|python-requests|axios|go-http-client|node-fetch/i;

// Browsers and PDF viewers often re-request the same file. Collapse repeats from
// the same visitor so one download means one message. Per-instance and
// best-effort: serverless instances do not share this map.
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;
const recentHits = new Map<string, number>();

function isRepeatVisit(key: string): boolean {
  const now = Date.now();
  for (const [seenKey, seenAt] of recentHits) {
    if (now - seenAt > DEDUPE_WINDOW_MS) recentHits.delete(seenKey);
  }
  const previous = recentHits.get(key);
  recentHits.set(key, now);
  return previous !== undefined && now - previous < DEDUPE_WINDOW_MS;
}

function fileHeaders(size: number): Headers {
  return new Headers({
    "Content-Type": "application/pdf",
    "Content-Length": String(size),
    "Content-Disposition": `${DISPOSITION}; filename="${DOWNLOAD_NAME}"`,
    // Every request must reach this function, otherwise the CDN would serve
    // downloads that never get reported.
    "Cache-Control": "no-store, must-revalidate",
  });
}

async function notifyTelegram(request: NextRequest): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const headers = request.headers;
  const userAgent = headers.get("user-agent") ?? "unknown";
  if (BOT_UA.test(userAgent)) return;

  const ip =
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRepeatVisit(`${ip}|${userAgent}`)) return;

  const city = headers.get("x-vercel-ip-city");
  const country = headers.get("x-vercel-ip-country");
  const location = [city && decodeURIComponent(city), country]
    .filter(Boolean)
    .join(", ");
  const referrer = headers.get("referer") ?? "direct";
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const lines = [
    "CV downloaded: cv-infra.pdf",
    "",
    `Time: ${time} (Manila)`,
    location ? `Location: ${location}` : null,
    `IP: ${ip}`,
    `Referrer: ${referrer}`,
    `Device: ${userAgent.slice(0, 180)}`,
  ].filter((line) => line !== null);

  const apiBase = process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org";

  try {
    // Plain text, no parse_mode: user agent strings would otherwise break
    // Markdown or HTML parsing and the message would be rejected.
    await fetch(`${apiBase}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    // A failed notification must never break the download.
    console.error("Telegram notification failed:", error);
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  const file = await readFile(FILE_PATH);

  after(() => notifyTelegram(request));

  return new Response(new Uint8Array(file), { headers: fileHeaders(file.length) });
}

// Answered without notifying: a HEAD is a metadata check, not a download.
export async function HEAD(): Promise<Response> {
  const file = await readFile(FILE_PATH);
  return new Response(null, { headers: fileHeaders(file.length) });
}
