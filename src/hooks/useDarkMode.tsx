import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colorTheme: any = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root: HTMLElement = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
