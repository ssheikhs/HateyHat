// Shared password rule: at least 6 characters, one uppercase and one lowercase letter
export function getPasswordErrors(password = "") {
  const errors = [];
  if (password.length < 6) errors.push("at least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  return errors;
}

export function passwordMessage(password) {
  const errors = getPasswordErrors(password);
  if (!errors.length) return "";
  return `Password needs ${errors.join(", ").replace(/, ([^,]*)$/, " and $1")}.`;
}
