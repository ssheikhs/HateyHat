/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import { EVENT_TYPES, toLocalInput } from "@/lib/format";

const empty = { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "" };

export function validateEventForm(values, { requireFutureDate = true } = {}) {
  const errors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const location = values.location.trim();

  if (title.length < 5 || title.length > 100) errors.title = "Title must be 5 to 100 characters.";
  if (description.length < 20 || description.length > 2000)
    errors.description = "Describe the event in 20 to 2000 characters.";
  if (!EVENT_TYPES.includes(values.eventType)) errors.eventType = "Choose an event type.";
  try {
    const url = new URL(values.thumbnail.trim());
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    errors.thumbnail = "Enter an image link that starts with http:// or https://";
  }
  if (location.length < 3 || location.length > 150) errors.location = "Location must be 3 to 150 characters.";

  if (!values.eventDate) {
    errors.eventDate = "Pick the date and time of the event.";
  } else if (requireFutureDate && new Date(values.eventDate).getTime() <= Date.now()) {
    errors.eventDate = "The event date must be in the future.";
  }
  return errors;
}

export default function EventForm({ initialValues, onSubmit, submitLabel, submittingLabel, dateLocked = false }) {
  const [values, setValues] = useState(() => ({ ...empty, ...initialValues }));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [previewOk, setPreviewOk] = useState(true);
  // The earliest selectable time is set when the picker opens, so it is always "now"
  const setMinToNow = (e) => {
    e.currentTarget.min = toLocalInput(new Date(Date.now() + 60_000));
  };

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (name === "thumbnail") setPreviewOk(true);
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateChanged = values.eventDate !== initialValues?.eventDate;
    const found = validateEventForm(values, { requireFutureDate: !dateLocked || dateChanged });
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        eventType: values.eventType,
        thumbnail: values.thumbnail.trim(),
        location: values.location.trim(),
        eventDate: new Date(values.eventDate).toISOString(),
        dateChanged,
      });
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      toast.error(err.message === "Validation failed" ? Object.values(err.errors || {})[0] || err.message : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name) => `${errors[name] ? "input-error" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-5">
        <FormField label="Event title" htmlFor="title" error={errors.title}>
          <input id="title" name="title" className={`input w-full ${field("title")}`} value={values.title} onChange={update} placeholder="Winter clothes distribution" maxLength={100} aria-invalid={!!errors.title} />
        </FormField>

        <FormField
          label="Description"
          htmlFor="description"
          error={errors.description}
          hint={`${values.description.trim().length}/2000 · What will volunteers do, and what should they bring?`}
        >
          <textarea id="description" name="description" rows={6} className={`textarea w-full ${errors.description ? "textarea-error" : ""}`} value={values.description} onChange={update} maxLength={2000} placeholder="We'll meet at the field gate, sort donated clothes by size and hand them out to families from the area. Bring gloves and a water bottle." aria-invalid={!!errors.description} />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Event type" htmlFor="eventType" error={errors.eventType}>
            <select id="eventType" name="eventType" className={`select w-full ${errors.eventType ? "select-error" : ""}`} value={values.eventType} onChange={update} aria-invalid={!!errors.eventType}>
              <option value="" disabled>Choose a type</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Date and time" htmlFor="eventDate" error={errors.eventDate} hint="Only future dates are allowed.">
            <input id="eventDate" name="eventDate" type="datetime-local" onFocus={setMinToNow} className={`input w-full ${field("eventDate")}`} value={values.eventDate} onChange={update} aria-invalid={!!errors.eventDate} />
          </FormField>
        </div>

        <FormField label="Location" htmlFor="location" error={errors.location}>
          <input id="location" name="location" className={`input w-full ${field("location")}`} value={values.location} onChange={update} placeholder="Mirpur 10, Dhaka" maxLength={150} aria-invalid={!!errors.location} />
        </FormField>

        <FormField label="Thumbnail image URL" htmlFor="thumbnail" error={errors.thumbnail}>
          <input id="thumbnail" name="thumbnail" type="url" className={`input w-full ${field("thumbnail")}`} value={values.thumbnail} onChange={update} placeholder="https://..." aria-invalid={!!errors.thumbnail} />
        </FormField>

        <button type="submit" className="btn btn-primary btn-lg rounded-full px-10" disabled={submitting}>
          {submitting && <span className="loading loading-spinner loading-sm" />}
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 font-medium">Preview</p>
        <div className="ticket overflow-hidden">
          <div className="aspect-[16/10] bg-base-200">
            {values.thumbnail && previewOk ? (
              <img src={values.thumbnail} alt="" className="h-full w-full object-cover" onError={() => setPreviewOk(false)} />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-base-content/60">
                {values.thumbnail ? "This link doesn't load as an image." : "Paste an image link to see it here."}
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="line-clamp-2 font-display text-lg font-bold">{values.title || "Your event title"}</p>
            <p className="mt-1 text-sm text-base-content/70">{values.location || "Location"}</p>
            {values.eventType && <span className="badge badge-accent mt-3 border-0">{values.eventType}</span>}
          </div>
        </div>
      </aside>
    </form>
  );
}
