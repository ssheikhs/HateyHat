// Password rules. The first three are required (assignment rule, also checked on the server);
// numbers and symbols only make the password stronger.
export const PASSWORD_RULES = [
  { id: "length", label: "At least 6 characters", test: (p) => p.length >= 6, required: true },
  { id: "upper", label: "One uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p), required: true },
  { id: "lower", label: "One lowercase letter (a–z)", test: (p) => /[a-z]/.test(p), required: true },
  { id: "number", label: "A number (0–9)", test: (p) => /\d/.test(p), required: false },
  { id: "symbol", label: "A symbol (!@#…)", test: (p) => /[^A-Za-z0-9\s]/.test(p), required: false },
];

export function getPasswordErrors(password = "") {
  const errors = [];
  if (password.length < 6) errors.push("at least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  return errors;
}

export function passwordMessage(password = "") {
  if (/\s/.test(password)) return "Password can't contain spaces.";
  if (password.length > 64) return "Password can be at most 64 characters.";
  const errors = getPasswordErrors(password);
  if (!errors.length) return "";
  return `Password needs ${errors.join(", ").replace(/, ([^,]*)$/, " and $1")}.`;
}

// 0–4 score for the strength meter
export function passwordStrength(password = "") {
  if (!password) return { score: 0, label: "" };
  let score = PASSWORD_RULES.filter((r) => r.test(password)).length - 1;
  if (password.length >= 10) score += 1;
  if (getPasswordErrors(password).length) score = Math.min(score, 1);
  score = Math.max(1, Math.min(4, score));
  return { score, label: ["", "Weak", "Fair", "Good", "Strong"][score] };
}
