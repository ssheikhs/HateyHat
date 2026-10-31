import Link from "next/link";

// Two linked rings — হাতে হাত, "hand in hand"
export function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="15" cy="20" r="10" fill="none" stroke="var(--color-primary)" strokeWidth="5" />
      <circle cx="25" cy="20" r="10" fill="none" stroke="var(--color-accent)" strokeWidth="5" />
      <path d="M20 11.3a10 10 0 0 1 0 17.4" fill="none" stroke="var(--color-primary)" strokeWidth="5" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="HateyHat home">
      <LogoMark />
      <span className="font-display text-2xl font-bold tracking-tight [font-stretch:105%]">
        HateyHat
      </span>
    </Link>
  );
}
