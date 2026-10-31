import EventDetails from "./EventDetails";

export const metadata = { title: "Event details" };

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  return <EventDetails id={id} />;
}
