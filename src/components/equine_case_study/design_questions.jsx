import React from "react";
import useInView, { inViewClassName } from "../global/use_in_view";
import { rem } from "../global/layout";
import useLanguage from "../global/use_language";

// Timings are from the Figma motion, started once all of the list is on the screen instead of 1.3s into the page:
// each question slides in from its side of the page, then the line on the other side draws in.
// Phones show the questions one under another, numbers first, without the lines
const QUESTIONS = [
  {
    number: 1,
    text: { en: "What can we compare across past activities?", bg: "Какво да сравним между тренировките?" },
    marginTop: 114,
    from: -1009,
    delay: 0.2,
    line: { width: 326, delay: 0.85, className: "relative top-0.5" },
  },
  {
    number: 2,
    text: { en: "Only the last activity, or further back?", bg: "Само последната или и по-старите?" },
    marginTop: 66,
    from: 899,
    delay: 1.7,
    isRight: true,
    line: { width: 326, from: -530, delay: 2.35 },
  },
  {
    number: 3,
    text: { en: "How should riders filter?", bg: "Как да филтрират ездачите?" },
    marginTop: 60,
    from: -652,
    delay: 3.2,
    line: { width: 326, delay: 3.85 },
  },
  {
    number: 4,
    text: { en: "Where in the app does it belong?", bg: "Къде му е мястото в приложението?" },
    marginTop: 85,
    from: 834,
    delay: 4.7,
    isRight: true,
    line: { width: 336, from: -540, delay: 5.35 },
  },
];

const reveal = ({ from = 0, delay, fade, slide }) => ({
  "--reveal-from-x": rem(from),
  "--reveal-delay": `${delay}s`,
  "--reveal-fade": `${fade}s`,
  "--reveal-slide": `${slide}s`,
});

const DesignQuestions = () => {
  const [ref, isInView, isInstant] = useInView({ isWhole: true });
  const { t } = useLanguage();

  return (
    <ol ref={ref} className={`mt-2 lg:mt-0 lg:ml-26 lg:mr-31.75 font-poppins tracking-[0.03em] ${inViewClassName(isInView, isInstant)}`}>
      {QUESTIONS.map(({ number, text, marginTop, from, delay, isRight, line }) => {
        const question = (
          <p className="reveal flex items-center gap-4" style={reveal({ from, delay, fade: 0.2, slide: 0.65 })}>
            <span className={`text-[2rem] lg:text-[3rem] font-extrabold tracking-[0.03em] text-black ${isRight ? "lg:order-last" : ""}`} aria-hidden="true">
              {number}
            </span>
            <span className="text-[1.25rem] lg:text-[2rem] tracking-[0.03em]">{t(text)}</span>
          </p>
        );
        const rule = (
          <span
            className={`reveal h-px bg-black max-lg:hidden ${line.className ?? ""}`}
            style={{ width: rem(line.width), ...reveal({ from: line.from, delay: line.delay, fade: 0.3, slide: 0.3 }) }}
            aria-hidden="true"
          />
        );

        return (
          <li
            key={number}
            className="mt-6 lg:mt-(--question-gap) flex items-center justify-between"
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
  );
};

export default DesignQuestions;
