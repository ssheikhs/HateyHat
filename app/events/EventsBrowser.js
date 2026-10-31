"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LuArrowDownUp, LuLayoutGrid, LuSearch, LuX } from "react-icons/lu";
import EventCard from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventCardSkeleton";
import { useApi } from "@/lib/useApi";
import { EVENT_TYPES } from "@/lib/format";

export default function EventsBrowser() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("soonest");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const query = new URLSearchParams();
  if (debounced) query.set("search", debounced);
  if (type) query.set("type", type);
  const qs = query.toString();

  const { data, loading, error, reload } = useApi(`/events${qs ? `?${qs}` : ""}`);
  const events = useMemo(() => {
    if (!data) return data;
    return sort === "soonest" ? data : [...data].reverse();
  }, [data, sort]);

  const filtered = Boolean(debounced || type);
  const clearAll = () => {
    setSearch("");
    setDebounced("");
    setType("");
  };

  return (
    <div className="container-page py-8">
      {/* One toolbar: every control shares the same height and baseline */}
      <div className="sticky top-16 z-30 -mx-1 rounded-box border border-base-300 bg-base-100/95 p-2 shadow-[0_8px_30px_-12px_rgb(27_25_56/0.18)] backdrop-blur">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="input h-12 w-full border-0 bg-base-200 md:flex-1">
            <LuSearch className="h-5 w-5 opacity-60" aria-hidden="true" />
            <input
              type="search"
              className="grow"
              placeholder="Search by event or area — Mirpur, Mohammadpur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events by title or location"
            />
          </label>

          <div className="grid grid-cols-2 gap-2 md:flex">
            <label className="select h-12 w-full border-0 bg-base-200 md:w-52">
              <LuLayoutGrid className="h-4 w-4 opacity-60" aria-hidden="true" />
              <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by event type">
                <option value="">All event types</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="select h-12 w-full border-0 bg-base-200 md:w-48">
              <LuArrowDownUp className="h-4 w-4 opacity-60" aria-hidden="true" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort events">
                <option value="soonest">Soonest first</option>
                <option value="latest">Furthest first</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-8 flex-wrap items-center gap-2 text-base-content/70">
        {!loading && !error && events && (
          <p>
            <span className="font-semibold text-base-content">{events.length}</span> upcoming{" "}
            {events.length === 1 ? "event" : "events"}
          </p>
        )}
        {debounced && (
          <button type="button" onClick={() => setSearch("")} className="badge badge-lg gap-1 border-base-300 bg-base-200">
            “{debounced}” <LuX className="h-3.5 w-3.5" aria-label="Remove search" />
          </button>
        )}
        {type && (
          <button type="button" onClick={() => setType("")} className="badge badge-lg gap-1 border-0 bg-accent/20 text-base-content">
            {type} <LuX className="h-3.5 w-3.5" aria-label="Remove type filter" />
          </button>
        )}
        {filtered && (
          <button type="button" onClick={clearAll} className="btn btn-ghost btn-xs rounded-full">
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : filtered ? (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="font-display text-xl font-bold">No upcoming events match</p>
            <p className="mt-1 text-base-content/70">
              Nothing found{debounced ? ` for “${debounced}”` : ""}
              {type ? ` in ${type}` : ""}. Try another area or remove a filter.
            </p>
            <button type="button" onClick={clearAll} className="btn btn-outline btn-sm mt-5 rounded-full">
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
