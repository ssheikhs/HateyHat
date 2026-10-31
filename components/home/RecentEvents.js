"use client";

import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventCardSkeleton";
import { useApi } from "@/lib/useApi";

function Impact() {
  const { data } = useApi("/stats");
  if (!data) return null;
  const items = [
    [data.upcomingEvents, data.upcomingEvents === 1 ? "event coming up" : "events coming up"],
    [data.totalVolunteers, data.totalVolunteers === 1 ? "volunteer sign-up" : "volunteer sign-ups"],
    [data.organizers, data.organizers === 1 ? "organizer" : "organizers"],
  ];
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-2">
      {items.map(([value, label]) => (
        <div key={label} className="flex items-baseline gap-2">
          <dt className="sr-only">{label}</dt>
          <dd className="font-display text-3xl font-extrabold text-primary">{value}</dd>
          <span className="text-base-content/70">{label}</span>
        </div>
      ))}
    </dl>
  );
}

export default function RecentEvents() {
  const { data: events, loading, error, reload } = useApi("/events/featured");

  return (
    <section className="bg-base-200 py-20 [--page-bg:var(--color-base-200)]">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Happening soon</h2>
            <p className="section-lead mt-3">The six closest events on the calendar. Pick one and bring a friend.</p>
          </div>
          <Impact />
        </div>

        <div className="mt-10">
          {loading ? (
            <EventGridSkeleton count={6} />
          ) : error ? (
            <div className="rounded-box border border-error/40 bg-base-100 p-8 text-center">
              <p className="font-semibold">Events couldn&apos;t load.</p>
              <p className="mt-1 text-base-content/70">{error.message}</p>
              <button type="button" onClick={reload} className="btn btn-primary btn-sm mt-4 rounded-full">
                Try again
              </button>
            </div>
          ) : events?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-box border border-dashed border-base-300 bg-base-100 p-10 text-center">
              <p className="font-display text-xl font-bold">The calendar is empty</p>
              <p className="mt-1 text-base-content/70">Organize the first event and it will show up here.</p>
              <Link href="/create-event" className="btn btn-primary mt-5 rounded-full">
                Create an event
              </Link>
            </div>
          )}
        </div>

        {events?.length > 0 && (
          <div className="mt-10 text-center">
            <Link href="/events" className="btn btn-outline btn-primary rounded-full px-8">
              See all upcoming events
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
