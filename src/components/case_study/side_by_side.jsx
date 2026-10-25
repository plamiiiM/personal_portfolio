import React from "react";

// A text block and its picture: side by side like in the designs, and one under the other in the phone layout, text
// first. `isPictureFirst` is for when the picture comes first in the code (it's on the left on desktop), so phones
// still show the text first. `isCentered` lines the two up on their middles instead of their tops
const SideBySide = ({ as = "div", isPictureFirst, isCentered, className = "", children }) => {
  const Tag = as;
  return (
    <Tag
      className={`flex ${isPictureFirst ? "flex-col-reverse" : "flex-col"} gap-y-8 lg:flex-row lg:justify-between ${
        isCentered ? "lg:items-center" : "lg:items-start"
      } ${className}`}
    >
      {children}
    </Tag>
  );
};

export default SideBySide;
