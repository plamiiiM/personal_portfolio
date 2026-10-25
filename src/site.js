// The site's pages and what search engines and link previews are told about each, in English and Bulgarian.
// Read both by the app and by the build (vite.config.js), which writes every page out as its own HTML file with this
// in its <head>, so a crawler that doesn't run JavaScript still sees the right language, title and description.
// No JSX or browser APIs in here, so the build can load it as it is

export const SITE_URL = "https://plamenamincheva.com";

// English lives at the bare paths, Bulgarian under /bg
export const BG_PREFIX = "/bg";

export const PAGES = [
  {
    path: "/",
    image: "/picture_of_me_graphite.png",
    title: { en: "Plamena Mincheva - UX/UI Designer", bg: "Пламена Минчева – UX/UI дизайнер" },
    description: {
      en: "Portfolio of Plamena Mincheva, a UX/UI designer and mobile developer studying ICT & Media Design at Fontys UAS. Case studies in user research, gamification and app design.",
      bg: "Портфолио на Пламена Минчева – UX/UI дизайнер и мобилен разработчик, студентка по ICT & Media Design във Fontys UAS. Проекти в потребителски проучвания, геймификация и дизайн на приложения.",
    },
  },
  {
    path: "/smartnet",
    image: "/smartnet_collage_bigger.png",
    title: { en: "SmartNet - Plamena Mincheva", bg: "SmartNet – Пламена Минчева" },
    description: {
      en: "SmartNet case study: designing the end-to-end user experience of an app that turns football training data into interactive games and player profiles.",
      bg: "Проектът SmartNet: цялостното потребителско изживяване на приложение, което превръща данните от футболните тренировки в интерактивни игри и профили на играчите.",
    },
  },
  {
    path: "/equine-integration",
    image: "/equine_integration_collage.png",
    title: { en: "Equine Integration - Plamena Mincheva", bg: "Equine Integration – Пламена Минчева" },
    description: {
      en: "Equine Integration case study: redesigning and building a gamified horse training app, from data analysis and interviews to five approved features.",
      bg: "Проектът Equine Integration: преработка и разработка на приложение за тренировки на коне с елементи на игра – от анализ на данни и интервюта до пет одобрени функционалности.",
    },
  },
];

// The URL path of a page in a language: "/smartnet" in Bulgarian is "/bg/smartnet", the home page "/bg"
export const pathFor = (path, language) =>
  language === "bg" ? (path === "/" ? BG_PREFIX : BG_PREFIX + path) : path;

// The other way round: which page a URL path is and which language it's in. Trailing slashes don't matter
export const readPath = (pathname) => {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  if (trimmed === BG_PREFIX) return { language: "bg", path: "/" };
  if (trimmed.startsWith(BG_PREFIX + "/")) return { language: "bg", path: trimmed.slice(BG_PREFIX.length) };
  return { language: "en", path: trimmed };
};

export const pageFor = (path) => PAGES.find((page) => page.path === path) ?? PAGES[0];
