import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ManageEvents from "./ManageEvents";

export const metadata = { title: "Manage Events" };

export default function ManageEventsPage() {
  return (
    <>
      <PageHeader title="Manage your events" lead="Update details or delete events you organize. Only you can see this page.">
        <Link href="/create-event" className="btn btn-primary rounded-full px-6">New event</Link>
      </PageHeader>
      <div className="container-page py-10">
        <ManageEvents />
      </div>
    </>
  );
}
