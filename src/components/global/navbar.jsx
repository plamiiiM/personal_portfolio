import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Button from "./buttons";
import usePhoneLayout from "./use_phone_layout";
import useLanguage, { LANGUAGES, setLanguage } from "./use_language";
import CV from "./cv";

const NAV_LINKS = [
  { label: { en: "Work", bg: "Проекти" }, href: "#work" },
  { label: { en: "Experience", bg: "Опит" }, href: "#experience" },
  { label: { en: "Skills", bg: "Умения" }, href: "#skills" },
  { label: { en: "Contact", bg: "Контакти" }, href: "#contact" },
];

// Pencil line that draws in under a link; add after:scale-x-100 to show it
const PENCIL_UNDERLINE =
  "relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-(--pencilLine) after:origin-left after:transition-transform after:duration-300";

const NAV_HEIGHT = 96; // h-24
const LANDING_GAP = 24; // space left above a section after jumping to it

// The nav hides while scrolling down and comes back when scrolling up,
// so only leave room for it when the jump goes up the page
const scrollToSection = (e, href) => {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  // Honour scroll-margin-top so a target can fine-tune where it lands (e.g. -scroll-mt-16).
  // It's in page px, so it's shrunk like the page (ScaleToFit's --zoom) to match getBoundingClientRect's screen px
  const style = getComputedStyle(target);
  const scrollMargin = parseFloat(style.scrollMarginTop) * (parseFloat(style.getPropertyValue("--zoom")) || 1);
  const top = target.getBoundingClientRect().top + window.scrollY - scrollMargin;
  const goingDown = top - LANDING_GAP > window.scrollY;
  window.scrollTo({ top: top - (goingDown ? LANDING_GAP : NAV_HEIGHT + LANDING_GAP) });
  history.pushState(null, "", href);
};

// Slightly wobbly horizontal line in a 1000x6 viewBox that gets stretched to the nav width
const pencilLine = (from, to, phase) => {
  const points = [];
  for (let x = from; x <= to; x += 10) {
    const y = 3 + Math.sin(x * 0.035 + phase) * 0.5 + Math.sin(x * 0.09 + phase * 2) * 0.25;
    points.push(`${x} ${y.toFixed(2)}`);
  }
  return "M " + points.join(" L ");
};

const MAIN_STROKE = pencilLine(0, 1000, 0);
// A lighter, shorter pass over the same line, like going over it twice with a pencil
const SECOND_PASS = pencilLine(40, 930, 1.5);

// The menu button's three pencil strokes in a 28x20 box, each a little wobbly. Opening the menu folds the outer two
// into an X over the middle one, which fades out
const burgerStroke = (y, phase) => {
  const points = [];
  for (let x = 2; x <= 26; x += 2) points.push(`${x} ${(y + Math.sin(x * 0.45 + phase) * 0.35).toFixed(2)}`);
  return "M " + points.join(" L ");
};
const BURGER_STROKES = [
  { d: burgerStroke(3, 0), open: "translate-y-[7px] rotate-45" },
  { d: burgerStroke(10, 2), open: "opacity-0 scale-x-0" },
  { d: burgerStroke(17, 4), open: "-translate-y-[7px] -rotate-45" },
];

// The page's paper behind the nav and its menu. Like the page's own paper it starts at the top of the screen,
// so `top` lines it up from wherever the box it fills begins, and the nav, its menu and the page read as one sheet
const Paper = ({ top = "top-0" }) => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-(--bg) pointer-events-none" aria-hidden="true">
    <div
      className={`absolute ${top} left-0 w-screen h-screen
                 bg-[url('/white_texture_paper.webp')] bg-cover bg-center
                 opacity-75 mix-blend-multiply`}
    />
    <div
      className={`absolute ${top} left-0 w-screen h-screen
                 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5)_0%,transparent_30%)]`}
    />
  </div>
);

// EN / BG, with the links' pencil underline under the language that's showing
const LanguageSwitch = () => {
  const { language, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t({ en: "Language", bg: "Език" })}
      className="flex items-center gap-x-2 font-poppins text-[1rem] tracking-wide text-(--brown)"
    >
      {LANGUAGES.map(({ code, name }, index) => {
        const isShowing = code === language;
        return (
          <Fragment key={code}>
            {index > 0 && <span aria-hidden="true">/</span>}
            <button
              type="button"
              lang={code}
              title={name}
              aria-pressed={isShowing}
              onClick={() => setLanguage(code)}
              className={`${PENCIL_UNDERLINE} uppercase cursor-pointer ${
                isShowing ? "font-semibold after:scale-x-100" : "opacity-70 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {code}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
};

// In the phone layout the links don't fit beside the logo, so they move into a menu behind a button
const Navbar = () => {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isPhoneLayout = usePhoneLayout();
  const { t, to } = useLanguage();
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  const openCv = () => window.open(t(CV));

  // Wider screens have the links in the nav itself, so the menu never shows there
  const isMenuShowing = isMenuOpen && isPhoneLayout;
  const isHidden = hidden && !isMenuShowing;

  // While the menu shows it's the only thing on the screen: the page behind it can't scroll or take focus.
  // A layout effect, so closing it (flushSync in goToSection) gives the page back before it scrolls to a section
  useLayoutEffect(() => {
    if (!isMenuShowing) return;
    const nav = navRef.current;
    const behind = [...nav.parentElement.children].filter((element) => element !== nav);
    behind.forEach((element) => (element.inert = true));
    document.documentElement.style.overflow = "hidden";
    return () => {
      behind.forEach((element) => (element.inert = false));
      document.documentElement.style.overflow = "";
    };
  }, [isMenuShowing]);

  // Escape closes the menu, back to its button
  useEffect(() => {
    if (!isMenuShowing) return;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuShowing]);

  const goToSection = (e, href) => {
    flushSync(() => setIsMenuOpen(false));
    scrollToSection(e, href);
  };

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // Ignore tiny movements so the nav doesn't flicker, and always show it near the top
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > NAV_HEIGHT);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lets pinned content sit just below the nav while it's showing
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-offset", isHidden ? "0px" : `${NAV_HEIGHT}px`);
  }, [isHidden]);

  // Arriving from another page with a #section: the browser can't jump to it on its own because the section
  // only exists once React has rendered it, so jump once the page (and its images) have loaded
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    const jump = () => target.scrollIntoView();
    if (document.readyState === "complete") jump();
    else window.addEventListener("load", jump, { once: true });
    return () => window.removeEventListener("load", jump);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 inset-x-0 z-40 h-24 px-5 sm:px-10 lg:px-28 flex items-center justify-between isolate
                    transition-transform duration-300 motion-reduce:transition-none has-focus-visible:translate-y-0 ${
                      isHidden ? "-translate-y-full" : "translate-y-0"
                    }`}
      >
        <Paper />

        {/* The links point at the landing page, so they also work from other pages.
            When the section is on the current page, scrollToSection takes over instead.
            The logo and then the links come down into place as the page opens (.nav-enter): the logo itself rather than
            its link, as a link fading around it would keep it from blending into the paper until it's done */}
        <a href={`${to("/")}#`} aria-label={t({ en: "Home", bg: "Начало" })} className="shrink-0">
          <img
            src="/icon_portfolio.webp"
            alt={t({ en: "Plamena Mincheva logo", bg: "Лого на Пламена Минчева" })}
            className="nav-enter h-12 sm:h-16 w-auto mix-blend-multiply"
          />
        </a>

        {/* The language switch stays in the bar in both layouts: after the CV on wider screens, by the menu button on phones */}
        <div className="nav-enter [--enter-delay:0.25s] self-stretch flex items-center gap-x-3 lg:gap-x-10">
          <div className="self-stretch hidden lg:flex items-center gap-x-14">
            <ul className="flex items-center gap-x-10 font-poppins text-[1rem] tracking-wide text-(--brown)">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={`${to("/")}${href}`}
                    onClick={(e) => scrollToSection(e, href)}
                    className={`${PENCIL_UNDERLINE} after:scale-x-0 hover:after:scale-x-100`}
                  >
                    {t(label)}
                  </a>
                </li>
              ))}
            </ul>

            <Button.Secondary
              onClick={openCv}
            >
              CV
            </Button.Secondary>

            {/* Hangs from the top edge like a bookmark ribbon */}
            {/* <img src="/nav_bookmark.png" alt="" aria-hidden="true" className="self-start w-9 h-22.5" /> */}
          </div>

          <LanguageSwitch />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuShowing)}
            aria-expanded={isMenuShowing}
            aria-controls="nav-menu"
            aria-label={
              isMenuShowing ? t({ en: "Close menu", bg: "Затвори менюто" }) : t({ en: "Open menu", bg: "Отвори менюто" })
            }
            className="lg:hidden -mr-2.5 p-2.5 cursor-pointer text-(--pencilLine)"
          >
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
              {BURGER_STROKES.map(({ d, open }) => (
                <path
                  key={d}
                  d={d}
                  strokeWidth="2"
                  className={`origin-center [transform-box:fill-box] transition-[translate,rotate,scale,opacity] duration-300
                              motion-reduce:transition-none ${isMenuShowing ? open : ""}`}
                />
              ))}
            </svg>
          </button>
        </div>

        {/* The menu: a sheet of the same paper under the nav, with the links one under another */}
        <div
          id="nav-menu"
          className={`lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-6rem)] overflow-y-auto isolate
                      transition-[opacity,translate,visibility] duration-300 motion-reduce:transition-none ${
                        isMenuShowing ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2"
                      }`}
        >
          <Paper top="-top-24" />
          <ul className="mx-auto max-w-3xl px-5 sm:px-10 pt-4 font-poppins text-[1.75rem] tracking-wide text-(--brown)">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={`${to("/")}${href}`} onClick={(e) => goToSection(e, href)} className="block py-5">
                  {t(label)}
                </a>
                <svg className="block w-full h-1.5 text-(--pencilLine)" viewBox="0 0 1000 6" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d={MAIN_STROKE}
                    filter="url(#navbar-pencil-grain)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-3xl px-5 sm:px-10 pt-10 pb-8">
            <Button.Secondary
              onClick={openCv}
            >
              CV
            </Button.Secondary>
          </div>
        </div>

        <svg
          className={`absolute bottom-0 inset-x-0 w-full h-1.5 text-(--pencilLine) pointer-events-none transition-opacity duration-300 ${
            scrolled || isMenuShowing ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 1000 6"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="navbar-pencil-grain" filterUnits="userSpaceOnUse" x="0" y="0" width="1000" height="6">
              <feTurbulence type="fractalNoise" baseFrequency="0.25 1.2" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" result="rough" />
              <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.4" result="grain" />
              <feComposite in="rough" in2="grain" operator="in" />
            </filter>
          </defs>
          <g filter="url(#navbar-pencil-grain)" fill="none" stroke="currentColor" strokeLinecap="round">
            <path d={MAIN_STROKE} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            <path d={SECOND_PASS} strokeWidth="0.9" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
      </nav>
      <div className="h-24" aria-hidden="true" />
    </>
  );
};

export default Navbar;
