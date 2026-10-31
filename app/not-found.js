import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <LogoMark className="h-20 w-20" />
      <h1 className="section-title mt-6">This page wandered off</h1>
      <p className="section-lead mx-auto mt-3">
        The link may be broken, or the event was removed. The volunteers are still out there, though.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary rounded-full px-6">Go home</Link>
        <Link href="/events" className="btn btn-outline rounded-full px-6">Browse upcoming events</Link>
      </div>
    </section>
  );
}
