import { useEffect, useState } from "react";
import { rem } from "../global/layout";

// The content is sized in rem, so its width in px depends on the root font size
const fitZoom = (width) => {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return Math.min(1, document.documentElement.clientWidth / ((width / 16) * rootFontSize));
};

// Lays its content out at the design width (Figma px) and zooms it down as a whole on narrower screens,
// so the composition looks the same on every screen. Wider screens show it at full size, centred
const ScaleToFit = ({ width, children }) => {
  const [zoom, setZoom] = useState(() => fitZoom(width));

  useEffect(() => {
    const update = () => setZoom(fitZoom(width));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  return (
    <div className="mx-auto" style={{ width: rem(width), zoom }}>
      {children}
    </div>
  );
};

export default ScaleToFit;
