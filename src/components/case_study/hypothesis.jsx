import React, { useEffect, useRef } from "react";
import InView from "../global/in_view";
import useLanguage from "../global/use_language";

// Red pencil curves that loop through and around the quote, placed relative to it as in the designs. They're drawn one
// after another like one pencil line, each over its share of --drawn (from, to): the right one from the top down, then
// the top one from its right end, then the left one down to the bottom
const CURVES = [
  {
    d: "M66.3001 637.849C66.3001 637.849 16.2037 625.04 66.3001 541.237C116.397 457.433 390.833 77.3044 339.5 17.8488C288.167 -41.6069 124.076 66.0415 1 188.349",
    width: 346.867,
    height: 638.849,
    className: "left-[722.5px] top-0",
    from: 0,
    to: 0.55,
  },
  {
    d: "M1.00005 1.00016C39.0001 50.5002 74.6752 51.076 112.5 53.5002C150.325 55.9243 225.898 33.0318 280.266 1.00016",
    width: 281.266,
    height: 54.676,
    className: "left-61 top-[214.3px]",
    from: 0.55,
    to: 0.7,
    isBackwards: true,
  },
  {
    d: "M287.558 372.5C277.601 348.861 283.151 298.561 243.854 290.28C204.558 282 128.399 352.081 47.8993 304.437C-32.6007 256.792 0.0577357 44.0002 74.0582 1.00016",
    width: 288.558,
    height: 373.5,
    className: "-left-19.25 top-90.75",
    from: 0.7,
    to: 1,
  },
];

// Where in the window the pencil is: the line is drawn down to this far down the window, as a share of its height
const PEN = 0.7;
// The autocompleted words are typed over from when the quote's bottom is this far down the window, over this much of
// it scrolled
const FILL_FROM = 0.85;
const FILL_OVER = 0.35;

const clamp = (value) => Math.min(1, Math.max(0, value));

// The part of the quote offered like an autocomplete suggestion: half there at first, then typed over a letter at a
// time as the page is scrolled (.autocomplete-letter). Takes the words as plain text
export const Autocompleted = ({ children }) => {
  const letters = [...children];
  return letters.map((letter, index) => (
    <span key={index} className="autocomplete-letter" style={{ "--letter": index, "--letters": letters.length }}>
      {letter}
    </span>
  ));
};

// The hypothesis quote of a case study, centred on the page; the className spaces it from what's above.
// The curves are drawn around the design's line breaks, so the phone layout shows the quote on its own.
// The scroll draws the curves (.drawn-curve) and types over the autocompleted words: --drawn and --filled go from 0 to
// 1 with it. Like the rest of the page, they only go forward: scrolling back up leaves them as far as they got.
// Once the page glides on to it (a "glide" event, see usePinnedSteps), all of it plays in on the way: drawn and typed
// over as it rises from the bottom of the window (or from where it was, if it's already peeking in) to where the glide
// leaves it.
// The caption and the quote each ease in once all of them is on the screen
const Hypothesis = ({ className = "", children }) => {
  const figureRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const figure = figureRef.current;
    const quote = figure.querySelector("blockquote");
    let drawn = 0;
    let filled = 0;
    // Once the page glides on to it, where its top sets off from and comes to rest (screen px down the window)
    let glide = null;
    let frame;

    const update = () => {
      frame = null;
      const height = window.innerHeight;
      const figureBox = figure.getBoundingClientRect();
      const quoteBox = quote.getBoundingClientRect();
      // How far its top has risen through the glide
      const played = glide ? clamp((glide.from - figureBox.top) / Math.max(1, glide.from - glide.restsAt)) : 0;
      drawn = Math.max(drawn, played, clamp((height * PEN - figureBox.top) / figureBox.height));
      filled = Math.max(filled, played, clamp((height * FILL_FROM - quoteBox.bottom) / (height * FILL_OVER)));
      figure.style.setProperty("--drawn", drawn);
      figure.style.setProperty("--filled", filled);
    };
    const onScroll = () => {
      frame ??= requestAnimationFrame(update);
    };
    const onGlide = (e) => {
      glide = { from: Math.min(window.innerHeight, figure.getBoundingClientRect().top), restsAt: e.detail.top };
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    figure.addEventListener("glide", onGlide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      figure.removeEventListener("glide", onGlide);
    };
  }, []);

  return (
    <figure ref={figureRef} className={`relative mx-auto lg:h-184.25 lg:w-272.75 lg:pt-52 text-center font-poppins ${className}`}>
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        {CURVES.map(({ d, width, height, className: curveClassName, from, to, isBackwards }) => (
          <svg key={d} width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className={`absolute overflow-visible ${curveClassName}`}>
            <path
              d={d}
              transform={`matrix(1 0 0 -1 0 ${height})`}
              pathLength="1"
              stroke="#E31D1D"
              strokeWidth="2"
              strokeLinecap="round"
              className="drawn-curve"
              style={{ "--from": from, "--to": to, "--direction": isBackwards ? -1 : 1 }}
            />
          </svg>
        ))}
      </div>
      <InView as="figcaption" isWhole className="soft-in relative text-[1.125rem] lg:text-[1.25rem] font-light italic tracking-[0.03em]">
        {t({ en: "Hypothesis", bg: "Хипотеза" })}
      </InView>
      <InView
        as="blockquote"
        isWhole
        className="soft-in relative mt-3 lg:mt-7.5 text-[1.375rem] lg:text-[2rem] font-semibold italic tracking-[0.03em] text-pretty"
      >
        {children}
      </InView>
    </figure>
  );
};

export default Hypothesis;
