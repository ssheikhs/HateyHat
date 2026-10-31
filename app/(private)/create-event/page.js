import PageHeader from "@/components/PageHeader";
import CreateEventForm from "./CreateEventForm";

export const metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <>
      <PageHeader
        title="Create an event"
        lead="Tell neighbours what you're organizing. Your email is saved with the event so only you can edit it."
      />
      <div className="container-page py-10">
        <CreateEventForm />
      </div>
    </>
  );
}
