"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SocialLogin from "@/components/auth/SocialLogin";
import { signUp } from "@/lib/auth-client";
import { passwordMessage } from "@/lib/password";
import { safeRedirect } from "@/lib/redirect";
import { cleanName, validateEmail, validateImageUrl, validateName } from "@/lib/validation";

const validators = {
  name: (v) => validateName(v.name),
  email: (v) => validateEmail(v.email),
  image: (v) => validateImageUrl(v.image),
  password: (v) => passwordMessage(v.password),
  confirm: (v) => (!v.confirm ? "Re-enter your password." : v.confirm !== v.password ? "Passwords don't match." : ""),
};

function validateAll(values) {
  const errors = {};
  for (const [key, check] of Object.entries(validators)) {
    const message = check(values);
    if (message) errors[key] = message;
  }
  return errors;
}

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"), "/events");
  const [values, setValues] = useState({ name: "", email: "", image: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Re-check a field as the user types, but only after they have left it once
  const update = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] || errors[name]) {
      setErrors((err) => ({ ...err, [name]: validators[name](next) || undefined }));
    }
    if (name === "password" && (touched.confirm || errors.confirm)) {
      setErrors((err) => ({ ...err, confirm: validators.confirm(next) || undefined }));
    }
  };

  const blur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((err) => ({ ...err, [name]: validators[name](values) || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched({ name: true, email: true, image: true, password: true, confirm: true });
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setSubmitting(true);
    const { error } = await signUp.email({
      name: cleanName(values.name),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      image: values.image.trim(),
    });
    setSubmitting(false);

    if (error) {
      const message =
        error.code === "USER_ALREADY_EXISTS" || error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" || error.status === 422
          ? "An account with this email already exists. Log in instead."
          : error.message || "Registration failed. Try again.";
      toast.error(message);
      return;
    }

    toast.success(`Welcome to HateyHat, ${cleanName(values.name)}!`);
    router.push(redirectTo);
    router.refresh();
  };

  const loginHref = `/login${redirectTo !== "/events" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`;

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField label="Full name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={50} className={`input w-full ${errors.name ? "input-error" : ""}`} value={values.name} onChange={update} onBlur={blur} placeholder="Mr Sheikh" aria-invalid={!!errors.name} />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} className={`input w-full ${errors.email ? "input-error" : ""}`} value={values.email} onChange={update} onBlur={blur} placeholder="you@example.com" aria-invalid={!!errors.email} />
        </FormField>

        <FormField label="Photo URL" htmlFor="image" error={errors.image} hint="A public link to your profile picture. You can upload a photo later from your profile.">
          <input id="image" name="image" type="url" className={`input w-full ${errors.image ? "input-error" : ""}`} value={values.image} onChange={update} onBlur={blur} placeholder="https://..." aria-invalid={!!errors.image} />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <PasswordField id="password" value={values.password} onChange={update} onBlur={blur} error={errors.password} autoComplete="new-password" showStrength />
        </FormField>

        <FormField label="Confirm password" htmlFor="confirm" error={errors.confirm}>
          <PasswordField id="confirm" name="confirm" value={values.confirm} onChange={update} onBlur={blur} error={errors.confirm} autoComplete="new-password" />
        </FormField>

        <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
          {submitting && <span className="loading loading-spinner loading-sm" />}
          Create account
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">or</div>
      <SocialLogin redirectTo={redirectTo} />

      <p className="mt-8 text-center text-base-content/75">
        Already have an account?{" "}
        <Link href={loginHref} className="link link-primary font-semibold">
          Log in
        </Link>
      </p>
    </>
  );
}
