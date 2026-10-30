import React from "react";
import Collage from "../case_study/collage";
import useLanguage from "../global/use_language";
import usePinnedSteps from "./use_pinned_steps";

const chalkLabel = (text, { fontSize = "2rem", ...box }) => ({
  ...box,
  content: (
    <p className="font-plamenas tracking-[0.03em] whitespace-nowrap text-[#ebe6e6]" style={{ fontSize }}>
      {text}
    </p>
  ),
});

// The Bulgarian moods are longer words, so they're written smaller and end where the English ones do,
// clear of the horse and the edge of the board
const BG_CHALK = { fontSize: "1.5rem", h: 40 };

// The smaller chalk board of the last two drivers is centred where the first one sits
const SMALL_BOARD = { src: "/equine/chalkboard.webp", x: 10.16, y: 7.05, w: 612.07, h: 424.66 };

// The three drivers of attachment. The title, the list and the chalk board stay pinned in the window, all of them fitted
// into it, until the reader has scrolled through every driver, on every screen and by touch too: the drivers open one
// after another as the page scrolls, one per scroll gesture however big, the open one's description unfolding under it
// and its drawing fading in on the board. Picking one scrolls to it. Once the reader has scrolled on past the last
// driver they let go of the pin, so scrolling back up goes past them as usual, with the last driver left open
const AttachmentDrivers = ({ title, className = "" }) => {
  const { roomRef, stageRef, spacerRef, contentRef, step: activeIndex, goTo } = usePinnedSteps(3, {
    fitsWindow: true,
    stepsByGesture: true,
    letsGoPastEnd: true,
  });
  const { t } = useLanguage();

  const drivers = [
    {
      name: t({ en: "Anthropomorphism", bg: "Антропоморфизъм" }),
      description: t({
        en: "People respond with empathy to anything that shows human-like emotion.",
        bg: "Хората реагират със съпричастност към всичко, което проявява човешки емоции.",
      }),
      visual: [
        { src: "/equine/chalkboard_anthropomorphism.webp" },
        {
          src: "/equine/cartoon_horse.webp",
          alt: t({
            en: "Chalk cartoon of a smiling horse, with the moods it can show",
            bg: "Усмихнато анимационно конче с тебешир и настроенията, които може да показва",
          }),
          x: 364,
          y: 89.44,
          w: 182.17,
          h: 220.5,
        },
        chalkLabel(
          t({ en: "Tired", bg: "Уморен" }),
          t({ en: { x: 329, y: 135.44, w: 65, h: 48 }, bg: { ...BG_CHALK, x: 316, y: 140, w: 78 } }),
        ),
        chalkLabel(t({ en: "Sad", bg: "Тъжен" }), t({ en: { x: 538, y: 219, w: 45, h: 48 }, bg: { ...BG_CHALK, x: 529, y: 224, w: 64 } })),
        chalkLabel(t({ en: "Happy", bg: "Щастлив" }), t({ en: { x: 334, y: 284.44, w: 76, h: 48 }, bg: { ...BG_CHALK, x: 330, y: 289, w: 86 } })),
        {
          src: "/equine/real_horse.webp",
          alt: t({
            en: "Chalk drawing of a real horse’s head, with an arrow to its cartoon",
            bg: "Рисунка с тебешир на глава на истински кон със стрелка към анимационното му копие",
          }),
          x: 102,
          y: 81,
          w: 163,
          h: 267,
        },
        { src: "/equine/arrow_line.svg", x: 224, y: 211.32, w: 143.5, h: 7.36 },
      ],
    },
    {
      name: t({ en: "Responsibility", bg: "Отговорност" }),
      description: t({
        en: "Caring for something gives people a reason to come back.",
        bg: "Грижата за нещо дава на хората причина да се връщат.",
      }),
      visual: [
        SMALL_BOARD,
        {
          src: "/equine/responsibility_visual.webp",
          alt: t({
            en: "Chalk drawing of a rider leaning her head against the cartoon horse, with a heart above them",
            bg: "Рисунка с тебешир на ездачка, облегнала глава на анимационното конче, със сърце над тях",
          }),
          x: 155.87,
          y: 78.47,
          w: 327,
          h: 281,
        },
      ],
    },
    {
      name: t({ en: "Reinforcement", bg: "Подкрепление" }),
      description: t({
        en: "Small, regular rewards strengthen the bond over time.",
        bg: "Малките, редовни награди укрепват връзката с времето.",
      }),
      visual: [
        SMALL_BOARD,
        { src: "/equine/reinforcement_horse.webp", x: 376.16, y: 66.05, w: 139.81, h: 169.24 },
        {
          src: "/equine/reinforcement_visual.webp",
          alt: t({
            en: "Chalk drawing of the achievements card with a rosette, peeked at by the cartoon horse",
            bg: "Рисунка с тебешир на картата с постижения с розетка, към която наднича анимационното конче",
          }),
          x: 128.16,
          y: 159.05,
          w: 343,
          h: 151,
        },
      ],
    },
  ];

  // The stage is pinned just under the nav, and on wider screens in the middle of the window where there's room
  // (--stage-height is its fitted height, set by usePinnedSteps). In the page shrunk with a transform it's carried down
  // its room by hand instead, so it's static there.
  // Lengths in the shrunk page are divided by --zoom to stay true to the screen (see ScaleToFit).
  // A description opening changes the stage's height, so the browser isn't to keep the page in place around it
  // (overflow-anchor): it would nudge the scroll, and the nav takes a nudge up for scrolling up and slides in
  return (
    <div ref={roomRef} className={`[overflow-anchor:none] ${className}`}>
      <div
        ref={stageRef}
        className="sticky top-[calc((var(--nav-offset)+1rem)/var(--zoom))]
                   lg:top-[max(calc((var(--nav-offset)+1rem)/var(--zoom)),calc(50svh/var(--zoom)-var(--stage-height,42rem)/2))]
                   in-data-[scaling=transform]:static"
      >
        {/* Shrunk from its top middle to fit the window */}
        <div ref={contentRef} className="origin-top">
          {title}
          <div className="mt-6 lg:mt-22.25 flex flex-col lg:flex-row lg:items-start">
            <ul className="lg:ml-57.25 lg:mt-15 flex lg:w-85.75 flex-col gap-y-3 lg:gap-y-8.5 font-poppins tracking-[0.03em]">
              {drivers.map(({ name }, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={name} className="relative">
                    {/* Pencil mark beside the open driver */}
                    <span
                      className={`absolute -left-4 top-1 h-11 lg:-left-6.75 lg:top-2.25 lg:h-14 w-1 bg-black transition-opacity duration-300
                                  motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0"}`}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => goTo(index)}
                      className={`cursor-pointer text-left text-[1.75rem] lg:text-[2rem] tracking-[0.03em] transition-colors ${
                        isActive ? "font-bold" : "text-[#686868] hover:text-(--textOnLight)"
                      }`}
                    >
                      {name}
                    </button>
                    {/* Unfolds under the open driver. On phones it takes the room of the longest description, so the list
                        (and with it the fitted stage) is the same height whichever driver is open */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <div className="grid overflow-hidden lg:w-61.5 text-[1.125rem] tracking-[0.03em]">
                        {drivers.map((other) => (
                          <p
                            key={other.name}
                            className={`col-start-1 row-start-1 ${other.name === name ? "" : "invisible lg:hidden"}`}
                            aria-hidden={other.name !== name}
                          >
                            {other.description}
                          </p>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Every driver's drawing is on the board, the open one faded in over the others. The one column takes the room
                it's given rather than the board's full size, so on phones the board shrinks to fit it. There it reaches
                into the page's side margins, to be as big as the screen lets it */}
            <div className="grid grid-cols-1 mt-6 max-lg:-mx-5 lg:mt-0 lg:ml-22.5">
              {drivers.map(({ name, visual }, index) => (
                <div
                  key={name}
                  className={`col-start-1 row-start-1 transition-opacity duration-500 motion-reduce:transition-none ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  <Collage width={632.38} height={438.75} items={visual} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The scrolling the drivers take turns over while the stage is pinned, let go of once it's been scrolled past */}
      <div ref={spacerRef} className="h-[calc(150svh/var(--zoom))]" aria-hidden="true" />
    </div>
  );
};

export default AttachmentDrivers;
