import React from "react";
import useLanguage from "../global/use_language";

// The portrait is cropped straight across the bottom, so that edge fades into the paper
const PHOTO_FADE = { maskImage: "linear-gradient(to bottom, black 88%, transparent)" };

// The graphite band is cut off straight on the left, at the far left of the page, so that end fades out
// when there's paper beside it
const SCRIBBLE_FADE = { maskImage: "linear-gradient(to right, transparent, black calc(9% * var(--side-room, 1)))" };

// Once the header is .in-view the photo comes up on the paper, then the scribble and the label are drawn in over it.
// Each picture moves on its own, as a group would lose its multiply blend with the paper while it fades
const PortfolioLabelWithPicture = () => {
  const { t } = useLanguage();

  return (
    <div className="flex w-[42rem] flex-col justify-center">
      <div className="relative flex items-center select-none top-13 ">
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <img
            src="/scribble_graphite_small_color.webp"
            alt={t({ en: "Graphite scribble", bg: "Графитна драсканица" })}
            className="sketch delay-200 mix-blend-multiply w-[36rem]"
            style={SCRIBBLE_FADE}
          />
        </div>
        <img
          src="/portfolio_label.webp"
          alt={t({ en: "Portfolio label", bg: "Надпис „Портфолио“" })}
          className="sketch delay-500 relative w-[22rem] h-auto object-contain mix-blend-multiply left-5"
        />
      </div>
      <img
        src="/portrait_pencil_new.webp"
        fetchPriority="high"
        alt={t({ en: "Portfolio picture", bg: "Портретна снимка" })}
        className="fade-in ml-30 w-[25rem] overflow-hidden object-cover opacity-100 mix-blend-multiply"
        style={PHOTO_FADE}
      />
    </div>
  );
};

export default PortfolioLabelWithPicture;
