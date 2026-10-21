import React from "react";

const MarkedWord = ({ isHighlighted, isCircled, children }) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {isHighlighted && (
        <img
          src="/highlight.svg"
          alt=""
          className="absolute -left-[0.1em] top-[calc(50%-0.47em)] w-[calc(100%+0.2em)] h-[1.17em] max-w-none"
        />
      )}
      <span className="relative">{children}</span>
      {isCircled && (
        <img
          src="/pencil_circle.svg"
          alt=""
          className="absolute left-[calc(50%+0.23em)] top-[calc(50%-0.06em)] -translate-x-1/2 -translate-y-1/2 w-[112%] h-[2.6em] max-w-none pointer-events-none"
        />
      )}
    </span>
  );
};

export default MarkedWord;
