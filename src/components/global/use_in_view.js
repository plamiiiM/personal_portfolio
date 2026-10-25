import { createContext, useContext, useEffect, useState } from "react";

// While a page holds this true nothing on it counts as in view yet, so what's already on the screen as it opens can
// wait for the page's own entrance to play first
export const InViewHold = createContext(false);

// The classes the motion in index.css plays on
export const inViewClassName = (isInView, isInstant) => (isInView ? (isInstant ? "in-view instant" : "in-view") : "");

// Which way the page last scrolled, for things that come into view on a jump up (dragging the scrollbar) without
// passing through the watch above the window first
let lastScrollY = window.scrollY;
let isScrollingUp = false;
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY !== lastScrollY) isScrollingUp = window.scrollY < lastScrollY;
    lastScrollY = window.scrollY;
  },
  { passive: true }
);

// Flips to true once the element has scrolled into view and stays true, so an animation plays only once.
// By default it waits until the element is clear of the bottom edge, so the animation is actually seen.
// Things only move the first time they're seen on the way down: when the element comes back from above the window
// (scrolling up), or had already been passed when it started being watched (the page opened further down), it's
// isInstant as well, to be shown as it is without the animation. The watch reaches a window's height above the
// window, so on the way up it's in place before it scrolls into sight.
// The ref is a callback ref, so it keeps watching when the element is swapped for another one (like a heading
// switching language before it's been seen) instead of waiting on the one that's gone
const useInView = ({ isEnabled = true, rootMargin = "100% 0px -15% 0px" } = {}) => {
  const [element, setElement] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const isHeld = useContext(InViewHold);

  useEffect(() => {
    if (!isEnabled || isHeld || !element || isInView) return;
    // The first report is where it is as watching starts (shown as it is only when it's wholly above the window, as
    // it can be seen coming in otherwise), the later ones are it scrolling in, from above or from below the window
    let isFirstReport = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const { top, bottom } = entry.boundingClientRect;
        const isFromAbove = isFirstReport ? bottom < 0 : top < 0 || isScrollingUp;
        isFirstReport = false;
        if (!entry.isIntersecting && !isFromAbove) return;
        setIsInstant(isFromAbove);
        setIsInView(true);
        observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isEnabled, isHeld, rootMargin, element, isInView]);

  return [setElement, isInView, isInstant];
};

export default useInView;
