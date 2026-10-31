"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm from "@/components/events/EventForm";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { toLocalInput } from "@/lib/format";

export default function EditEvent({ id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: event, loading, error } = useApi(`/events/${id}`);

  if (loading || !session) {
    return (
      <div className="space-y-5" role="status" aria-label="Loading event">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="rounded-box border border-error/40 p-8 text-center">
        <p className="font-semibold">This event couldn&apos;t be found.</p>
        <Link href="/manage-events" className="btn btn-primary btn-sm mt-4 rounded-full">Back to your events</Link>
      </div>
    );
  }

  if (event.creatorEmail !== session.user.email) {
    return (
      <div className="rounded-box border border-warning/50 p-8 text-center">
        <p className="font-semibold">You can only update events you organize.</p>
        <Link href={`/events/${id}`} className="btn btn-primary btn-sm mt-4 rounded-full">View the event</Link>
      </div>
    );
  }

  const initialValues = {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnail: event.thumbnail,
    location: event.location,
    eventDate: toLocalInput(event.eventDate),
  };

  const handleUpdate = async ({ dateChanged, ...data }) => {
    const body = { ...data };
    if (!dateChanged) delete body.eventDate;
    await api(`/events/${id}`, { method: "PATCH", body, auth: true });
    toast.success("Event updated.");
    router.push("/manage-events");
  };

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      submitLabel="Save changes"
      submittingLabel="Saving…"
      dateLocked
    />
  );
}
