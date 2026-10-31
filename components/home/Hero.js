/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useApi } from "@/lib/useApi";
import { dateParts } from "@/lib/format";

function NextUpTicket() {
  const { data, loading } = useApi("/events/featured");
  const next = data?.[0];

  if (loading) {
    return <div className="skeleton h-28 w-full max-w-sm" aria-label="Loading next event" />;
  }

  if (!next) {
    return (
      <div className="ticket w-full max-w-sm p-5">
        <p className="font-display text-lg font-bold">No events on the calendar yet</p>
        <p className="mt-1 text-base-content/70">Post the first one and your neighbours will see it here.</p>
      </div>
    );
  }

  const { day, month, weekday, time } = dateParts(next.eventDate);
  return (
    <Link
      href={`/events/${next._id}`}
      className="ticket flex w-full max-w-sm items-stretch overflow-hidden shadow-xl shadow-primary/10 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-accent text-accent-content">
        <span className="date-stub-day text-5xl">{day}</span>
        <span className="font-semibold">{month}</span>
      </div>
      <div className="min-w-0 border-l-2 border-dashed border-base-300 p-4">
        <p className="text-sm text-base-content/65">Next up · {weekday}, {time}</p>
        <p className="mt-1 line-clamp-2 font-display text-lg font-bold leading-snug">{next.title}</p>
        <p className="mt-1 truncate text-sm text-base-content/70">{next.location}</p>
      </div>
    </Link>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-200">
      <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-primary">হাতে হাত · hand in hand</p>
          <h1 className="mt-4 text-[clamp(2.6rem,1.6rem+4.2vw,4.75rem)] font-extrabold [font-variation-settings:'wdth'_78]">
            Your neighbourhood needs a few more hands this weekend.
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg text-base-content/75">
            Cleanups in Mirpur, blankets for Mohammadpur, saplings along the Buriganga. Find a social service event
            near you, save your spot, or organize one of your own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg rounded-full px-8">
              Find an event
            </Link>
            <Link href="/create-event" className="btn btn-outline btn-lg rounded-full px-8">
              Organize one
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-5 grid-rows-6 gap-3 h-[26rem] sm:h-[30rem]">
            <img
              src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=900&q=75"
              alt="Volunteers in blue shirts packing food into bags"
              className="col-span-3 row-span-6 h-full w-full rounded-box object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1598335624134-5bceb5de202d?auto=format&fit=crop&w=600&q=75"
              alt="A woman and a child planting a small tree"
              className="col-span-2 row-span-3 h-full w-full rounded-box object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1758599668429-121d54188b9c?auto=format&fit=crop&w=600&q=75"
              alt="Volunteers cleaning a park with trash bags"
              className="col-span-2 row-span-3 h-full w-full rounded-box object-cover"
            />
          </div>
          <div className="relative -mt-14 px-4 sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:px-0">
            <NextUpTicket />
          </div>
        </div>
      </div>
    </section>
  );
}
