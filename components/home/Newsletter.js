"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LogoMark } from "@/components/Logo";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      toast.error("Enter a valid email address to subscribe.");
      return;
    }
    toast.success("Subscribed. Look out for Friday's event roundup.");
    setEmail("");
  };

  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-box bg-primary px-6 py-12 text-primary-content md:px-14 md:py-16">
        <LogoMark className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-20" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="section-title !text-primary-content">A short roundup, every Friday</h2>
            <p className="mt-3 max-w-[48ch] text-primary-content/85">
              New events near you, a reminder for the ones you joined, and nothing else. Unsubscribe whenever you like.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input input-lg w-full border-0 bg-base-100 text-base-content"
            />
            <button type="submit" className="btn btn-accent btn-lg rounded-full px-8">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
