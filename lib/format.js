export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Blood Donation",
  "Education",
  "Healthcare",
  "Relief",
];

const tz = "Asia/Dhaka";

export function dateParts(value) {
  const d = new Date(value);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit", timeZone: tz }),
    month: d.toLocaleDateString("en-GB", { month: "short", timeZone: tz }),
    weekday: d.toLocaleDateString("en-GB", { weekday: "short", timeZone: tz }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }),
    year: d.toLocaleDateString("en-GB", { year: "numeric", timeZone: tz }),
  };
}

export function formatDate(value) {
  return new Date(value).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  });
}

export function isPast(value) {
  return new Date(value).getTime() < Date.now();
}

// Value for <input type="datetime-local"> in the browser's own timezone
export function toLocalInput(value) {
  const d = value ? new Date(value) : new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function daysUntil(value) {
  const target = new Date(value);
  const diff = target.getTime() - Date.now();
  if (diff < 0) return "Ended";
  const dayKey = (d) => d.toLocaleDateString("en-CA", { timeZone: tz });
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86_400_000);
  if (dayKey(target) === dayKey(today)) return "Today";
  if (dayKey(target) === dayKey(tomorrow)) return "Tomorrow";
  return `In ${Math.ceil(diff / 86_400_000)} days`;
}
