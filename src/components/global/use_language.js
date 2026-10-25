import { useSyncExternalStore } from "react";

// The site is in English and Bulgarian. Text is written in both where it's used, as { en, bg }, and t() picks the one
// to show, so a sentence keeps its marked words and line breaks in each language
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "bg", name: "Български" },
];

const STORAGE_KEY = "language";

// Visitors in Bulgaria start in Bulgarian, everyone else in English. The device's time zone tells where it is without
// asking for its location or waiting on a geolocation service, so the very first paint is already in the right language.
// Once a visitor picks a language in the nav it's remembered and wins from then on
const startingLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some(({ code }) => code === saved)) return saved;
  } catch {
    // Storage is blocked (e.g. cookies off), so it goes by location every visit
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone === "Europe/Sofia" ? "bg" : "en";
};

let language = startingLanguage();
const listeners = new Set();

// Tells screen readers, the browser and the CSS (:lang, for the fonts) which language the page is in
document.documentElement.lang = language;

export const setLanguage = (code) => {
  language = code;
  document.documentElement.lang = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Not remembered then, the page still switches
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// The current language, and t({ en, bg }) to pick its version of a text (or of anything else, like a list or a className)
const useLanguage = () => {
  const current = useSyncExternalStore(subscribe, () => language);
  return { language: current, t: (text) => text[current] };
};

export default useLanguage;
