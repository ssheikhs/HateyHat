import PageHeader from "@/components/PageHeader";
import Profile from "./Profile";

export const metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="My profile" lead="Update the name and photo other volunteers see on your events." />
      <div className="container-page py-10">
        <Profile />
      </div>
    </>
  );
}
