"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SocialLogin from "@/components/auth/SocialLogin";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { validateEmail } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"), "/events");
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.get("error")) {
      toast.error("Social login didn't finish. Try again or use your email and password.");
    }
  }, [params]);

  const blurEmail = () => {
    if (values.email) setErrors((err) => ({ ...err, email: validateEmail(values.email) || undefined }));
  };

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    const emailError = validateEmail(values.email);
    if (emailError) found.email = emailError;
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

    toast.success(`Welcome back, ${data?.user?.name || "friend"}!`);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={`input w-full ${errors.email ? "input-error" : ""}`} value={values.email} onChange={update} onBlur={blurEmail} placeholder="you@example.com" aria-invalid={!!errors.email} />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
<PasswordField id="password" value={values.password} onChange={update} error={errors.password} autoComplete="current-password" />
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
        <Link href={`/register${redirectTo !== "/events" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="link link-primary font-semibold">
          Create an account
        </Link>
      </p>
    </>
  );
}
