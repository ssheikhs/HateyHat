"use client";

import { useState } from "react";
import { LuCheck, LuCircle, LuEye, LuEyeOff } from "react-icons/lu";
import { PASSWORD_RULES, passwordStrength } from "@/lib/password";

const meterColors = ["bg-base-300", "bg-error", "bg-warning", "bg-info", "bg-success"];

export default function PasswordField({
  id = "password",
  name = "password",
  value,
  onChange,
  onBlur,
  error,
  autoComplete = "current-password",
  showStrength = false,
}) {
  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const { score, label } = passwordStrength(value);

  const detectCaps = (e) => setCapsLock(e.getModifierState?.("CapsLock") || false);

  return (
    <div className="space-y-2">
      <div className={`input w-full ${error ? "input-error" : ""}`}>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          className="grow"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={detectCaps}
          onKeyDown={detectCaps}
          aria-invalid={!!error}
          aria-describedby={showStrength ? `${id}-rules` : undefined}
          maxLength={64}
        />
        <button
          type="button"
          className="text-base-content/60 hover:text-base-content"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
        </button>
      </div>

      {capsLock && <p className="text-sm text-warning">Caps Lock is on.</p>}

      {showStrength && (
        <div id={`${id}-rules`} className="rounded-field border border-base-300 bg-base-200/60 p-3">
          <div className="flex items-center gap-3">
            <div className="grid flex-1 grid-cols-4 gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className={`h-1.5 rounded-full transition-colors ${score >= i ? meterColors[score] : "bg-base-300"}`} />
              ))}
            </div>
            <span className="w-14 text-right text-sm font-semibold" aria-live="polite">
              {label}
            </span>
          </div>
          <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
            {PASSWORD_RULES.map((rule) => {
              const ok = rule.test(value || "");
              return (
                <li key={rule.id} className={`flex items-center gap-2 ${ok ? "text-success" : "text-base-content/65"}`}>
                  {ok ? <LuCheck className="h-4 w-4 shrink-0" /> : <LuCircle className="h-3.5 w-3.5 shrink-0" />}
                  <span>
                    {rule.label}
                    {!rule.required && <span className="text-base-content/45"> · optional</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
