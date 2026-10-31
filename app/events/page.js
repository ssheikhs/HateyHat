import PageHeader from "@/components/PageHeader";
import EventsBrowser from "./EventsBrowser";

export const metadata = { title: "Upcoming Events" };

export default function UpcomingEventsPage() {
  return (
    <>
      <PageHeader
        title="Upcoming events"
        lead="Every event here is still ahead of us. Past dates are removed automatically."
      />
      <EventsBrowser />
    </>
  );
}
