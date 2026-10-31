import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { LogoMark } from "./Logo";

const socials = [
  { href: "https://www.facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://www.instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[#1c1957] text-[#eceaf8]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="HateyHat home">
            <span className="rounded-full bg-[#eceaf8] p-1">
              <LogoMark className="h-9 w-9" />
            </span>
            <span className="font-display text-2xl font-bold [font-stretch:105%]">HateyHat</span>
          </Link>
          <p className="mt-4 max-w-xs text-[#eceaf8]/75">
            হাতে হাত — hand in hand. A meeting place for neighbours who want to clean up, plant, donate and look out for each other.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eceaf8]/25 transition-colors hover:bg-[#f2a516] hover:text-[#2a1a00]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Explore</h3>
          <ul className="mt-4 space-y-2 text-[#eceaf8]/80">
            <li><Link href="/events" className="hover:text-[#f6b93b]">Upcoming events</Link></li>
            <li><Link href="/create-event" className="hover:text-[#f6b93b]">Organize an event</Link></li>
            <li><Link href="/joined-events" className="hover:text-[#f6b93b]">My joined events</Link></li>
            <li><Link href="/register" className="hover:text-[#f6b93b]">Become a volunteer</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Causes</h3>
          <ul className="mt-4 space-y-2 text-[#eceaf8]/80">
            <li>Neighbourhood cleanups</li>
            <li>Tree plantation</li>
            <li>Winter clothes drives</li>
            <li>Blood donation camps</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-[#eceaf8]/80">
            <li className="flex gap-3"><LuMapPin className="mt-1 h-4 w-4 shrink-0" /> House 12, Road 7, Mirpur 10, Dhaka 1216</li>
            <li className="flex gap-3"><LuPhone className="mt-1 h-4 w-4 shrink-0" /> +880 1700-000000</li>
            <li className="flex gap-3"><LuMail className="mt-1 h-4 w-4 shrink-0" /> hello@hateyhat.org</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#eceaf8]/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-[#eceaf8]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} HateyHat. Built for the communities of Bangladesh.</p>
          <p>Every event is organized by volunteers like you.</p>
        </div>
      </div>
    </footer>
  );
}
