// Shared form rules, used by the forms and (where it matters) by the server too.

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

export function validateName(value = "") {
  const name = value.trim().replace(/\s+/g, " ");
  if (!name) return "Enter your full name.";
  if (name.length < 3) return "Name must be at least 3 characters.";
  if (name.length > 50) return "Name can be at most 50 characters.";
  if (/\d/.test(name)) return "Name can't contain numbers.";
  if (!NAME_PATTERN.test(name)) return "Use letters, spaces, dots, hyphens or apostrophes only.";
  if ((name.match(/[\p{L}]/gu) || []).length < 2) return "Name must contain at least 2 letters.";
  return "";
}

export function validateEmail(value = "") {
  const email = value.trim();
  if (!email) return "Enter your email address.";
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return "Enter a valid email address, like name@example.com.";
  return "";
}

export function validateImageUrl(value = "", { required = true, label = "photo" } = {}) {
  const url = value.trim();
  if (!url) return required ? `Add a link to your ${label}.` : "";
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
    return "";
  } catch {
    return `Enter a ${label} link that starts with http:// or https://`;
  }
}

export function cleanName(value = "") {
  return value.trim().replace(/\s+/g, " ");
}
