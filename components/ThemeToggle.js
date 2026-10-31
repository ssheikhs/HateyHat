"use client";

import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const LIGHT = "hateyhat";
const DARK = "hateyhat-dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || LIGHT);
  }, []);

  const toggle = () => {
    const next = theme === DARK ? LIGHT : DARK;
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hateyhat-theme", next);
    } catch {
      // storage can be unavailable in private mode; the theme still switches
    }
    setTheme(next);
  };

  const isDark = theme === DARK;

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <LuSun className="h-5 w-5" /> : <LuMoon className="h-5 w-5" />}
    </button>
  );
}
