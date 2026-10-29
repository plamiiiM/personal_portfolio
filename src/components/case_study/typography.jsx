import React from "react";
import InView from "../global/in_view";

// Text styles of the case study pages. Like the designs, every style is tracked at 3% of its own size,
// so set the tracking on the element that has the font size (an em letter-spacing is fixed where it's declared).
// The phone layout uses smaller sizes; the lg: sizes are the designs'.
// Each one eases in once, as a whole, when all of it is on the screen, and the marks in it draw as it does

export const SectionLabel = ({ children, className = "" }) => (
  <InView
    as="p"
    isWhole
    className={`soft-in font-plamenas text-[1.25rem] lg:text-[1.5rem] tracking-[0.03em] uppercase ${className}`}
  >
    {children}
  </InView>
);

// Statement heading on its own between sections
export const LargeTitle = ({ children, className = "" }) => (
  <InView
    as="h2"
    isWhole
    className={`soft-in font-poppins font-bold text-[1.75rem] lg:text-[3rem] tracking-[0.03em] ${className}`}
  >
    {children}
  </InView>
);

export const SectionTitle = ({ children, className = "" }) => (
  <InView
    as="h2"
    isWhole
    className={`soft-in font-poppins font-bold text-[1.625rem] lg:text-[2.25rem] tracking-[0.03em] ${className}`}
  >
    {children}
  </InView>
);

export const SubsectionTitle = ({ children, className = "" }) => (
  <InView
    as="h3"
    isWhole
    className={`soft-in font-poppins font-semibold text-[1.375rem] lg:text-[1.875rem] tracking-[0.03em] ${className}`}
  >
    {children}
  </InView>
);

// Lines are balanced like in the designs; `isPretty` only keeps the last line from ending up as a lone word
export const Paragraph = ({ isPretty, children, className = "" }) => (
  <InView
    as="p"
    isWhole
    className={`soft-in font-poppins text-[1rem] lg:text-[1.125rem] tracking-[0.03em] mt-3 ${
      isPretty ? "text-pretty" : "text-balance"
    } ${className}`}
  >
    {children}
  </InView>
);
