"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <section className="container-page py-24 text-center">
      <h1 className="section-title">Something broke on this page</h1>
      <p className="section-lead mx-auto mt-3">Try loading it again. If it keeps happening, head back home.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary rounded-full px-6">Try again</button>
        <Link href="/" className="btn btn-outline rounded-full px-6">Go home</Link>
      </div>
    </section>
  );
}
