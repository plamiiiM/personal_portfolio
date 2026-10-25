import { useEffect, useRef, useState } from "react";
import { rem } from "../global/layout";
import usePhoneLayout from "../global/use_phone_layout";

// How many times the screen fits the content: below 1 it has to be shrunk, above 1 there's paper either side.
// The content is sized in rem, so its width in px depends on the root font size
const fitRatio = (width) => {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return document.documentElement.clientWidth / ((width / 16) * rootFontSize);
};

// Chrome and Firefox shrink everything inside `zoom` alike. Safari (every browser on an iPhone) doesn't: it leaves rem
// and viewport lengths at full size and keeps text at 9px or more, so the text outgrows its sticky notes, titles and buttons.
// A tiny probe shows which one this browser does: zoomed to a quarter, 4rem x 2em at 16px should come out 16 x 8px
let zoomShrinksEverything;
const canZoom = () => {
  if (zoomShrinksEverything === undefined) {
    const probe = document.createElement("div");
    probe.style.cssText = "position: absolute; visibility: hidden; pointer-events: none";
    probe.innerHTML = '<div style="zoom: 0.25; width: 4rem; height: 2em; font-size: 16px"></div>';
    document.body.append(probe);
    const { width, height } = probe.getBoundingClientRect();
    probe.remove();
    zoomShrinksEverything = Math.abs(width - 16) < 1 && Math.abs(height - 8) < 1;
  }
  return zoomShrinksEverything;
};

// Lays its content out at the design width (Figma px) and shrinks it as a whole on narrower screens,
// so the composition looks the same on every screen. Wider screens show it at full size, centred.
// The phone layout has its own single column, so there it leaves the content alone.
// How it shrinks it is in data-scaling, for the content to style by (in-data-[scaling=…]): "zoom" where that's
// faithful, "transform" elsewhere (it draws the content smaller without touching its layout, so position: sticky
// can't pin in there), "none" in the phone layout.
// Lengths inside are shrunk too, viewport units and the nav's --nav-offset included: divide those by var(--zoom)
// to keep them true to the screen, and screen px (getBoundingClientRect) by --zoom to get page px.
// --side-room is 1 while there's paper beside the content and 0 while it fills the screen edge to edge,
// so things at the far edges can fade into the paper only when they don't meet the edge of the screen
// (the phone layout keeps everything inside its margins, so there's always paper beside it)
const ScaleToFit = ({ width, children }) => {
  const [ratio, setRatio] = useState(() => fitRatio(width));
  const isPhoneLayout = usePhoneLayout();
  const [shrunkHeight, setShrunkHeight] = useState();
  const contentRef = useRef(null);

  const zoom = isPhoneLayout ? 1 : Math.min(1, ratio);
  const scaling = isPhoneLayout ? "none" : zoom < 1 && !canZoom() ? "transform" : "zoom";

  useEffect(() => {
    const update = () => setRatio(fitRatio(width));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  // A transform doesn't change the space the content takes up, so the shrunk height is held for it instead.
  // ResizeObserver also fires once on observe, which does the initial measure
  useEffect(() => {
    if (scaling !== "transform") return;
    const content = contentRef.current;
    const observer = new ResizeObserver(() => setShrunkHeight(content.offsetHeight * zoom));
    observer.observe(content);
    return () => observer.disconnect();
  }, [scaling, zoom]);

  return (
    <div data-scaling={scaling} style={{ height: scaling === "transform" ? shrunkHeight : undefined }}>
      <div
        ref={contentRef}
        className="mx-auto origin-top-left"
        style={{
          width: isPhoneLayout ? undefined : rem(width),
          zoom: scaling === "zoom" ? zoom : undefined,
          transform: scaling === "transform" ? `scale(${zoom})` : undefined,
          "--zoom": zoom,
          "--side-room": isPhoneLayout || ratio > 1 ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaleToFit;
