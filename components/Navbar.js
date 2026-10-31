"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuMenu, LuPlus, LuSettings2, LuCalendarCheck, LuUserRound, LuLogOut } from "react-icons/lu";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";
import { signOut, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

const userLinks = [
  { href: "/create-event", label: "Create Event", icon: LuPlus },
  { href: "/manage-events", label: "Manage Events", icon: LuSettings2 },
  { href: "/joined-events", label: "Joined Events", icon: LuCalendarCheck },
  { href: "/profile", label: "My Profile", icon: LuUserRound },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const closeDropdown = () => document.activeElement?.blur();

  const handleLogout = async () => {
    closeDropdown();
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "Logout failed. Try again.");
      return;
    }
    clearToken();
    toast.success("Logged out. See you at the next event!");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center gap-2">
        <div className="dropdown md:hidden">
          <button type="button" tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
            <LuMenu className="h-5 w-5" />
          </button>
          <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeDropdown} className={isActive(link.href) ? "menu-active" : ""}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Logo />

        <ul className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 font-medium transition-colors ${
                  isActive(link.href) ? "bg-primary/10 text-primary" : "hover:bg-base-200"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" aria-label="Loading account" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                  <button
                    type="button"
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar ring-2 ring-accent ring-offset-2 ring-offset-base-100"
                    aria-label={`Account menu for ${user.name}`}
                    title={user.name}
                  >
                    <Avatar src={user.image} name={user.name} />
                  </button>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2">
                  <li className="menu-title px-3 py-2">
                    <span className="block truncate text-base font-semibold text-base-content">{user.name}</span>
                    <span className="block truncate text-sm font-normal">{user.email}</span>
                  </li>
                  {userLinks.map(({ href, label, icon: Icon }) => (
                    <li key={href}>
                      <Link href={href} onClick={closeDropdown} className={isActive(href) ? "menu-active" : ""}>
                        <Icon className="h-4 w-4" /> {label}
                      </Link>
                    </li>
                  ))}
                  <li className="sm:hidden">
                    <button type="button" onClick={handleLogout}>
                      <LuLogOut className="h-4 w-4" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
              <button type="button" onClick={handleLogout} className="btn btn-outline btn-primary hidden rounded-full sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary rounded-full px-6">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
