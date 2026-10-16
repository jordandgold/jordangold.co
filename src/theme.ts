export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const getSavedTheme = (): Theme | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return null;
};

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// A choice made with the toggle wins; otherwise follow the system setting
export const getInitialTheme = (): Theme => getSavedTheme() ?? getSystemTheme();

export const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};

// Only called when the user toggles, so the system default is never locked in
export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
};

// Follow live system changes until the user has made an explicit choice
export const onSystemThemeChange = (callback: (theme: Theme) => void) => {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (!getSavedTheme()) callback(getSystemTheme());
  };
  query.addEventListener("change", handler);
  return () => query.removeEventListener("change", handler);
};
