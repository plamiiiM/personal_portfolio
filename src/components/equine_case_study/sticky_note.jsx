import React from "react";

// Handwriting on a sticky note, as a Collage item placed and turned like the note under it
export const noteText = ({ text, fontSize = "1.875rem", ...box }) => ({
  ...box,
  content: (
    <p className="text-center font-[PlamenasHandwriting] leading-[1.3] tracking-[0.03em]" style={{ fontSize }}>
      {text}
    </p>
  ),
});
