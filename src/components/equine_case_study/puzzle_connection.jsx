import React from "react";
import useInView from "../global/use_in_view";
import FitToWidth from "../global/fit_to_width";
import { place, rem } from "../global/layout";
import useLanguage from "../global/use_language";

// Sparks burst from where the pieces click, cycling through three looks and three start times.
// Each flies from (x0, y0) to (x1, y1) away from its spot, in Figma px
const SPARK_LOOKS = [
  { w: 5, h: 19, color: "#f0291f" },
  { w: 4, h: 12, color: "#ffa12e" },
  { w: 4, h: 12, color: "#fa5c38" },
];
const SPARK_DELAYS = ["1.5648s", "1.5904s", "1.6152s"];
const SPARKS = [
  { x: 500, y: 266, w: 19, h: 5, x0: 41, y0: 0, x1: 90, y1: 14 },
  { x: 500, y: 267.4, w: 12.547, h: 8.81, x0: 36.94, y0: 17.789, x1: 100.909, y1: 62.595 },
  { x: 500, y: 268.51, w: 10.609, h: 11.876, x0: 25.563, y0: 32.055, x1: 83.548, y1: 118.765 },
  { x: 500, y: 269.89, w: 9.103, h: 19.636, x0: 9.123, y0: 39.972, x1: 34.713, y1: 166.089 },
  { x: 497.33, y: 271, w: 6.57, h: 12.589, x0: -9.123, y0: 39.972, x1: -20.027, y1: 101.744 },
  { x: 492.52, y: 271, w: 10.609, h: 11.876, x0: -25.563, y0: 32.055, x1: -69.831, y1: 101.565 },
  { x: 482.88, y: 271, w: 19.288, h: 12.749, x0: -36.94, y0: 17.789, x1: -120.73, y1: 72.14 },
  { x: 488, y: 271, w: 12, h: 4, x0: -41, y0: 0, x1: -156, y1: 14 },
  { x: 487.45, y: 265.79, w: 12.547, h: 8.81, x0: -36.94, y0: -17.789, x1: -81.087, y1: -25.05 },
  { x: 484.24, y: 256.15, w: 15.755, h: 17.972, x0: -25.563, y0: -32.055, x1: -69.831, y1: -73.565 },
  { x: 493.43, y: 259.3, w: 6.57, h: 12.589, x0: -9.123, y0: -39.972, x1: -29.818, y1: -116.64 },
  { x: 496.1, y: 258.41, w: 6.57, h: 12.589, x0: 9.123, y0: -39.972, x1: 34.713, y1: -138.089 },
  { x: 496.09, y: 253.03, w: 15.755, h: 17.972, x0: 25.563, y0: -32.055, x1: 56.114, y1: -56.365 },
  { x: 498.26, y: 262.19, w: 12.547, h: 8.81, x0: 36.94, y0: -17.789, x1: 100.909, y1: -34.595 },
];

// The pieces are held at an angle, so each hand's box is the bounding box of its turned picture
const HANDS = [
  {
    src: "/equine/puzzle_left_hand.webp",
    alt: { en: "A hand bringing in a red puzzle piece", bg: "Ръка, която носи червено парче от пъзел" },
    box: { x: 18.84, y: -25.6, w: 613.395, h: 565.201 },
    picture: { w: 521.25, h: 325, rotate: 35 },
    dir: 1,
  },
  {
    src: "/equine/puzzle_right_hand.webp",
    alt: { en: "Another hand fitting the matching piece into it", bg: "Друга ръка, която наглася съвпадащото парче към него" },
    box: { x: 425.9, y: 134.9, w: 437.276, h: 370.526 },
    picture: { w: 405, h: 330, rotate: -6 },
    dir: -1,
  },
];

// Two hands slide in and click their puzzle pieces together once it scrolls into view (see .puzzle-* in index.css).
// On phones it's centred and shrunk to the column
const PuzzleConnection = ({ className = "" }) => {
  const [ref, isInView] = useInView();
  const { t } = useLanguage();

  return (
    <FitToWidth className={`max-lg:mx-auto ${className}`}>
      <div
        ref={ref}
        className={`relative ${isInView ? "in-view" : ""}`}
        style={{ width: rem(1000), height: rem(505) }}
      >
        {HANDS.map(({ src, alt, box, picture, dir }) => (
          <div
            key={src}
            className="puzzle-hand absolute flex items-center justify-center"
            style={{ ...place(box), "--hand-dir": dir }}
          >
            <img
              src={src}
              alt={t(alt)}
              loading="lazy"
              decoding="async"
              className="max-w-none flex-none object-contain"
              style={{ width: rem(picture.w), height: rem(picture.h), rotate: `${picture.rotate}deg` }}
            />
          </div>
        ))}

        {SPARKS.map(({ x0, y0, x1, y1, ...box }, index) => {
          const { w, h, color } = SPARK_LOOKS[index % 3];
          return (
            <div
              key={index}
              className="puzzle-spark absolute flex items-center justify-center"
              style={{ ...place(box), "--x0": x0, "--y0": y0, "--x1": x1, "--y1": y1, "--spark-delay": SPARK_DELAYS[index % 3] }}
              aria-hidden="true"
            >
              <div
                className="flex-none rounded-[2px]"
                style={{ width: rem(w), height: rem(h), backgroundColor: color, rotate: `${-90 + (index * 180) / 7}deg` }}
              />
            </div>
          );
        })}

        <div
          className="puzzle-halo absolute rounded-full border-2 border-[#f75229]"
          style={place({ x: 464, y: 235, w: 72, h: 72 })}
          aria-hidden="true"
        />
      </div>
    </FitToWidth>
  );
};

export default PuzzleConnection;
