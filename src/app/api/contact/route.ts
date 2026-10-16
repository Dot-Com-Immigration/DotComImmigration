import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/site.config";

export const runtime = "nodejs";

const MAX_TOTAL = 8 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

const Schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(60).optional().default(""),
  language: z.string().max(60).optional().default(""),
  who: z.string().max(120).optional().default(""),
  matter: z.string().min(1).max(200),
  docDate: z.string().max(40).optional().default(""),
  province: z.string().max(80).optional().default(""),
  representative: z.string().max(80).optional().default(""),
  message: z.string().max(5000).optional().default(""),
  locale: z.string().max(5).optional().default("en"),
  consent: z.string().optional(),
  company: z.string().max(200).optional().default(""),
});

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const win = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 6;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    }

    const form = await req.formData();
    const raw = Object.fromEntries(
      Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
    ) as Record<string, string>;

    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Some required fields are missing." }, { status: 400 });
    }
    const data = parsed.data;

    // Honeypot: a real person never fills this.
    if (data.company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }
    if (!data.consent) {
      return NextResponse.json({ error: "Consent is required." }, { status: 400 });
    }

    const files = form.getAll("file").filter((f): f is File => f instanceof File && f.size > 0);
    let total = 0;
    const attachments: { filename: string; content: string }[] = [];
    for (const f of files) {
      total += f.size;
      if (total > MAX_TOTAL) {
        return NextResponse.json({ error: "Attachments exceed 8 MB in total." }, { status: 413 });
      }
      if (f.type && !ALLOWED.includes(f.type)) {
        return NextResponse.json({ error: "Only PDF, JPG, PNG or WebP files are accepted." }, { status: 415 });
      }
      const buf = Buffer.from(await f.arrayBuffer());
      attachments.push({ filename: f.name.replace(/[^\w.\-]/g, "_").slice(0, 120), content: buf.toString("base64") });
    }

    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    const rows: [string, string][] = [
      ["Name", data.name], ["Email", data.email], ["Phone", data.phone],
      ["Language", data.language], ["About", data.who], ["Matter", data.matter],
      ["Date on document", data.docDate], ["Province", data.province],
      ["Existing representative", data.representative], ["Site language", data.locale],
      ["Attachments", String(attachments.length)],
    ];

    if (!key || !to || !from) {
      console.error("[contact] Resend is not configured. Enquiry received but not delivered:", rows);
      return NextResponse.json(
        { error: "The contact form is not connected yet. Please use the phone number or WhatsApp." },
        { status: 503 },
      );
    }

    const html = `
      <h2 style="font-family:Georgia,serif">New enquiry via ${esc(site.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="border:1px solid #ddd"><b>${esc(k)}</b></td><td style="border:1px solid #ddd">${esc(v || "—")}</td></tr>`).join("")}
      </table>
      ${data.message ? `<h3 style="font-family:system-ui">Message</h3><p style="white-space:pre-wrap;font-family:system-ui;font-size:14px">${esc(data.message)}</p>` : ""}
    `;

    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from, to: [to], replyTo: data.email,
      subject: `[${data.matter.slice(0, 60)}] ${data.name}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
