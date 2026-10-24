import { useEffect, useRef, useState } from "react";

// Flips to true once the element has scrolled into view and stays true, so an animation plays only once.
// By default it waits until the element is clear of the bottom edge, so the animation is actually seen
const useInView = ({ isEnabled = true, rootMargin = "0px 0px -15% 0px" } = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isEnabled || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isEnabled, rootMargin]);

  return [ref, isInView];
};

export default useInView;
