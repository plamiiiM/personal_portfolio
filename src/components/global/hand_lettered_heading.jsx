import React from "react";
import useLanguage from "./use_language";

// In Bulgarian the heading is written out in Neucha (the Cyrillic stand-in for handwriting), thickened into a marker stroke.
// The drawings are all shown at a third of their size (a fifth on phones), so the written ones share one size.
// `imageClassName` sizes the drawing, `className` places either one
const HandLetteredHeading = ({ src, alt, bgText, imageClassName = "", className = "", ...props }) => {
  const { t } = useLanguage();

  return t({
    en: <img src={src} alt={alt} className={`${imageClassName} ${className}`} {...props} />,
    bg: (
      <h2
        className={`w-fit font-plamenas text-[2.375rem] lg:text-[3.875rem] leading-[0.95] text-(--textOnLight)
                    [-webkit-text-stroke:0.05em_currentcolor] ${className}`}
        {...props}
      >
        {bgText}
      </h2>
    ),
  });
};

export default HandLetteredHeading;
