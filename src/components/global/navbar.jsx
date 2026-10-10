import { useEffect, useState } from "react";
import Button from "./buttons";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Strategy", href: "#strategy" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const NAV_HEIGHT = 96; // h-24
const LANDING_GAP = 24; // space left above a section after jumping to it

// The nav hides while scrolling down and comes back when scrolling up,
// so only leave room for it when the jump goes up the page
const scrollToSection = (e, href) => {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  // Honour scroll-margin-top so a target can fine-tune where it lands (e.g. -scroll-mt-16)
  const top =
    target.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(target).scrollMarginTop);
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);
  const [hidden, setHidden] = useState(false);

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

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 h-24 px-28 flex items-center justify-between isolate overflow-hidden bg-(--bg)
                    transition-transform duration-300 motion-reduce:transition-none has-focus-visible:translate-y-0 ${
                      hidden ? "-translate-y-full" : "translate-y-0"
                    }`}
      >
        <div
          className="absolute top-0 left-0 w-screen h-screen -z-10 pointer-events-none
                     bg-[url('/white_texture_paper.webp')] bg-cover bg-center
                     opacity-75 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 w-screen h-screen -z-10 pointer-events-none
                     bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5)_0%,transparent_30%)]"
          aria-hidden="true"
        />

        <a href="#" aria-label="Back to top">
          <img src="/nav_logo.png" alt="Plamena Mincheva logo" className="h-16 w-auto mix-blend-multiply" />
        </a>

        <div className="flex items-center gap-x-14">
          <ul className="flex items-center gap-x-10 font-[poppins] text-[1rem] tracking-wide text-(--brown)">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => scrollToSection(e, href)}
                  className="relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0
                             after:w-full after:h-px after:bg-(--pencilLine)
                             after:origin-left after:scale-x-0 after:transition-transform after:duration-300
                             hover:after:scale-x-100"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <Button.Secondary
            onClick={() => window.open("/Plamena Mincheva- UI-UX designer and developer.pdf")}
          >
            CV
          </Button.Secondary>
        </div>

        <svg
          className={`absolute bottom-0 inset-x-0 w-full h-1.5 text-(--pencilLine) pointer-events-none transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
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
