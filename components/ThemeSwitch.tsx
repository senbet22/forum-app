"use client";

import { useEffect, useState } from "react";
import { Switch } from "@digdir/designsystemet-react";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const initialTheme = stored ?? (prefersDark ? "dark" : "light");

      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
      localStorage.setItem("theme", initialTheme);
    });
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  if (!theme) return null;

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      label={theme === "dark" ? "Dark mode" : "Light mode"}
      position="start"
    />
  );
}
