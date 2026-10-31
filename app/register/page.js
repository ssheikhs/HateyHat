import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "./RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Join the neighbourhood"
      subtitle="Create an account to organize events and save your spot at the ones near you."
      image="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=75"
      caption={{ title: "One account, every cause", text: "Plantations on Friday, a blood camp next month — keep them all in one place." }}
    >
      <Suspense fallback={<div className="skeleton h-96 w-full" />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
