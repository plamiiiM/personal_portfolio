import React, { useEffect, useRef } from "react";
import ExperienceCard from "./experience_card_component";
import useLanguage from "../global/use_language";
import HandLetteredHeading from "../global/hand_lettered_heading";

// The page is shrunk to fit the screen (ScaleToFit), which shrinks the nav offset and the window height along with it,
// so they're divided by var(--zoom) to stay true to the nav and the window
const NAV_OFFSET = "calc(var(--nav-offset) / var(--zoom, 1))";

// How far the entries have moved up the window: 0 when the frame pins below the nav, --overflow once the last one is in view.
// It's worked out in CSS so it stays in step with the frame while --nav-offset slides
const TRAVELLED = `clamp(0px, var(--scrolled) + ${NAV_OFFSET}, var(--overflow))`;

// Melts the entries into the paper over 80px, only at the edges that still have entries behind them
const FADE_MASK =
  "linear-gradient(transparent, black min(80px, var(--travelled)), black calc(100% - min(80px, var(--overflow) - var(--travelled))), transparent)";

// The section pins and the page scroll carries the entries through the window, then lets go once the last one is in view.
// There's no inner scroll box, so the wheel, keys, touch and the custom scrollbar always move the page
const TimelineExperience = () => {
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const windowRef = useRef(null);
  const listRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const track = trackRef.current;

    // getBoundingClientRect is in screen px, while lengths in here get shrunk, so it's turned back into page px.
    // Rounded on screen so the text never sits on a half pixel and blurs
    const onScroll = () => {
      const zoom = parseFloat(getComputedStyle(track).getPropertyValue("--zoom")) || 1;
      track.style.setProperty("--scrolled", `${Math.round(-track.getBoundingClientRect().top) / zoom}px`);
    };

    // The page gets exactly as much extra height as the entries overflow by, so adding more just makes it hold longer
    // (and if they all fit, it never pins). ResizeObserver also fires once on observe, which does the initial measure
    const observer = new ResizeObserver(() => {
      const overflow = Math.max(0, listRef.current.offsetHeight - windowRef.current.clientHeight);
      track.style.setProperty("--overflow", `${overflow}px`);
      track.style.height = overflow ? `${frameRef.current.offsetHeight + overflow}px` : "";
      onScroll();
    });
    observer.observe(listRef.current);
    observer.observe(windowRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    // Eases --scrolled, so each scroll restarts a glide from wherever the entries are (ease-out, so it never stalls)
    <div ref={trackRef} className="transition-[--scrolled] duration-500 ease-out motion-reduce:transition-none">
      {/* Sticks just below the nav and slides with it (same timing as the nav's own slide).
          It only holds the entries in a screen-high window where the page is zoomed (ScaleToFit): sticky can't pin
          inside a transform, and the phone layout just lists them, so everywhere else the window shows every entry */}
      <div
        ref={frameRef}
        className="sticky in-data-[scaling=zoom]:max-h-[calc(100svh/var(--zoom))] flex flex-col transition-[--nav-offset] duration-300 motion-reduce:transition-none"
        style={{ top: NAV_OFFSET }}
      >
        {/* The word sits 24px below the nav */}
        <HandLetteredHeading
          src="/experience_text.png"
          alt="Experience"
          bgText="Опит"
          imageClassName="w-43.5 lg:w-72.5"
          className="-rotate-4 mt-6 mb-11 lg:mb-18"
        />

        <div
          ref={windowRef}
          className="relative min-h-0 overflow-clip"
          style={{ "--travelled": TRAVELLED, maskImage: FADE_MASK }}
        >
          <div className="absolute left-4.5 top-4 bottom-0 w-1 rounded-full bg-black" />

          <div ref={listRef} className="pl-12 pt-15 pb-12 lg:pb-20 flex flex-col gap-y-12 lg:gap-y-20 translate-y-[calc(-1*var(--travelled))] will-change-transform">
            <ExperienceCard
              year="2026"
              role="ICT & Media Design"
              company="Fontys University of Applied Sciences"
              date={t({ en: "Sept 2023 - Jan 2027", bg: "септ. 2023 – ян. 2027" })}
              sentence={t({ en: "Currently obtaining a Bachelor's degree in", bg: "В момента следвам бакалавърска програма по" })}
              at={t({ en: "at", bg: "във" })}
            />
            <ExperienceCard
              date={t({ en: "Sept 25- Jan 26", bg: "септ. 2025 – ян. 2026" })}
              year="2025"
              sentence={t({ en: "Completed an internship as a", bg: "Завърших стаж като" })}
              role={t({ en: "UX/ UI Designer", bg: "UX/UI дизайнер" })}
              at={t({ en: "at", bg: "в" })}
              company="Spinnov"
              nameEmployer="Chris Heger"
              positionEmployer="COO"
              imageOfEmployer="/chris_photo.jpeg"
              recommendation={t({
                en: "Plamena did her internship with us (Spinnov) as an UI/UX designer and front-end software developer. She worked very structured and with great discipline, open to feedback, good tempo in her work and not afraid to take on different design challenges. She worked well in our project team and functioned as a full team member despite being an intern.",
                bg: "Пламена проведе стажа си при нас (Spinnov) като UI/UX дизайнер и front-end разработчик. Работеше много структурирано и с голяма дисциплина, беше отворена към обратна връзка, поддържаше добро темпо и не се страхуваше да поема различни дизайн предизвикателства. Работеше добре в проектния ни екип и беше пълноценен член на екипа, въпреки че беше стажантка.",
              })}
              showRecommendation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExperience;
