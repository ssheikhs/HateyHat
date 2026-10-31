"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import FormField from "@/components/FormField";
import ImageInput from "@/components/ImageInput";
import SocialLogin from "@/components/auth/SocialLogin";
import { signUp } from "@/lib/auth-client";
import { getPasswordErrors, passwordMessage } from "@/lib/password";
import { safeRedirect } from "@/lib/redirect";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  try {
    const url = new URL(values.image.trim());
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    errors.image = "Upload a profile photo or paste a link that starts with http:// or https://";
  }
  const pw = passwordMessage(values.password);
  if (pw) errors.password = pw;
  return errors;
}

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const [values, setValues] = useState({ name: "", email: "", image: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setSubmitting(true);
    const { error } = await signUp.email({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      image: values.image.trim(),
    });
    setSubmitting(false);

    if (error) {
      const message =
        error.code === "USER_ALREADY_EXISTS" || error.status === 422
          ? "An account with this email already exists. Log in instead."
          : error.message || "Registration failed. Try again.";
      toast.error(message);
      return;
    }

    toast.success(`Welcome to HateyHat, ${values.name.trim().split(" ")[0]}!`);
    router.push(redirectTo);
    router.refresh();
  };

  const rules = getPasswordErrors(values.password);
  const ruleList = [
    ["at least 6 characters", "6+ characters"],
    ["an uppercase letter", "Uppercase letter"],
    ["a lowercase letter", "Lowercase letter"],
  ];

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField label="Name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" className={`input w-full ${errors.name ? "input-error" : ""}`} value={values.name} onChange={update} placeholder="Ayesha Rahman" aria-invalid={!!errors.name} />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={`input w-full ${errors.email ? "input-error" : ""}`} value={values.email} onChange={update} placeholder="you@example.com" aria-invalid={!!errors.email} />
        </FormField>

        <FormField label="Profile photo" htmlFor="image" error={errors.image}>
          <ImageInput
            id="image"
            shape="round"
            value={values.image}
            error={errors.image}
            onChange={(url) => {
              setValues((v) => ({ ...v, image: url }));
              if (errors.image) setErrors((err) => ({ ...err, image: undefined }));
            }}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <div className={`input w-full ${errors.password ? "input-error" : ""}`}>
            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" className="grow" value={values.password} onChange={update} aria-invalid={!!errors.password} />
            <button type="button" className="text-base-content/60 hover:text-base-content" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
            </button>
          </div>
          <ul className="flex flex-wrap gap-2 pt-1 text-sm" aria-label="Password requirements">
            {ruleList.map(([key, label]) => {
              const ok = values.password && !rules.includes(key);
              return (
                <li key={key} className={`badge ${ok ? "badge-success" : "badge-ghost"}`}>
                  {label}
                </li>
              );
            })}
          </ul>
        </FormField>

        <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
          {submitting && <span className="loading loading-spinner loading-sm" />}
          Create account
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">or sign up with</div>
      <SocialLogin redirectTo={redirectTo} />

      <p className="mt-8 text-center text-base-content/75">
        Already have an account?{" "}
        <Link href={`/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="link link-primary font-semibold">
          Log in
        </Link>
      </p>
    </>
  );
}
