export type Theme = "light" | "dark";

export const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
};
