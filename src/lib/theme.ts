export type Theme = "light" | "dark";
export const THEME_KEY = "ausc-theme";

/** Runs in <head> before paint: applies saved theme or system preference, no flash. */
export const themeInitScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('${THEME_KEY}');var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

export function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage blocked — theme still applies for this visit */
    }
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 500);
}
