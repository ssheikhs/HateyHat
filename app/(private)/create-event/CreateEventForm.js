"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventForm from "@/components/events/EventForm";
import { api } from "@/lib/api";

export default function CreateEventForm() {
  const router = useRouter();

  const handleCreate = async ({ dateChanged, ...data }) => {
    await api("/events", { method: "POST", body: data, auth: true });
    toast.success("Event created. It's now live on Upcoming Events.");
    router.push("/events");
  };

  return <EventForm onSubmit={handleCreate} submitLabel="Create event" submittingLabel="Creating event…" />;
}
