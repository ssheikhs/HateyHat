"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Avatar from "@/components/Avatar";
import FormField from "@/components/FormField";
import ImageInput from "@/components/ImageInput";
import { updateUser, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { useApi } from "@/lib/useApi";

function Counts() {
  const mine = useApi("/events/mine", { auth: true });
  const joined = useApi("/joined-events", { auth: true });
  const items = [
    { label: "Events organized", value: mine.data?.length, href: "/manage-events", loading: mine.loading },
    { label: "Events joined", value: joined.data?.length, href: "/joined-events", loading: joined.loading },
  ];
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="rounded-box border border-base-300 p-4 hover:border-primary">
          {item.loading ? <div className="skeleton h-8 w-10" /> : <p className="font-display text-3xl font-extrabold text-primary">{item.value ?? 0}</p>}
          <p className="text-sm text-base-content/70">{item.label}</p>
        </Link>
      ))}
    </div>
  );
}

export default function Profile() {
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;

  if (isPending || !user) {
    return (
      <div className="grid gap-10 lg:grid-cols-[22rem_1fr]" role="status" aria-label="Loading profile">
        <div className="skeleton h-80 w-full" />
        <div className="space-y-4">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-40" />
        </div>
      </div>
    );
  }

  return <ProfileContent key={`${user.name}|${user.image}`} user={user} refetch={refetch} />;
}

function ProfileContent({ user, refetch }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: user.name || "", image: user.image || "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (values.name.trim().length < 2) found.name = "Enter your name (at least 2 characters).";
    if (values.image.trim()) {
      try {
        const url = new URL(values.image.trim());
        if (!["http:", "https:"].includes(url.protocol)) throw new Error();
      } catch {
        found.image = "Enter a photo link that starts with http:// or https://";
      }
    }
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setSaving(true);
    const { error } = await updateUser({ name: values.name.trim(), image: values.image.trim() || null });
    setSaving(false);
    if (error) {
      toast.error(error.message || "Profile couldn't be updated. Try again.");
      return;
    }
    clearToken();
    await refetch?.();
    router.refresh();
    toast.success("Profile updated.");
  };

  const unchanged = values.name.trim() === (user.name || "") && values.image.trim() === (user.image || "");

  return (
    <div className="grid gap-10 lg:grid-cols-[22rem_1fr]">
      <aside className="ticket self-start overflow-hidden">
        <div className="h-20 bg-primary" />
        <div className="-mt-12 px-6 pb-6">
          <Avatar src={user.image} name={user.name} size="h-24 w-24" className="ring-4 ring-base-100 text-2xl" />
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-base-content/70">{user.email}</p>
          <p className="mt-2 text-sm text-base-content/60">
            Member since {new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </p>
          <Counts />
        </div>
      </aside>

      <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
        <h2 className="text-2xl font-bold">Edit profile</h2>
        <FormField label="Name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" className={`input w-full ${errors.name ? "input-error" : ""}`} value={values.name} onChange={update} aria-invalid={!!errors.name} />
        </FormField>
        <FormField label="Profile photo" htmlFor="image" error={errors.image} hint="Leave empty to show your initials.">
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
        <FormField label="Email" htmlFor="email" hint="Your email can't be changed.">
          <input id="email" className="input w-full" value={user.email} disabled />
        </FormField>
        <button type="submit" className="btn btn-primary rounded-full px-8" disabled={saving || unchanged}>
          {saving && <span className="loading loading-spinner loading-sm" />}
          Save changes
        </button>
      </form>
    </div>
  );
}
