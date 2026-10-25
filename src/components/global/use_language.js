import { useSyncExternalStore } from "react";
import { pageFor, pathFor, readPath } from "../../site";

// The site is in English and Bulgarian. Text is written in both where it's used, as { en, bg }, and t() picks the one
// to show, so a sentence keeps its marked words and line breaks in each language
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "bg", name: "Български" },
];

const STORAGE_KEY = "language";

// Each language has its own address (Bulgarian under /bg, see site.js), so search engines can find and list both.
// A /bg address is always Bulgarian. The English ones are also where everyone lands by default, so there visitors
// in Bulgaria are taken to Bulgarian: the device's time zone tells where it is without asking for its location or
// waiting on a geolocation service, so the very first paint is already in the right language.
// Once a visitor picks a language in the nav it's remembered and wins from then on
const startingLanguage = () => {
  const { language: inPath } = readPath(window.location.pathname);
  if (inPath === "bg") return "bg";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some(({ code }) => code === saved)) return saved;
  } catch {
    // Storage is blocked (e.g. cookies off), so it goes by location every visit
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone === "Europe/Sofia" ? "bg" : "en";
};

// Points the address bar at the page in that language and names the tab in it, without reloading the page.
// An address that isn't one of the pages shows the home page (vercel.json), so it's pointed at the home page too.
// replaceState rather than pushState, so Back still leaves the page instead of switching the language back
const showLanguageIn = (code) => {
  const page = pageFor(readPath(window.location.pathname).path);
  const { search, hash } = window.location;
  history.replaceState(history.state, "", pathFor(page.path, code) + search + hash);
  document.title = page.title[code];
  // Tells screen readers, the browser and the CSS (:lang, for the fonts) which language the page is in
  document.documentElement.lang = code;
};

let language = startingLanguage();
const listeners = new Set();

showLanguageIn(language);

export const setLanguage = (code) => {
  language = code;
  showLanguageIn(code);
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

// The current language, t({ en, bg }) to pick its version of a text (or of anything else, like a list or a className),
// and to(path) for a link to one of the site's pages in it
const useLanguage = () => {
  const current = useSyncExternalStore(subscribe, () => language);
  return { language: current, t: (text) => text[current], to: (path) => pathFor(path, current) };
};

export default useLanguage;
