import React from "react";
import useLanguage from "../global/use_language";

// One line of the title, which slides up into view from behind its own lower edge once the header is .in-view.
// The padding gives the letters room inside the clip without moving anything
const RisingLine = ({ className = "", children }) => (
  <span className="block overflow-clip p-[0.2em] -m-[0.2em]">
    <span className={`rise-line ${className}`}>{children}</span>
  </span>
);

// On desktop the name sits well below the roles, with an arrow pointing down from it. On phones everything is
// centred and closer together, the underline sits right under "Mobile Developer" and there's no arrow.
// The lines come up one after another, then the underline and the arrow are drawn in under them
const ProfessionTitleName = () => {
  const { t } = useLanguage();

  return (
    <div
      className="relative flex flex-col items-center lg:items-start justify-end gap-y-12 lg:gap-y-30 w-fit
                 font-zodiak text-[1.75rem] lg:text-4xl text-(--red) tracking-wide"
    >
      <div className="flex flex-col items-center lg:items-stretch gap-3 align-baseline">
        <div className="flex flex-row gap-5 items-end">
          <p className="inline text-left font-medium ">
            <RisingLine className="delay-300">{t({ en: "UX/UI Designer", bg: "UX/UI дизайнер" })}</RisingLine>
          </p>
          <p className="inline font-zodiak text-5xl lg:text-7xl text-(--brown) font-thin">
            <RisingLine className="delay-400">&</RisingLine>
          </p>
        </div>
        <p
          className="inline text-left font-normal tracking-widest max-lg:relative
                after:content-['']
                after:absolute
                after:left-0
                after:bottom-30
                max-lg:after:-bottom-6
                after:w-full
                after:h-[1.5rem]
                after:bg-[url('/scribble_underline.png')]
                after:bg-contain
                after:bg-no-repeat
                max-lg:after:bg-center
                sketch-after after:delay-1000"
        >
          <RisingLine className="delay-500">{t({ en: "Mobile Developer", bg: "Мобилен разработчик" })}</RisingLine>
        </p>
      </div>
      <p
        className="relative inline text-center lg:text-right w-full font-normal text-xl lg:text-2xl
    after:content-['']
    after:absolute
    max-lg:after:hidden

    after:left-10
    after:top-full

    after:w-[6rem]
    after:h-[6rem]
    after:bg-[url('/arrow.png')]
    after:bg-contain
    after:bg-no-repeat
    after:mix-blend-multiply
    after:rotate-20
    after:origin-left
    sketch-after sketch-down after:delay-1300"
      >
        <RisingLine className="delay-700">{t({ en: "Plamena Mincheva", bg: "Пламена Минчева" })}</RisingLine>
      </p>
    </div>
  );
};

export default ProfessionTitleName;
