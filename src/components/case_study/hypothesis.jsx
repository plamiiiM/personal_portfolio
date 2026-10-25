import React from "react";
import InView from "../global/in_view";
import useLanguage from "../global/use_language";

// Red pencil curves that loop through and around the quote, placed relative to it as in the designs
const CURVES = [
  { src: "/case_study/hypothesis_curve_right.svg", className: "left-[722.5px] top-0" },
  { src: "/case_study/hypothesis_curve_top.svg", className: "left-61 top-[214.3px]" },
  { src: "/case_study/hypothesis_curve_left.svg", className: "-left-19.25 top-90.75" },
];

// The part of the quote offered like an autocomplete suggestion: half there at first, then typed over a letter at a
// time once the quote has come in (.autocomplete-letter). Takes the words as plain text
export const Autocompleted = ({ children }) =>
  [...children].map((letter, index) => (
    <span key={index} className="autocomplete-letter" style={{ "--letter": index }}>
      {letter}
    </span>
  ));

// The hypothesis quote of a case study, centred on the page; the className spaces it from what's above.
// The curves are drawn around the design's line breaks, so the phone layout shows the quote on its own.
// The curves draw in from the top down as one line once they scroll into view (.draw-down), in a box that reaches past
// the figure's sides, where the left curve does; the caption and the quote each ease in once all of them is on the screen
const Hypothesis = ({ className = "", children }) => {
  const { t } = useLanguage();

  return (
    <figure className={`relative mx-auto lg:h-184.25 lg:w-272.75 lg:pt-52 text-center font-poppins ${className}`}>
      <InView className="draw-down absolute inset-y-0 -inset-x-24 hidden lg:block" aria-hidden="true">
        <div className="absolute inset-y-0 inset-x-24">
          {CURVES.map(({ src, className: curveClassName }) => (
            <img key={src} src={src} alt="" className={`absolute max-w-none ${curveClassName}`} />
          ))}
        </div>
      </InView>
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
