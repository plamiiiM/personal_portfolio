import React from "react";
import useLanguage from "../global/use_language";

// Softens just the outer rim of the photo's paper so it blends into the background.
// The paper starts 3.3% in from each side of the image. The left side is the far left of the page,
// so it only fades when there's paper beside it (--side-room from ScaleToFit), not at the edge of the screen
const PHOTO_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 3.3%, black calc(3.3% + 4.2% * var(--side-room, 1)), black 92.5%, transparent 96.7%), linear-gradient(to bottom, transparent, black 5%, black 94%, transparent)",
  maskComposite: "intersect",
};

// The graphite band is cut off straight on the left, at the far left of the page, so that end fades out
// when there's paper beside it
const SCRIBBLE_FADE = { maskImage: "linear-gradient(to right, transparent, black calc(9% * var(--side-room, 1)))" };

// Once the header is .in-view the photo comes up on the paper, then the scribble and the label are drawn in over it.
// Each picture moves on its own, as a group would lose its multiply blend with the paper while it fades
const PortfolioLabelWithPicture = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center ">
      <div className="relative flex items-center select-none top-13 ">
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <img
            src="/scribble_graphite_small_color.png"
            alt={t({ en: "Graphite scribble", bg: "Графитна драсканица" })}
            className="sketch delay-200 mix-blend-multiply w-[36rem]"
            style={SCRIBBLE_FADE}
          />
        </div>
        <img
          src="/portfolio_label.png"
          alt={t({ en: "Portfolio label", bg: "Надпис „Портфолио“" })}
          className="sketch delay-500 relative w-[22rem] h-auto object-contain mix-blend-multiply left-5"
        />
      </div>
      <img
        src="/picture_of_me_graphite_color.png"
        alt={t({ en: "Portfolio picture", bg: "Портретна снимка" })}
        className="fade-in w-[42rem] overflow-hidden object-cover opacity-100 mix-blend-multiply"
        style={PHOTO_FADE}
      />
    </div>
  );
};

export default PortfolioLabelWithPicture;
