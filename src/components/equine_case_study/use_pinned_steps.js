import { useEffect, useRef, useState } from "react";

// Which of `count` steps the scroll has got to. While the stage is pinned, how far it's been carried down its room is
// how far through the steps the reader is. Where it can't pin (the page shrunk with a transform, see ScaleToFit), the
// steps take turns while all of the stage is in the window instead: from it having come in at the bottom to it
// reaching the top
const stepAt = (room, stage, count) => {
  const roomBox = room.getBoundingClientRect();
  const stageBox = stage.getBoundingClientRect();
  const pinnedFor = roomBox.height - stageBox.height;
  const inWindowFor = Math.max(1, window.innerHeight - stageBox.height);
  const progress =
    pinnedFor > 1 ? (stageBox.top - roomBox.top) / pinnedFor : (inWindowFor - stageBox.top) / inWindowFor;
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
};

// For a stage that stays pinned in the window for a stretch of scrolling (sticky inside its room) while what's on it
// moves through `count` steps. The step can be set by hand too, until the scroll moves on to another one.
// With `letsGo`, once the reader has scrolled past the end of the room the scrolling it took is let go of, so the page
// scrolls back up past the stage as usual instead of pinning it again: the spacer (spacerRef) under the stage goes, and
// the page is scrolled up as much, so nothing moves on the screen. The stage stays on its last step, or the one picked
const usePinnedSteps = (count, { letsGo = false } = {}) => {
  const [step, setStep] = useState(0);
  const roomRef = useRef(null);
  const stageRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    const room = roomRef.current;
    const stage = stageRef.current;
    const spacer = spacerRef.current;
    let scrolledTo;

    // Past the end of the room the stage has been carried all the way down it, and stays there. The browser may move
    // the scroll itself as the spacer goes (scroll anchoring, on what's under the room), so the scroll is put right by
    // however far the stage then is from where it was
    const letGo = () => {
      const roomBox = room.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      const pinnedFor = roomBox.height - stageBox.height;
      if (pinnedFor <= 1 || stageBox.top - roomBox.top < pinnedFor - 1) return;
      spacer.hidden = true;
      window.scrollBy({ top: stage.getBoundingClientRect().top - stageBox.top, behavior: "instant" });
    };

    const onScroll = () => {
      if (spacer?.hidden) return;
      const index = stepAt(room, stage, count);
      if (index !== scrolledTo) {
        scrolledTo = index;
        setStep(index);
      }
      if (letsGo) letGo();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, letsGo]);

  return { roomRef, stageRef, spacerRef, step, setStep };
};

export default usePinnedSteps;
