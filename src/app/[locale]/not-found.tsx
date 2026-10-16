import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)]">Page not found</h1>
      <p className="mb-7 text-muted">That page does not exist. Start from the deadline checker.</p>
      <Link href="/en/deadline-checker" className="inline-flex rounded-sm bg-gradient-to-br from-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-[#2A1D05]">
        Check my deadline
      </Link>
    </div>
  );
}
