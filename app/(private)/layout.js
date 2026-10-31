import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Every page in this group requires a valid session.
// Checked on the server, so reloading a private page never bounces a logged-in user.
export default async function PrivateLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  return children;
}
