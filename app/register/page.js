import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { photos } from "@/lib/photos";
import RegisterForm from "./RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Join the neighbourhood"
      subtitle="Create an account to organize events and save your spot at the ones near you."
      image={photos.fireRelief2.src}
      caption={{ title: "One account, every cause", text: "Plantations on Friday, a blood camp next month — keep them all in one place." }}
    >
      <Suspense fallback={<div className="skeleton h-96 w-full" />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
