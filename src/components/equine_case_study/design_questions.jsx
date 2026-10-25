import React from "react";
import useInView from "../global/use_in_view";
import { rem } from "../global/layout";

// Timings are from the Figma motion, started as the list scrolls into view instead of 1.3s into the page:
// each question slides in from its side of the page, then the line on the other side draws in.
// Phones show the questions one under another, numbers first, without the lines
const QUESTIONS = [
  {
    number: 1,
    text: "What can we compare across past activities?",
    marginTop: 114,
    from: -1009,
    delay: 0.2,
    line: { width: 326, delay: 0.85, className: "relative top-0.5" },
  },
  {
    number: 2,
    text: "Only the last activity, or further back?",
    marginTop: 66,
    from: 899,
    delay: 1.7,
    isRight: true,
    line: { width: 326, from: -530, delay: 2.35 },
  },
  {
    number: 3,
    text: "How should riders filter?",
    marginTop: 60,
    from: -652,
    delay: 3.2,
    line: { width: 326, delay: 3.85 },
  },
  {
    number: 4,
    text: "Where in the app does it belong?",
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
  const [ref, isInView] = useInView();

  return (
    <ol ref={ref} className={`mt-2 lg:mt-0 lg:ml-26 lg:mr-31.75 font-[poppins] tracking-[0.03em] ${isInView ? "in-view" : ""}`}>
      {QUESTIONS.map(({ number, text, marginTop, from, delay, isRight, line }) => {
        const question = (
          <p className="reveal flex items-center gap-4" style={reveal({ from, delay, fade: 0.2, slide: 0.65 })}>
            <span className={`text-[2rem] lg:text-[3rem] font-extrabold tracking-[0.03em] text-black ${isRight ? "lg:order-last" : ""}`} aria-hidden="true">
              {number}
            </span>
            <span className="text-[1.25rem] lg:text-[2rem] tracking-[0.03em]">{text}</span>
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
