import React from "react";
import useLanguage from "./use_language";

// Each language has its own drawing of the heading: the English one comes in as props, the Bulgarian one in `bg`.
// The drawings are all shown at a third of their size (a fifth on phones), so the written ones share one size.
// `imageClassName` sizes a drawing, `className` places either one.
// The headings are all further down the page, so the drawings wait until it's scrolled near them. `width` and `height`
// (the drawing's own size) keep its space while it loads, so the page below doesn't move when it comes in
const HandLetteredHeading = ({ src, alt, width, height, imageClassName = "", bg, className = "", ...props }) => {
  const { t } = useLanguage();
  const drawing = t({ en: { src, alt, width, height, imageClassName }, bg });

  return (
    <img
      src={drawing.src}
      alt={drawing.alt}
      width={drawing.width}
      height={drawing.height}
      loading="lazy"
      className={`${drawing.imageClassName} ${className}`}
      {...props}
    />
  );
};

export default HandLetteredHeading;
