"use client";

import Swal from "sweetalert2";

// SweetAlert styled with the site's own buttons, so it follows light/dark theme
export async function confirmAction({ title, text, confirmText = "Confirm", danger = false }) {
  const result = await Swal.fire({
    title,
    text,
    icon: danger ? "warning" : "question",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Keep it",
    reverseButtons: true,
    focusCancel: danger,
    buttonsStyling: false,
    background: "var(--color-base-100)",
    color: "var(--color-base-content)",
    customClass: {
      popup: "!rounded-box !border !border-base-300",
      title: "!font-display",
      actions: "gap-3",
      confirmButton: `btn rounded-full px-6 ${danger ? "btn-error" : "btn-primary"}`,
      cancelButton: "btn btn-ghost rounded-full px-6",
    },
  });
  return result.isConfirmed;
}
