import { useCallback, useEffect, useState } from "react";
import useInView from "./use_in_view";

const MAX_WAIT = 2500; // ms; on a slow connection it goes ahead anyway, and the pictures fill in as they arrive
const REST_AFTER = 600; // ms into the header's entrance that what's already on the screen below it may come in

// How a page opens. Its header plays its entrance once the pictures in it are ready to show (and the fonts are in),
// so the entrance shows the drawings themselves rather than empty space that fills in afterwards; opened further
// down, past the header, it's simply there (isInstant). The rest of the page is held back (`isHolding`, for
// InViewHold) until the header is under way, so something already on the screen as the page opens doesn't go first
const usePageEntrance = () => {
  const [header, setHeader] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHolding, setIsHolding] = useState(true);
  const [viewRef, isInView, isInstant] = useInView({ isEnabled: isLoaded });

  const headerRef = useCallback(
    (element) => {
      setHeader(element);
      viewRef(element);
    },
    [viewRef]
  );

  useEffect(() => {
    if (!header) return;
    let isCancelled = false;
    const done = () => !isCancelled && setIsLoaded(true);
    // decode() waits for the picture to load as well; a broken one shouldn't hold the rest back
    const pictures = [...header.querySelectorAll("img")].map((img) => img.decode().catch(() => {}));
    Promise.all([...pictures, document.fonts.ready]).then(done);
    const timeout = setTimeout(done, MAX_WAIT);
    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [header]);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setIsHolding(false), isInstant ? 0 : REST_AFTER);
    return () => clearTimeout(timeout);
  }, [isInView, isInstant]);

  return { headerRef, isInView, isInstant, isHolding };
};

export default usePageEntrance;
