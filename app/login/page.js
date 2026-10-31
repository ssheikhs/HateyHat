import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "./LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to join events, track the ones you signed up for and manage what you organize."
      image="https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=1200&q=75"
      caption={{ title: "Your spot is waiting", text: "Volunteers in Mirpur, Mohammadpur and beyond are already packing relief bags." }}
    >
      <Suspense fallback={<div className="skeleton h-80 w-full" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
