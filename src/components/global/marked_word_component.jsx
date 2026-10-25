import React from "react";
import useInView, { inViewClassName } from "./use_in_view";

// In the phone layout a highlighted phrase may be wider than the column, so there it can wrap, with the marker stroke
// drawn as a background on the words that carries on to the next line
const WRAPPING_HIGHLIGHT = "max-lg:box-decoration-clone max-lg:bg-[url(/highlight.svg)] max-lg:bg-left max-lg:bg-no-repeat";

// `isThin` makes the highlight a narrower marker stroke, `highlight` swaps its placement: { className } that sizes it on the words.
// `circle` swaps the pencil circle for another hand-drawn one: { src, className } where the className sizes it around the word.
// `isDrawn` makes its marks draw themselves in once they scroll into view: the highlight sweeps across, the circle goes
// round (see .drawn-highlight and .drawn-circle in index.css).
// A circled phrase always stays on one line, inside its circle
const MarkedWord = ({ isHighlighted, isThin, highlight, isCircled, circle, isDrawn, children }) => {
  const [ref, isInView, isInstant] = useInView({ isEnabled: isDrawn });
  const canWrap = isHighlighted && !isCircled;
  const drawn = (className) => (isDrawn ? `${className} ${inViewClassName(isInView, isInstant)}` : "");

  return (
    <span
      ref={isDrawn ? ref : undefined}
      className={`relative inline-block whitespace-nowrap ${canWrap ? "max-lg:inline max-lg:whitespace-normal" : ""}`}
    >
      {isHighlighted && (
        <img
          src="/highlight.svg"
          alt=""
          className={`absolute max-w-none ${canWrap ? "max-lg:hidden" : ""} ${
            highlight?.className ??
            `-left-[0.1em] w-[calc(100%+0.2em)] ${
              isThin ? "top-[calc(50%-0.3em)] h-[0.72em]" : "top-[calc(50%-0.47em)] h-[1.17em]"
            }`
          } ${drawn("drawn-highlight")}`}
        />
      )}
      <span
        className={`relative ${
          canWrap
            ? `${WRAPPING_HIGHLIGHT} ${
                isThin || highlight ? "max-lg:bg-size-[var(--highlight-sweep)_0.72em]" : "max-lg:bg-size-[var(--highlight-sweep)_1.17em]"
              } ${drawn("drawn-highlight-background")}`
            : ""
        }`}
      >
        {children}
      </span>
      {isCircled && (
        <img
          src={circle?.src ?? "/pencil_circle.svg"}
          alt=""
          className={`absolute -translate-x-1/2 -translate-y-1/2 max-w-none pointer-events-none ${
            circle?.className ?? "left-[calc(50%+0.23em)] top-[calc(50%-0.06em)] w-[112%] h-[2.6em]"
          } ${drawn("drawn-circle")}`}
        />
      )}
    </span>
  );
};

export default MarkedWord;
