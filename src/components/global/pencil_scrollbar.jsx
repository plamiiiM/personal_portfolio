import { useEffect, useRef, useState } from "react";

const THUMB_WIDTH = 14;
const MIN_THUMB_HEIGHT = 60;
const HIDE_DELAY = 1000;

// A few overlapping passes, like going over the same line with a pencil
const STROKES = [
  { offset: 0, start: 0, end: 0, seed: 0, width: 3.4, opacity: 0.8 },
  { offset: 1.7, start: 6, end: -2, seed: 2, width: 2, opacity: 0.5 },
  { offset: -1.5, start: -2, end: 9, seed: 4, width: 1.6, opacity: 0.4 },
];

const wobble = (y, seed) =>
  Math.sin(y * 0.045 + seed) * 0.9 + Math.sin(y * 0.11 + seed * 3) * 0.4;

const pencilStroke = (height, { offset, start, end, seed }) => {
  const centre = THUMB_WIDTH / 2 + offset;
  const top = 4 + start;
  const bottom = height - 4 - end;
  const points = [];
  for (let y = top; y < bottom; y += 6) points.push([centre + wobble(y, seed), y]);
  points.push([centre + wobble(bottom, seed), bottom]);
  return "M " + points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ");
};

const PencilScrollbar = () => {
  const [height, setHeight] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [hovering, setHovering] = useState(false);
  const thumbRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= viewport) {
        setHeight(0);
        return;
      }
      const thumbHeight = Math.round(Math.max(MIN_THUMB_HEIGHT, (viewport / total) * viewport));
      const top = (window.scrollY / (total - viewport)) * (viewport - thumbHeight);
      setHeight(thumbHeight);
      if (thumbRef.current) thumbRef.current.style.transform = `translateY(${top}px)`;
    };

    let hideTimer;
    const onScroll = () => {
      update();
      setScrolling(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setScrolling(false), HIDE_DELAY);
    };

    // ResizeObserver also fires once on observe, which does the initial measure
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(hideTimer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startY: e.clientY, startScroll: window.scrollY };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const viewport = window.innerHeight;
    const ratio = (document.documentElement.scrollHeight - viewport) / (viewport - height);
    window.scrollTo({
      top: dragRef.current.startScroll + (e.clientY - dragRef.current.startY) * ratio,
      behavior: "instant",
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
    setDragging(false);
  };

  if (!height) return null;

  // Stays visible while it's being hovered or dragged, even after scrolling stops
  const visible = scrolling || hovering || dragging;

  return (
    <div className="fixed inset-y-0 right-1 w-6 z-50 pointer-events-none" aria-hidden="true">
      <div
        ref={thumbRef}
        className={`group absolute top-0 left-0 w-full flex justify-center select-none touch-none transition-opacity duration-300 ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0"
        } ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ height }}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          width={THUMB_WIDTH}
          height={height}
          viewBox={`0 0 ${THUMB_WIDTH} ${height}`}
          className={`text-(--brown) transition-opacity duration-200 ${
            dragging ? "opacity-100" : "opacity-60 group-hover:opacity-100"
          }`}
        >
          <defs>
            <filter id="pencil-scrollbar-grain" x="-100%" y="-5%" width="300%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="1.1 0.25" numOctaves="2" seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="rough" />
              <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.4" result="grain" />
              <feComposite in="rough" in2="grain" operator="in" />
            </filter>
          </defs>
          <g filter="url(#pencil-scrollbar-grain)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {STROKES.map((stroke) => (
              <path
                key={stroke.seed}
                d={pencilStroke(height, stroke)}
                strokeWidth={stroke.width}
                strokeOpacity={stroke.opacity}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PencilScrollbar;
