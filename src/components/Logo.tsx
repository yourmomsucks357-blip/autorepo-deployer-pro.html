import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 text-lg font-extrabold tracking-tight"
      aria-label="OfferOnly home"
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-md bg-brand-600 text-white shadow-sm`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18l3-9h8l3 9" />
          <path d="M4 18h16" />
          <path d="M9 13h6" />
        </svg>
      </span>
      <span className={light ? "text-white" : "text-ink"}>
        Offer<span className="text-brand-600">Only</span>
      </span>
    </Link>
  );
}
