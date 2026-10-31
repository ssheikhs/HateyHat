import PageHeader from "@/components/PageHeader";
import EditEvent from "./EditEvent";

export const metadata = { title: "Update Event" };

export default async function EditEventPage({ params }) {
  const { id } = await params;
  return (
    <>
      <PageHeader title="Update event" lead="Changes show up for everyone straight away, including volunteers who already joined." />
      <div className="container-page py-10">
        <EditEvent id={id} />
      </div>
    </>
  );
}
