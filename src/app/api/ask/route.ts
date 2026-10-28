import { NextResponse } from "next/server";
import { z } from "zod";
import { SYSTEM_PROMPT, UNAVAILABLE } from "@/lib/assistant";

export const runtime = "nodejs";

const Schema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().min(1).max(4000),
  })).min(1).max(12),
  locale: z.enum(["en", "fr"]).optional().default("en"),
});

/** Per-IP throttle. In-memory, so it resets on a cold start; that is fine for
 *  an abuse brake on a practice site and avoids standing up a store. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 12;
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  const parsed = Schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { messages, locale } = parsed.data;

  // No key configured: say so honestly and route the person to a human. Never
  // fake an answer, and never leave someone with a running deadline guessing.
  if (!key) {
    return NextResponse.json({ reply: UNAVAILABLE[locale], configured: false });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ reply: UNAVAILABLE[locale], configured: false });
    }

    const data = await res.json();
    const reply = (data?.content ?? [])
      .filter((b: { type?: string }) => b?.type === "text")
      .map((b: { text?: string }) => b.text ?? "")
      .join("")
      .trim();

    return NextResponse.json({ reply: reply || UNAVAILABLE[locale], configured: Boolean(reply) });
  } catch {
    return NextResponse.json({ reply: UNAVAILABLE[locale], configured: false });
  }
}
