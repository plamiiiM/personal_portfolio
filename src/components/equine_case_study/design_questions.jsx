import React, { useLayoutEffect, useRef, useState } from "react";
import { rem } from "../global/layout";
import useLanguage from "../global/use_language";
import usePinnedSteps from "./use_pinned_steps";

// Timings are from the Figma motion, each question's started by the scroll reaching it instead of one after another:
// the question slides in from its side of the page, then the line on the other side draws in.
// Phones show the questions one under another, numbers first, without the lines
const QUESTIONS = [
  {
    number: 1,
    text: { en: "What can we compare across past activities?", bg: "Какво да сравним между тренировките?" },
    marginTop: 114,
    from: -1009,
    line: { width: 326, className: "relative top-0.5" },
  },
  {
    number: 2,
    text: { en: "Only the last activity, or further back?", bg: "Само последната или и по-старите?" },
    marginTop: 66,
    from: 899,
    isRight: true,
    line: { width: 326, from: -530 },
  },
  {
    number: 3,
    text: { en: "How should riders filter?", bg: "Как да филтрират ездачите?" },
    marginTop: 60,
    from: -652,
    line: { width: 326 },
  },
  {
    number: 4,
    text: { en: "Where in the app does it belong?", bg: "Къде му е мястото в приложението?" },
    marginTop: 85,
    from: 834,
    isRight: true,
    line: { width: 336, from: -540 },
  },
];

// The line starts drawing this long after its question starts sliding in
const LINE_DELAY = 0.65;

const reveal = ({ from = 0, delay = 0, fade, slide }) => ({
  "--reveal-from-x": rem(from),
  "--reveal-delay": `${delay}s`,
  "--reveal-fade": `${fade}s`,
  "--reveal-slide": `${slide}s`,
});

// The four questions. Like the attachment drivers, the title and the list stay pinned in the window for a stretch of
// scrolling, and the questions come in one after another as it goes on. Once in, a question stays, scrolling back up too.
// The first step is the title on its own, so the first question comes in once the list has pinned.
// With all of them in, the list unpins and the scrolling it took is let go of, so the page scrolls on (and back up past
// it) as usual: the room shrinks back to the list, and the page is scrolled up as much, so nothing moves on the screen
const DesignQuestions = ({ title, className = "" }) => {
  const { roomRef, stageRef, step } = usePinnedSteps(QUESTIONS.length + 1);
  const [shownUpTo, setShownUpTo] = useState(0);
  if (step > shownUpTo) setShownUpTo(step);
  const spacerRef = useRef(null);
  const { t } = useLanguage();

  // How far down its room the list has been carried is measured while it's still pinned, then taken off the scroll
  // as the room shrinks (instantly, as the page otherwise scrolls smoothly)
  useLayoutEffect(() => {
    const spacer = spacerRef.current;
    if (shownUpTo < QUESTIONS.length || spacer.hidden) return;
    const carriedDown = stageRef.current.getBoundingClientRect().top - roomRef.current.getBoundingClientRect().top;
    spacer.hidden = true;
    window.scrollBy({ top: -carriedDown, behavior: "instant" });
  }, [shownUpTo, roomRef, stageRef]);

  // The stage is pinned just under the nav, and on wider screens in the middle of the window where there's room.
  // Lengths in the shrunk page are divided by --zoom to stay true to the screen (see ScaleToFit)
  return (
    <div ref={roomRef} className={className}>
      <div
        ref={stageRef}
        className="sticky top-[calc((var(--nav-offset)+1rem)/var(--zoom))]
                   lg:top-[max(calc((var(--nav-offset)+1rem)/var(--zoom)),calc(50vh/var(--zoom)-22rem))]
                   in-data-[scaling=transform]:static"
      >
        {title}
        <ol className="mt-2 lg:mt-0 lg:ml-26 lg:mr-31.75 font-poppins tracking-[0.03em]">
          {QUESTIONS.map(({ number, text, marginTop, from, isRight, line }) => {
            const question = (
              <p className="reveal flex items-center gap-4" style={reveal({ from, fade: 0.2, slide: 0.65 })}>
                <span className={`text-[2rem] lg:text-[3rem] font-extrabold tracking-[0.03em] text-black ${isRight ? "lg:order-last" : ""}`} aria-hidden="true">
                  {number}
                </span>
                <span className="text-[1.25rem] lg:text-[2rem] tracking-[0.03em]">{t(text)}</span>
              </p>
            );
            const rule = (
              <span
                className={`reveal h-px bg-black max-lg:hidden ${line.className ?? ""}`}
                style={{ width: rem(line.width), ...reveal({ from: line.from, delay: LINE_DELAY, fade: 0.3, slide: 0.3 }) }}
                aria-hidden="true"
              />
            );

            return (
              <li
                key={number}
                className={`mt-6 lg:mt-(--question-gap) flex items-center justify-between ${number <= shownUpTo ? "in-view" : ""}`}
                style={{ "--question-gap": rem(marginTop) }}
              >
                {isRight ? (
                  <>
                    {rule}
                    {question}
                  </>
                ) : (
                  <>
                    {question}
                    {rule}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* The scrolling the questions come in over while the stage is pinned. Without it the stage has nowhere to
          move, so it scrolls along with the page */}
      <div ref={spacerRef} className="h-[calc(140vh/var(--zoom))] in-data-[scaling=transform]:hidden" aria-hidden="true" />
    </div>
  );
};

export default DesignQuestions;
