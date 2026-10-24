import React from "react";

// Red pencil curves that loop through and around the quote, placed relative to it as in the design
const CURVES = [
  { src: "/smartnet/hypothesis_curve_right.svg", className: "left-[722.5px] top-0" },
  { src: "/smartnet/hypothesis_curve_top.svg", className: "left-61 top-[214.3px]" },
  { src: "/smartnet/hypothesis_curve_left.svg", className: "-left-19.25 top-90.75" },
];

// Centred on the page (the design has it 37.5px right of centre)
const HypothesisSection = () => {
  return (
    <figure className="relative mx-auto mt-20 h-184.25 w-272.75 pt-52 text-center font-[poppins]">
      {CURVES.map(({ src, className }) => (
        <img key={src} src={src} alt="" className={`absolute max-w-none ${className}`} />
      ))}
      <figcaption className="relative text-[1.25rem] font-light italic tracking-[0.03em]">Hypothesis</figcaption>
      <blockquote className="relative mt-7.5 text-[2rem] font-semibold italic tracking-[0.03em] text-pretty">
        “If accuracy drills become leveled games, with difficulty tuned by shot metrics, players will want to replay
        them and unlock the next level, and every game will produce data that shows how their accuracy improves.”
      </blockquote>
    </figure>
  );
};

export default HypothesisSection;
