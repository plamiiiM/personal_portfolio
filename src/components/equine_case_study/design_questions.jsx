import React, { useState } from "react";
import { rem } from "../global/layout";
import useLanguage from "../global/use_language";
import usePinnedSteps from "./use_pinned_steps";

// Each question comes in with its line as one row, started by the scroll reaching it: a question on the left slides in
// left to right, one on the right right to left. Phones show the questions one under another, numbers first, without
// the lines, so there they all slide in from the left
const QUESTIONS = [
  {
    number: 1,
    text: { en: "What can we compare across past activities?", bg: "Какво да сравним между тренировките?" },
    marginTop: 114,
    line: { width: 326, className: "relative top-0.5" },
  },
  {
    number: 2,
    text: { en: "Only the last activity, or further back?", bg: "Само последната или и по-старите?" },
    marginTop: 66,
    isRight: true,
    line: { width: 326 },
  },
  {
    number: 3,
    text: { en: "How should riders filter?", bg: "Как да филтрират ездачите?" },
    marginTop: 60,
    line: { width: 326 },
  },
  {
    number: 4,
    text: { en: "Where in the app does it belong?", bg: "Къде му е мястото в приложението?" },
    marginTop: 85,
    isRight: true,
    line: { width: 336 },
  },
];

// How far a row slides in from (Figma px), and how long it takes
const SLIDE_FROM = 180;
const FADE = 0.45;
const SLIDE = 0.7;
// Questions the scroll gets to at once, with a quick turn of the wheel, still come in one after another, this far apart
const STAGGER = 0.3;

// The four questions. Like the attachment drivers, the title and the list stay pinned in the window for a stretch of
// scrolling, and the questions come in one after another as it goes on, one per scroll gesture however strong (the one
// that brings the list in brings in the first). Once in, a question stays, scrolling back up too.
// The first step is the title on its own, so the first question comes in once the list has pinned.
// Once all of them have been seen there's nothing left to pin for, so the list lets go of the scrolling it took, as soon
// as it can without the page jumping (usePinnedSteps), and the page scrolls past it as usual, both ways. A strong
// scroll moving on from it still stops at the puzzle that comes next, rather than carrying the page on past it
const DesignQuestions = ({ title, className = "" }) => {
  // Up to which question is in, and up to which one was in before the latest ones came
  const [{ shownUpTo, shownBefore }, setShown] = useState({ shownUpTo: 0, shownBefore: 0 });
  const { roomRef, stageRef, spacerRef, step } = usePinnedSteps(QUESTIONS.length + 1, {
    stepsByGesture: true,
    firstStepOnEntry: true,
    stopsAtNext: true,
    isDone: shownUpTo === QUESTIONS.length,
  });
  if (step > shownUpTo) setShown({ shownUpTo: step, shownBefore: shownUpTo });
  const { t } = useLanguage();

  // The stage is pinned just under the nav, and on wider screens in the middle of the window where there's room. In the
  // page shrunk with a transform it's carried down its room by hand instead (see usePinnedSteps), so it's static there.
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
          {QUESTIONS.map(({ number, text, marginTop, isRight, line }) => {
            const question = (
              <p className="flex items-center gap-4">
                <span className={`text-[2rem] lg:text-[3rem] font-extrabold tracking-[0.03em] text-black ${isRight ? "lg:order-last" : ""}`} aria-hidden="true">
                  {number}
                </span>
                <span className="text-[1.25rem] lg:text-[2rem] tracking-[0.03em]">{t(text)}</span>
              </p>
            );
            const rule = (
              <span
                className={`h-px bg-black max-lg:hidden ${line.className ?? ""}`}
                style={{ width: rem(line.width) }}
                aria-hidden="true"
              />
            );

            return (
              <li
                key={number}
                className={`mt-6 lg:mt-(--question-gap) ${number <= shownUpTo ? "in-view" : ""}`}
                style={{ "--question-gap": rem(marginTop) }}
              >
                <div
                  className={`reveal flex items-center justify-between [--reveal-from-x:var(--from-left)] ${isRight ? "lg:[--reveal-from-x:var(--from-right)]" : ""}`}
                  style={{
                    "--from-left": rem(-SLIDE_FROM),
                    "--from-right": rem(SLIDE_FROM),
                    "--reveal-delay": `${number > shownBefore ? (number - shownBefore - 1) * STAGGER : 0}s`,
                    "--reveal-fade": `${FADE}s`,
                    "--reveal-slide": `${SLIDE}s`,
                  }}
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
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* The scrolling the questions come in over while the stage is pinned. Without it the stage has nowhere to
          move, so it scrolls along with the page */}
      <div ref={spacerRef} className="h-[calc(140svh/var(--zoom))]" aria-hidden="true" />
    </div>
  );
};

export default DesignQuestions;
