import React from "react";
import useLanguage from "../global/use_language";

// Red pencil curves that loop through and around the quote, placed relative to it as in the designs
const CURVES = [
  { src: "/case_study/hypothesis_curve_right.svg", className: "left-[722.5px] top-0" },
  { src: "/case_study/hypothesis_curve_top.svg", className: "left-61 top-[214.3px]" },
  { src: "/case_study/hypothesis_curve_left.svg", className: "-left-19.25 top-90.75" },
];

// The hypothesis quote of a case study, centred on the page; the className spaces it from what's above.
// The curves are drawn around the design's line breaks, so the phone layout shows the quote on its own
const Hypothesis = ({ className = "", children }) => {
  const { t } = useLanguage();

  return (
    <figure className={`relative mx-auto lg:h-184.25 lg:w-272.75 lg:pt-52 text-center font-poppins ${className}`}>
      {CURVES.map(({ src, className: curveClassName }) => (
        <img key={src} src={src} alt="" className={`absolute hidden lg:block max-w-none ${curveClassName}`} />
      ))}
      <figcaption className="relative text-[1.125rem] lg:text-[1.25rem] font-light italic tracking-[0.03em]">
        {t({ en: "Hypothesis", bg: "Хипотеза" })}
      </figcaption>
      <blockquote className="relative mt-3 lg:mt-7.5 text-[1.375rem] lg:text-[2rem] font-semibold italic tracking-[0.03em] text-pretty">
        {children}
      </blockquote>
    </figure>
  );
};

export default Hypothesis;
