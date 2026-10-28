import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-28">
      <p className="meta mb-5">404</p>
      <h1 className="display-l mb-6">Page not found</h1>
      <p className="measure mb-9 text-[var(--muted)]">That page does not exist. Start from the deadline checker.</p>
      <Link href="/en/deadline-checker" className="btn">Check my deadline</Link>
    </div>
  );
}
