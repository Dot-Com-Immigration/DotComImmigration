import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  children, className, dark, tint, id,
}: { children: React.ReactNode; className?: string; dark?: boolean; tint?: boolean; id?: string }) {
  return (
    <section id={id} className={cn("py-14 sm:py-20 lg:py-24", dark && "bg-navy-950 text-cream", tint && "bg-sand", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-600", className)}>{children}</p>;
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.14]", className)}>{children}</h2>;
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("max-w-[62ch] text-[clamp(1rem,1.6vw,1.12rem)] text-muted", className)}>{children}</p>;
}

export function Cta({
  href, children, variant = "gold", className,
}: { href: string; children: React.ReactNode; variant?: "gold" | "navy" | "ghost"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5";
  const styles = {
    gold: "bg-gradient-to-br from-gold-400 to-gold-500 text-[#2A1D05] shadow-[0_6px_18px_-8px_rgba(195,149,60,0.8)]",
    navy: "bg-navy-800 text-cream",
    ghost: "border border-cream/30 text-cream hover:border-gold-400 hover:text-gold-400",
  };
  return <Link href={href} className={cn(base, styles[variant], className)}>{children}</Link>;
}

export function Tldr({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border-l-[3px] border-gold-500 bg-sand p-5">
      <p className="mb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-gold-600">{label}</p>
      <p className="text-[0.97rem] leading-relaxed">{children}</p>
    </div>
  );
}

export function SourceList({ label, sources }: { label: string; sources: { label: string; url: string }[] }) {
  if (!sources.length) return null;
  return (
    <div className="mt-10 border-t border-line pt-6">
      <p className="mb-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-gold-600">{label}</p>
      <ul className="grid gap-1.5">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-[0.85rem] text-muted underline-offset-4 hover:text-fg hover:underline">
              <ArrowRight className="mt-1 h-3 w-3 shrink-0 text-gold-600" aria-hidden /> {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
