import { useEffect, useState } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    if (localStorage.theme) {
      return localStorage.theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
