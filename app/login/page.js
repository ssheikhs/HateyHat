import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { photos } from "@/lib/photos";
import LoginForm from "./LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to join events, track the ones you signed up for and manage what you organize."
      image={photos.duReliefSort.src}
      caption={{ title: "Your spot is waiting", text: "Volunteers in Mirpur, Mohammadpur and beyond are already packing relief bags." }}
    >
      <Suspense fallback={<div className="skeleton h-80 w-full" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
