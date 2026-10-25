import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PAGES, SITE_URL, pageFor, pathFor, readPath } from "./src/site.js";

// The app picks its page and language in the browser, but search engines and link previews (LinkedIn, Slack, ...)
// go by the HTML they're sent. So the build writes every page in both languages out as its own HTML file
// (smartnet.html, bg/smartnet.html, ...; Vercel serves them without the .html, see vercel.json) with its language,
// title, description and links to its other language already in the <head>, plus the sitemap pointing at all of them

const LANGUAGE_CODES = ["en", "bg"];
const OG_LOCALES = { en: "en_US", bg: "bg_BG" };
const LINKEDIN = "https://www.linkedin.com/in/plamena-mincheva-302a58294/";

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const urlFor = (pagePath, language) => SITE_URL + pathFor(pagePath, language);

// Who the site is about, so search engines can tie "Plamena Mincheva" and "Пламена Минчева" to the same person
const personData = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Plamena Mincheva",
    alternateName: "Пламена Минчева",
    jobTitle: "UX/UI Designer",
    url: SITE_URL,
    image: SITE_URL + PAGES[0].image,
    sameAs: [LINKEDIN],
  }).replaceAll("<", "\\u003c");

const headFor = (page, language) => {
  const title = escape(page.title[language]);
  const description = escape(page.description[language]);
  const url = urlFor(page.path, language);
  const other = LANGUAGE_CODES.find((code) => code !== language);

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGUAGE_CODES.map((code) => `<link rel="alternate" hreflang="${code}" href="${urlFor(page.path, code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${urlFor(page.path, "en")}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Plamena Mincheva" />`,
    `<meta property="og:locale" content="${OG_LOCALES[language]}" />`,
    `<meta property="og:locale:alternate" content="${OG_LOCALES[other]}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL + page.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(page.path === "/" ? [`<script type="application/ld+json">${personData()}</script>`] : []),
  ].join("\n    ");
};

// index.html has <html lang="en"> and a placeholder <title>; both are swapped for the page's own
const fillIn = (html, page, language) =>
  html.replace(/<html lang="[^"]*">/, `<html lang="${language}">`).replace(/<title>.*<\/title>/, headFor(page, language));

const fileFor = (pagePath, language) => (pagePath === "/" && language === "en" ? "index.html" : `${pathFor(pagePath, language).slice(1)}.html`);

const sitemap = () => {
  const entries = PAGES.flatMap((page) =>
    LANGUAGE_CODES.map(
      (language) => `  <url>
    <loc>${urlFor(page.path, language)}</loc>
${LANGUAGE_CODES.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${urlFor(page.path, code)}" />`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(page.path, "en")}" />
  </url>`,
    ),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
};

const seoPages = () => {
  let outDir;

  return {
    name: "seo-pages",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    // While developing, each address gets its own head too
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html;
      const { language, path: pagePath } = readPath(new URL(ctx.originalUrl ?? "/", SITE_URL).pathname);
      return fillIn(html, pageFor(pagePath), language);
    },
    async closeBundle() {
      if (!outDir) return;
      const template = await readFile(path.join(outDir, "index.html"), "utf8");
      for (const page of PAGES) {
        for (const language of LANGUAGE_CODES) {
          const file = path.join(outDir, fileFor(page.path, language));
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, fillIn(template, page, language));
        }
      }
      await writeFile(path.join(outDir, "sitemap.xml"), sitemap());
    },
  };
};

export default seoPages;
