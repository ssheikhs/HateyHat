"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import EventCard from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventCardSkeleton";
import { useApi } from "@/lib/useApi";
import { EVENT_TYPES } from "@/lib/format";

export default function EventsBrowser() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const query = new URLSearchParams();
  if (debounced) query.set("search", debounced);
  if (type) query.set("type", type);
  const qs = query.toString();

  const { data: events, loading, error, reload } = useApi(`/events${qs ? `?${qs}` : ""}`);
  const filtered = Boolean(debounced || type);

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label className="input input-lg w-full md:max-w-md">
          <LuSearch className="h-5 w-5 opacity-60" aria-hidden="true" />
          <input
            type="search"
            className="grow"
            placeholder="Search by title or area, e.g. Mirpur"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search events"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by event type">
          <button type="button" onClick={() => setType("")} className={`btn btn-sm rounded-full ${type === "" ? "btn-primary" : "btn-ghost border-base-300"}`}>
            All
          </button>
          {EVENT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(type === t ? "" : t)}
              aria-pressed={type === t}
              className={`btn btn-sm rounded-full ${type === t ? "btn-primary" : "btn-ghost border-base-300"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <div className="rounded-box border border-error/40 p-8 text-center">
            <p className="font-semibold">Events couldn&apos;t load.</p>
            <p className="mt-1 text-base-content/70">{error.message}</p>
            <button type="button" onClick={reload} className="btn btn-primary btn-sm mt-4 rounded-full">
              Try again
            </button>
          </div>
        ) : events?.length ? (
          <>
            <p className="mb-5 text-base-content/70">
              {events.length} upcoming {events.length === 1 ? "event" : "events"}
              {filtered ? " match your search" : ""}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        ) : filtered ? (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="font-display text-xl font-bold">No events match that search</p>
            <p className="mt-1 text-base-content/70">Try another area or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setType("");
              }}
              className="btn btn-outline btn-sm mt-5 rounded-full"
            >
              <LuX className="h-4 w-4" /> Clear filters
            </button>
          </div>
        ) : (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="font-display text-xl font-bold">No upcoming events yet</p>
            <p className="mt-1 text-base-content/70">Be the one who gets things started in your area.</p>
            <Link href="/create-event" className="btn btn-primary mt-5 rounded-full">
              Create an event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
