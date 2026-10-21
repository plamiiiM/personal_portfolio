import { useEffect, useRef, useState } from "react";

const WIDTH = 12;
const INSET = 12; // gap between the line ends and the top/bottom of the window
const FADE_LENGTH = 90; // px over which the end of the line melts into the paper
const DRAG_THRESHOLD = 3; // px of movement before a click turns into a drag

const wobble = (y, seed) => Math.sin(y * 0.045 + seed) * 0.9 + Math.sin(y * 0.11 + seed * 3) * 0.4;

const linePath = (height, seed) => {
  const points = [];
  for (let y = 0; y < height; y += 6) points.push(`${(WIDTH / 2 + wobble(y, seed)).toFixed(2)} ${y}`);
  points.push(`${(WIDTH / 2 + wobble(height, seed)).toFixed(2)} ${height}`);
  return "M " + points.join(" L ");
};

// Eases from solid to clear over the last FADE_LENGTH px, so the end of the line melts into the paper
const FADE_MASK = `linear-gradient(to bottom, black calc(100% - ${FADE_LENGTH}px), rgb(0 0 0 / 0.55) calc(100% - ${
  FADE_LENGTH * 0.5
}px), rgb(0 0 0 / 0.2) calc(100% - ${FADE_LENGTH * 0.2}px), transparent)`;

// A graphite line that draws itself down the right edge as you scroll, its lower end fading into the page.
// Click anywhere along it to jump there, or drag up and down to scrub through the page
const FadingLineScrollbar = () => {
  const [metrics, setMetrics] = useState({ y: window.scrollY, max: 0, viewport: window.innerHeight });
  const trackRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const measure = () =>
      setMetrics({
        y: window.scrollY,
        max: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
        viewport: window.innerHeight,
      });

    // ResizeObserver also fires once on observe, which does the initial measure
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { y, max, viewport } = metrics;
  if (!max) return null;

  const track = viewport - INSET * 2;
  const drawn = (y / max) * track;

  const scrollToPointer = (clientY, behavior) => {
    const { top, height } = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - top) / height));
    window.scrollTo({ top: ratio * max, behavior });
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startY: e.clientY, moved: false };
    // A plain click glides there (smooth scroll from index.css); dragging below follows the pointer exactly
    scrollToPointer(e.clientY, "auto");
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (!drag.moved && Math.abs(e.clientY - drag.startY) < DRAG_THRESHOLD) return;
    drag.moved = true;
    scrollToPointer(e.clientY, "instant");
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="fixed inset-y-0 right-1 w-6 z-50 pointer-events-none text-(--pencilLine)" aria-hidden="true">
      <div
        ref={trackRef}
        className="absolute inset-x-0 pointer-events-auto cursor-pointer touch-none select-none"
        style={{ top: INSET, bottom: INSET }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* The line is drawn once for the whole track and cropped to how far you've scrolled */}
        <div
          className="absolute top-0 left-1.5 overflow-hidden"
          style={{ width: WIDTH, height: drawn, maskImage: FADE_MASK }}
        >
          <svg width={WIDTH} height={track} viewBox={`0 0 ${WIDTH} ${track}`}>
            <defs>
              <filter id="fading-line-grain" x="-100%" y="-5%" width="300%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="1.1 0.25" numOctaves="2" seed="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="rough" />
                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.4" result="grain" />
                <feComposite in="rough" in2="grain" operator="in" />
              </filter>
            </defs>
            <g filter="url(#fading-line-grain)" fill="none" stroke="currentColor" strokeLinecap="round">
              <path d={linePath(track, 0)} strokeWidth="2.2" strokeOpacity="0.85" />
              {/* A lighter second pass, like going over the line again */}
              <path d={linePath(track, 2)} strokeWidth="1.2" strokeOpacity="0.45" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FadingLineScrollbar;
