"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import FormField from "@/components/FormField";
import SocialLogin from "@/components/auth/SocialLogin";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.get("error")) {
      toast.error("Social login didn't finish. Try again or use your email and password.");
    }
  }, [params]);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!emailPattern.test(values.email.trim())) found.email = "Enter a valid email address.";
    if (!values.password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setSubmitting(true);
    const { data, error } = await signIn.email({
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });
    setSubmitting(false);

    if (error) {
      toast.error(
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "That email and password don't match. Check them and try again."
          : error.message || "Login failed. Try again."
      );
      return;
    }

    toast.success(`Welcome back, ${data?.user?.name?.split(" ")[0] || "friend"}!`);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={`input w-full ${errors.email ? "input-error" : ""}`} value={values.email} onChange={update} placeholder="you@example.com" aria-invalid={!!errors.email} />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <div className={`input w-full ${errors.password ? "input-error" : ""}`}>
            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" className="grow" value={values.password} onChange={update} aria-invalid={!!errors.password} />
            <button type="button" className="text-base-content/60 hover:text-base-content" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>

        <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
          {submitting && <span className="loading loading-spinner loading-sm" />}
          Log in
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">or continue with</div>
      <SocialLogin redirectTo={redirectTo} />

      <p className="mt-8 text-center text-base-content/75">
        New to HateyHat?{" "}
        <Link href={`/register${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="link link-primary font-semibold">
          Create an account
        </Link>
      </p>
    </>
  );
}
