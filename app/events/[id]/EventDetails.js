/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuArrowLeft, LuCalendarDays, LuClock, LuMapPin, LuPencil, LuTag, LuUsers } from "react-icons/lu";
import Avatar from "@/components/Avatar";
import { FALLBACK_IMAGE } from "@/components/events/EventCard";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { confirmAction } from "@/lib/confirm";
import { dateParts, daysUntil, formatDate, isPast } from "@/lib/format";

function DetailsSkeleton() {
  return (
    <div className="container-page py-10" role="status" aria-label="Loading event">
      <div className="skeleton aspect-[21/9] w-full" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <div className="skeleton h-10 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
        <div className="skeleton h-80 w-full" />
      </div>
    </div>
  );
}

function Participants({ eventId }) {
  const { data, loading } = useApi(`/events/${eventId}/participants`, { auth: true });
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Who&apos;s coming</h2>
      {loading ? (
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-12 w-full" />
          ))}
        </div>
      ) : data?.length ? (
        <ul className="mt-4 divide-y divide-base-300 rounded-box border border-base-300">
          {data.map((p) => (
            <li key={p._id} className="flex items-center gap-3 p-3">
              <Avatar src={p.userImage} name={p.userName} size="h-9 w-9" />
              <div className="min-w-0">
                <p className="truncate font-medium">{p.userName || p.userEmail}</p>
                <p className="truncate text-sm text-base-content/65">{p.userEmail}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-base-content/70">Nobody has joined yet. Share the link with your friends.</p>
      )}
    </div>
  );
}

export default function EventDetails({ id }) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const { data: event, loading, error, setData } = useApi(`/events/${id}`);
  const [joined, setJoined] = useState(null);
  const [busy, setBusy] = useState(false);

  const user = session?.user;
  const isOwner = Boolean(user && event && user.email === event.creatorEmail);

  useEffect(() => {
    if (!user || !event || isOwner) {
      setJoined(false);
      return;
    }
    let active = true;
    api(`/events/${id}/join-status`, { auth: true })
      .then((res) => active && setJoined(res.joined))
      .catch(() => active && setJoined(false));
    return () => {
      active = false;
    };
  }, [user, event, isOwner, id]);

  if (loading) return <DetailsSkeleton />;

  if (error || !event) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="section-title">{error?.status === 404 || error?.status === 400 ? "This event doesn't exist" : "Event couldn't load"}</h1>
        <p className="section-lead mx-auto mt-3">
          {error?.status === 404 || error?.status === 400 ? "It may have been removed by its organizer." : error?.message}
        </p>
        <Link href="/events" className="btn btn-primary mt-8 rounded-full">
          Browse upcoming events
        </Link>
      </div>
    );
  }

  const past = isPast(event.eventDate);
  const { day, month } = dateParts(event.eventDate);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Log in to join this event.");
      router.push(`/login?redirect=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "POST", auth: true });
      setJoined(true);
      setData((e) => ({ ...e, participantsCount: (e.participantsCount || 0) + 1 }));
      toast.success("You're in! It's now on your Joined Events page.");
    } catch (err) {
      if (err.status === 409) setJoined(true);
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleLeave = async () => {
    const ok = await confirmAction({
      title: "Leave this event?",
      text: "Your spot will be released for someone else.",
      confirmText: "Leave event",
      danger: true,
    });
    if (!ok) return;
    setBusy(true);
    try {
      await api(`/events/${id}/join`, { method: "DELETE", auth: true });
      setJoined(false);
      setData((e) => ({ ...e, participantsCount: Math.max(0, (e.participantsCount || 1) - 1) }));
      toast.success("You've left the event.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  let action;
  if (past) {
    action = <button type="button" className="btn btn-disabled w-full rounded-full" disabled>This event has ended</button>;
  } else if (isOwner) {
    action = (
      <Link href={`/manage-events/${id}/edit`} className="btn btn-outline btn-primary w-full rounded-full">
        <LuPencil className="h-4 w-4" /> Edit your event
      </Link>
    );
  } else if (user && joined === null) {
    action = <div className="skeleton h-12 w-full rounded-full" />;
  } else if (joined) {
    action = (
      <div className="space-y-2">
        <p className="rounded-full bg-success/15 py-3 text-center font-semibold text-success">You&apos;re going</p>
        <button type="button" onClick={handleLeave} disabled={busy} className="btn btn-ghost btn-sm w-full rounded-full">
          Can&apos;t make it? Leave event
        </button>
      </div>
    );
  } else {
    action = (
      <button type="button" onClick={handleJoin} disabled={busy || sessionLoading} className="btn btn-primary btn-lg w-full rounded-full">
        {busy && <span className="loading loading-spinner loading-sm" />}
        Join Event
      </button>
    );
  }

  return (
    <div className="container-page py-8 md:py-10">
      <Link href="/events" className="btn btn-ghost btn-sm -ml-3 mb-4 rounded-full">
        <LuArrowLeft className="h-4 w-4" /> All upcoming events
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden rounded-box bg-base-200 md:aspect-[21/9]">
        <img
          src={event.thumbnail}
          alt=""
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-accent border-0 font-semibold">{event.eventType}</span>
            <span className="badge badge-ghost">{daysUntil(event.eventDate)}</span>
            {isOwner && <span className="badge badge-primary">You&apos;re organizing this</span>}
          </div>
          <h1 className="mt-4 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-extrabold [font-variation-settings:'wdth'_82]">
            {event.title}
          </h1>
          <div className="mt-6 max-w-[68ch] whitespace-pre-line text-lg text-base-content/85">{event.description}</div>

          <div className="mt-10 flex items-center gap-3 rounded-box bg-base-200 p-4">
            <Avatar src={event.creatorImage} name={event.creatorName || event.creatorEmail} size="h-12 w-12" />
            <div className="min-w-0">
              <p className="text-sm text-base-content/65">Organized by</p>
              <p className="truncate font-semibold">{event.creatorName || event.creatorEmail}</p>
            </div>
          </div>

          {isOwner && <Participants eventId={id} />}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="ticket overflow-hidden">
            <div className="flex items-center gap-4 bg-primary p-5 text-primary-content">
              <div className="text-center">
                <p className="date-stub-day text-5xl">{day}</p>
                <p className="font-semibold">{month}</p>
              </div>
              <p className="font-display text-lg font-semibold leading-snug">{formatDate(event.eventDate).split(" at ")[0]}</p>
            </div>
            <ul className="space-y-4 p-5">
              <li className="flex gap-3">
                <LuCalendarDays className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{formatDate(event.eventDate)}</span>
              </li>
              <li className="flex gap-3">
                <LuMapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{event.location}</span>
              </li>
              <li className="flex gap-3">
                <LuTag className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{event.eventType}</span>
              </li>
              <li className="flex gap-3">
                <LuUsers className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>
                  {event.participantsCount || 0} {event.participantsCount === 1 ? "volunteer has" : "volunteers have"} joined
                </span>
              </li>
              <li className="flex gap-3">
                <LuClock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>Posted {new Date(event.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </li>
            </ul>
            <div className="ticket-perforation" />
            <div className="p-5">{action}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
