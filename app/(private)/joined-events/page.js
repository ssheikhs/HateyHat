import PageHeader from "@/components/PageHeader";
import JoinedEvents from "./JoinedEvents";

export const metadata = { title: "Joined Events" };

export default function JoinedEventsPage() {
  return (
    <>
      <PageHeader title="Events you joined" lead="Everything you signed up for, in date order." />
      <div className="container-page py-10">
        <JoinedEvents />
      </div>
    </>
  );
}
