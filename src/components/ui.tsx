import Link from "next/link";
import { cn } from "@/lib/utils";

export function Section({
  children, className, tint, id, flush,
}: { children: React.ReactNode; className?: string; tint?: boolean; id?: string; flush?: boolean }) {
  return (
    <section id={id} className={cn(!flush && "py-16 sm:py-24 lg:py-32", tint && "bg-[var(--surface)]", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Meta({ children, dim, className }: { children: React.ReactNode; dim?: boolean; className?: string }) {
  return <p className={cn("meta mb-4", dim && "meta-dim", className)}>{children}</p>;
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("display-m", className)}>{children}</h2>;
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("measure text-[1.02rem] leading-relaxed text-[var(--fg-dim)]", className)}>{children}</p>;
}

export function Cta({
  href, children, ghost, className, external,
}: { href: string; children: React.ReactNode; ghost?: boolean; className?: string; external?: boolean }) {
  const cls = cn("btn", ghost && "btn-ghost", className);
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

/** Standalone answer block. The thing answer engines quote. */
export function Tldr({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[var(--accent)] pl-5">
      <p className="meta mb-2">{label}</p>
      <p className="measure text-[1rem] leading-relaxed">{children}</p>
    </div>
  );
}

export function SourceList({ label, sources }: { label: string; sources: { label: string; url: string }[] }) {
  if (!sources.length) return null;
  return (
    <div className="hair-t mt-12 pt-7">
      <p className="meta meta-dim mb-3">{label}</p>
      <ul className="grid gap-2">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer"
              className="text-[0.86rem] text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:underline">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A numbered or labelled row in a hairline list. Replaces the card grid. */
export function Row({
  index, title, body, meta, href, alarm,
}: { index?: string; title: string; body?: string; meta?: string; href?: string; alarm?: string }) {
  const inner = (
    <div className="group flex items-start gap-5 py-6 transition-colors hover:bg-[var(--surface)]">
      {index && <span className="mt-1 shrink-0 font-mono text-[0.7rem] tabular-nums text-[var(--muted)]">{index}</span>}
      <div className="min-w-0 flex-1">
        {meta && <p className="meta mb-2">{meta}</p>}
        <h3 className="display-s mb-2">{title}</h3>
        {body && <p className="measure text-[0.93rem] leading-relaxed text-[var(--muted)]">{body}</p>}
        {alarm && <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-wider text-[var(--alarm)]">{alarm}</p>}
      </div>
      {href && <span className="mt-1 shrink-0 accent-type opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>}
    </div>
  );
  return href ? <Link href={href} className="hair-b block">{inner}</Link> : <div className="hair-b">{inner}</div>;
}
