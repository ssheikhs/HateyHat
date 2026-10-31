"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import EventCard from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventCardSkeleton";
import { api } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { confirmAction } from "@/lib/confirm";
import { isPast } from "@/lib/format";

export default function JoinedEvents() {
  const { data: joins, loading, error, reload, setData } = useApi("/joined-events", { auth: true });

  const handleLeave = async (join) => {
    const ok = await confirmAction({
      title: "Leave this event?",
      text: `Your spot at "${join.event.title}" will be released.`,
      confirmText: "Leave event",
      danger: true,
    });
    if (!ok) return;
    try {
      await api(`/events/${join.eventId}/join`, { method: "DELETE", auth: true });
      setData((list) => list.filter((j) => j._id !== join._id));
      toast.success("You've left the event.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <EventGridSkeleton count={3} />;

  if (error) {
    return (
      <div className="rounded-box border border-error/40 p-8 text-center">
        <p className="font-semibold">Your joined events couldn&apos;t load.</p>
        <p className="mt-1 text-base-content/70">{error.message}</p>
        <button type="button" onClick={reload} className="btn btn-primary btn-sm mt-4 rounded-full">Try again</button>
      </div>
    );
  }

  if (!joins?.length) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
        <p className="font-display text-xl font-bold">You haven&apos;t joined any events yet</p>
        <p className="mt-1 text-base-content/70">Find something nearby and press Join Event. It will show up here.</p>
        <Link href="/events" className="btn btn-primary mt-5 rounded-full">Browse upcoming events</Link>
      </div>
    );
  }

  const upcomingCount = joins.filter((j) => !isPast(j.event.eventDate)).length;

  return (
    <>
      <p className="mb-5 text-base-content/70">
        {joins.length} joined · {upcomingCount} still ahead. Sorted by event date, earliest first.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {joins.map((join) => {
          const past = isPast(join.event.eventDate);
          return (
            <div key={join._id} className={past ? "opacity-70" : ""}>
              <EventCard
                event={{ ...join.event, _id: join.eventId }}
                footer={
                  <div className="flex gap-1">
                    <Link href={`/events/${join.eventId}`} className="btn btn-primary btn-sm rounded-full">View</Link>
                    {past ? (
                      <span className="badge badge-ghost self-center">Ended</span>
                    ) : (
                      <button type="button" onClick={() => handleLeave(join)} className="btn btn-ghost btn-sm rounded-full">
                        Leave
                      </button>
                    )}
                  </div>
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
