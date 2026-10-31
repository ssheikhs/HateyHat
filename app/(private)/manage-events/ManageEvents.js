/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { LuEye, LuPencil, LuTrash2, LuUsers } from "react-icons/lu";
import { FALLBACK_IMAGE } from "@/components/events/EventCard";
import { api } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { confirmAction } from "@/lib/confirm";
import { formatDate, isPast } from "@/lib/format";

function RowSkeleton() {
  return (
    <li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center" aria-hidden="true">
      <div className="skeleton h-20 w-full sm:w-32" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
      </div>
      <div className="skeleton h-9 w-48 rounded-full" />
    </li>
  );
}

export default function ManageEvents() {
  const { data: events, loading, error, reload, setData } = useApi("/events/mine", { auth: true });
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (event) => {
    const ok = await confirmAction({
      title: `Delete "${event.title}"?`,
      text:
        event.participantsCount > 0
          ? `${event.participantsCount} ${event.participantsCount === 1 ? "volunteer has" : "volunteers have"} joined. They will lose their spot. This can't be undone.`
          : "This can't be undone.",
      confirmText: "Delete event",
      danger: true,
    });
    if (!ok) return;
    setDeleting(event._id);
    try {
      await api(`/events/${event._id}`, { method: "DELETE", auth: true });
      setData((list) => list.filter((e) => e._id !== event._id));
      toast.success("Event deleted.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <ul className="divide-y divide-base-300 rounded-box border border-base-300" role="status" aria-label="Loading your events">
        {[1, 2, 3].map((i) => (
          <RowSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="rounded-box border border-error/40 p-8 text-center">
        <p className="font-semibold">Your events couldn&apos;t load.</p>
        <p className="mt-1 text-base-content/70">{error.message}</p>
        <button type="button" onClick={reload} className="btn btn-primary btn-sm mt-4 rounded-full">Try again</button>
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
        <p className="font-display text-xl font-bold">You haven&apos;t organized an event yet</p>
        <p className="mt-1 text-base-content/70">Events you create will appear here, ready to edit or delete.</p>
        <Link href="/create-event" className="btn btn-primary mt-5 rounded-full">Create your first event</Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-base-content/70">
        You organize {events.length} {events.length === 1 ? "event" : "events"}.
      </p>
      <ul className="divide-y divide-base-300 rounded-box border border-base-300">
        {events.map((event) => {
          const past = isPast(event.eventDate);
          return (
            <li key={event._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <img
                src={event.thumbnail}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="aspect-[16/10] w-full rounded-field object-cover sm:h-20 sm:w-32"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-accent badge-sm border-0">{event.eventType}</span>
                  <span className={`badge badge-sm ${past ? "badge-ghost" : "badge-success"}`}>{past ? "Ended" : "Upcoming"}</span>
                </div>
                <p className="mt-1 truncate text-lg font-bold">{event.title}</p>
                <p className="truncate text-sm text-base-content/70">
                  {formatDate(event.eventDate)} · {event.location}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-base-content/65">
                  <LuUsers className="h-4 w-4" /> {event.participantsCount || 0} joined
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link href={`/events/${event._id}`} className="btn btn-ghost btn-sm rounded-full" aria-label={`View ${event.title}`}>
                  <LuEye className="h-4 w-4" /> View
                </Link>
                <Link href={`/manage-events/${event._id}/edit`} className="btn btn-outline btn-primary btn-sm rounded-full">
                  <LuPencil className="h-4 w-4" /> Update
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(event)}
                  disabled={deleting === event._id}
                  className="btn btn-outline btn-error btn-sm rounded-full"
                >
                  {deleting === event._id ? <span className="loading loading-spinner loading-xs" /> : <LuTrash2 className="h-4 w-4" />}
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
