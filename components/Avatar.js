/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function Avatar({ src, name = "", size = "h-10 w-10", className = "" }) {
  const [failed, setFailed] = useState(false);
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?";

  if (!src || failed) {
    return (
      <span
        className={`${size} ${className} inline-flex items-center justify-center rounded-full bg-primary text-primary-content font-semibold`}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${size} ${className} rounded-full object-cover`}
    />
  );
}
