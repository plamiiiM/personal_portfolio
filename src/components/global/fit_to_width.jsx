import { useLayoutEffect, useRef } from "react";

// Shows a composition (a collage, a drawing with text on it) at its own size where there's room, and shrinks it as
// a whole where there isn't, like in the phone layout's single column, so nothing in it moves out of place.
// It takes up the shrunk size, so whatever comes after follows right below it
const FitToWidth = ({ className = "", children }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  // Measured before the first paint, and again whenever the space or the content changes size
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const fit = () => {
      const scale = Math.min(1, outer.clientWidth / inner.offsetWidth);
      inner.style.transform = scale < 1 ? `scale(${scale})` : "";
      outer.style.height = scale < 1 ? `${inner.offsetHeight * scale}px` : "";
    };
    const observer = new ResizeObserver(fit);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className={`w-fit max-w-full ${className}`}>
      <div ref={innerRef} className="w-max origin-top-left">
        {children}
      </div>
    </div>
  );
};

export default FitToWidth;
