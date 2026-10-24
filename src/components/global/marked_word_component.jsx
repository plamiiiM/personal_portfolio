import React from "react";
import useInView from "./use_in_view";

// `isThin` makes the highlight a narrower marker stroke, `highlight` swaps its placement: { className } that sizes it on the words.
// `circle` swaps the pencil circle for another hand-drawn one: { src, className } where the className sizes it around the word.
// `isDrawn` makes the circle draw itself in once it scrolls into view (see .drawn-circle in index.css)
const MarkedWord = ({ isHighlighted, isThin, highlight, isCircled, circle, isDrawn, children }) => {
  const [circleRef, isInView] = useInView({ isEnabled: isDrawn });

  return (
    <span className="relative inline-block whitespace-nowrap">
      {isHighlighted && (
        <img
          src="/highlight.svg"
          alt=""
          className={`absolute max-w-none ${
            highlight?.className ??
            `-left-[0.1em] w-[calc(100%+0.2em)] ${
              isThin ? "top-[calc(50%-0.3em)] h-[0.72em]" : "top-[calc(50%-0.47em)] h-[1.17em]"
            }`
          }`}
        />
      )}
      <span className="relative">{children}</span>
      {isCircled && (
        <img
          ref={circleRef}
          src={circle?.src ?? "/pencil_circle.svg"}
          alt=""
          className={`absolute -translate-x-1/2 -translate-y-1/2 max-w-none pointer-events-none ${
            circle?.className ?? "left-[calc(50%+0.23em)] top-[calc(50%-0.06em)] w-[112%] h-[2.6em]"
          } ${isDrawn ? `drawn-circle ${isInView ? "in-view" : ""}` : ""}`}
        />
      )}
    </span>
  );
};

export default MarkedWord;
