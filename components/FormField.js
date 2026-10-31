export default function FormField({ label, htmlFor, error, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-base-content/60">{hint}</p>
      ) : null}
    </div>
  );
}
