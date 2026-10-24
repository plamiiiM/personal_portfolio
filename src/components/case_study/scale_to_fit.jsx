import { useEffect, useState } from "react";
import { rem } from "../global/layout";

// How many times the screen fits the content: below 1 it has to be zoomed down, above 1 there's paper either side.
// The content is sized in rem, so its width in px depends on the root font size
const fitRatio = (width) => {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return document.documentElement.clientWidth / ((width / 16) * rootFontSize);
};

// Lays its content out at the design width (Figma px) and zooms it down as a whole on narrower screens,
// so the composition looks the same on every screen. Wider screens show it at full size, centred.
// Lengths inside are zoomed too, viewport units and the nav's --nav-offset included: divide those by var(--zoom)
// to keep them true to the screen.
// --side-room is 1 while there's paper beside the content and 0 while it fills the screen edge to edge,
// so things at the far edges can fade into the paper only when they don't meet the edge of the screen
const ScaleToFit = ({ width, children }) => {
  const [ratio, setRatio] = useState(() => fitRatio(width));

  useEffect(() => {
    const update = () => setRatio(fitRatio(width));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  const zoom = Math.min(1, ratio);

  return (
    <div
      className="mx-auto"
      style={{ width: rem(width), zoom, "--zoom": zoom, "--side-room": ratio > 1 ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

export default ScaleToFit;
