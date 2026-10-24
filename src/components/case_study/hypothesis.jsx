import React from "react";

// Red pencil curves that loop through and around the quote, placed relative to it as in the designs
const CURVES = [
  { src: "/case_study/hypothesis_curve_right.svg", className: "left-[722.5px] top-0" },
  { src: "/case_study/hypothesis_curve_top.svg", className: "left-61 top-[214.3px]" },
  { src: "/case_study/hypothesis_curve_left.svg", className: "-left-19.25 top-90.75" },
];

// The hypothesis quote of a case study, centred on the page; the className spaces it from what's above
const Hypothesis = ({ className = "", children }) => {
  return (
    <figure className={`relative mx-auto h-184.25 w-272.75 pt-52 text-center font-[poppins] ${className}`}>
      {CURVES.map(({ src, className: curveClassName }) => (
        <img key={src} src={src} alt="" className={`absolute max-w-none ${curveClassName}`} />
      ))}
      <figcaption className="relative text-[1.25rem] font-light italic tracking-[0.03em]">Hypothesis</figcaption>
      <blockquote className="relative mt-7.5 text-[2rem] font-semibold italic tracking-[0.03em] text-pretty">
        {children}
      </blockquote>
    </figure>
  );
};

export default Hypothesis;
