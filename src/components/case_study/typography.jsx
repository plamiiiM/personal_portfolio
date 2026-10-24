import React from "react";

// Text styles of the case study pages. Like the designs, every style is tracked at 3% of its own size,
// so set the tracking on the element that has the font size (an em letter-spacing is fixed where it's declared)

export const SectionLabel = ({ children, className = "" }) => (
  <p className={`font-[PlamenasHandwriting] text-[1.5rem] tracking-[0.03em] uppercase ${className}`}>{children}</p>
);

// Statement heading on its own between sections
export const LargeTitle = ({ children, className = "" }) => (
  <h2 className={`font-[poppins] font-bold text-[3rem] tracking-[0.03em] ${className}`}>{children}</h2>
);

export const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`font-[poppins] font-bold text-[2.25rem] tracking-[0.03em] ${className}`}>{children}</h2>
);

export const SubsectionTitle = ({ children, className = "" }) => (
  <h3 className={`font-[poppins] font-semibold text-[1.875rem] tracking-[0.03em] ${className}`}>{children}</h3>
);

// Lines are balanced like in the designs; `isPretty` only keeps the last line from ending up as a lone word
export const Paragraph = ({ isPretty, children, className = "" }) => (
  <p
    className={`font-[poppins] text-[1.125rem] tracking-[0.03em] ${
      isPretty ? "text-pretty" : "text-balance"
    } ${className}`}
  >
    {children}
  </p>
);
