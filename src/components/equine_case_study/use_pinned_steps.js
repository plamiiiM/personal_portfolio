import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_HEIGHT } from "../global/layout";

// Room kept above and below a stage fitted into the window (screen px)
const FIT_MARGIN = 16;

// Where the browser can drive an animation by the scroll itself, the stage is carried along off the main thread, so it
// holds still under a finger on a touch screen instead of trailing the scroll a frame behind
const canScrollDrive = typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()");

// A wheel gesture is over once the wheel has been still this long (ms). Within its first stretch a wheel picking up
// speed is still the same swipe; after it a sudden surge over the glide of a touchpad is a new swipe
const GESTURE_QUIET = 150;
const GESTURE_FIRST = 250;
const SURGE = 1.5;
const SURGE_LEAST = 8;
// The scroll to a step that's been taken gets this long to reach it, before the scroll has its say again (ms)
const TAKING_FOR = 1000;
// Nothing scrolling and no finger on the screen for this long, so the scroll can be put right (ms)
const SETTLED = 150;

// The page brought to a stop, `by` from where it is. A finger's fling glides on whatever the page asks, so the page
// can't scroll for a moment, which ends it
const haltScroll = (by, { isFling = false } = {}) => {
  const root = document.documentElement;
  const isStopping = isFling && !root.style.overflow;
  if (isStopping) root.style.overflow = "hidden";
  window.scrollBy({ top: by, behavior: "instant" });
  if (isStopping) requestAnimationFrame(() => (root.style.overflow = ""));
};

// The page shrunk with a transform (see ScaleToFit), where position: sticky can't pin, and how much it's shrunk
const isTransformed = (element) => element.closest("[data-scaling]")?.dataset.scaling === "transform";
const zoomOf = (element) => parseFloat(getComputedStyle(element).getPropertyValue("--zoom")) || 1;

// Where the stage's top is pinned in the window (screen px): what its sticky top works out to. In the transformed page
// it's carried by hand instead, just under where the nav shows, and in the middle of the window where there's room
const pinLine = (stage, stageHeight = stage.getBoundingClientRect().height) => {
  if (!isTransformed(stage)) return parseFloat(getComputedStyle(stage).top) * zoomOf(stage);
  return Math.max(NAV_HEIGHT + FIT_MARGIN, (document.documentElement.clientHeight - stageHeight) / 2);
};

// How far down its room the stage has been carried, and how far it can go (screen px). Where it's sticky that's where
// it is; where it's carried by hand it's where the scroll has got to, as that's what it's to be moved by
const carriage = (room, stage) => {
  const roomBox = room.getBoundingClientRect();
  const stageBox = stage.getBoundingClientRect();
  const pinnedFor = roomBox.height - stageBox.height;
  const carried = isTransformed(stage) ? pinLine(stage, stageBox.height) - roomBox.top : stageBox.top - roomBox.top;
  return { carried: Math.min(pinnedFor, Math.max(0, carried)), pinnedFor };
};

// Which of `count` steps the scroll has got to. While the stage is pinned, how far it's been carried down its room is
// how far through the steps the reader is. Where it can't pin (a stage left static in the transformed page, or one
// that's let go of its room), the steps take turns while all of the stage is in the window instead: from it having
// come in at the bottom to it reaching the top
const stepAt = (room, stage, count) => {
  const { carried, pinnedFor } = carriage(room, stage);
  const stageBox = stage.getBoundingClientRect();
  const inWindowFor = Math.max(1, window.innerHeight - stageBox.height);
  const progress = pinnedFor > 1 ? carried / pinnedFor : (inWindowFor - stageBox.top) / inWindowFor;
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
};

// Where a step taken by a gesture rests (screen px down the room): the first where the stage pins and the last where it
// lets go, the others evenly between, so there's no stretch of scrolling at either end where nothing moves
const restOf = (index, count, pinnedFor) => Math.min(pinnedFor - 1, Math.max(1, (index / Math.max(1, count - 1)) * pinnedFor));

// For a stage that stays pinned in the window for a stretch of scrolling (sticky inside its room) while what's on it
// moves through `count` steps. Picking a step scrolls to it (goTo), so the scroll and what's showing never disagree.
// With `fitsWindow`, what's on the stage (contentRef) is shrunk if need be so all of it fits in the window under the
// nav, its title too, and the stage takes the shrunk height. It's refitted whenever what's on it changes size (pictures
// loading, the language switching), so the stage is to keep the same height from one step to the next.
// With `stepsByGesture`, while the stage is pinned a scroll gesture (a turn of the wheel, a swipe of the touchpad with
// its glide, or of a finger) takes it one step on or back, however far it would have scrolled, so no step can be
// scrolled past unseen. The step changes as the gesture's taken, and the page scrolls on to where it rests behind it.
// Whatever brings the page into the room stops there, on the step it came to, however hard it was going: a wheel's
// gesture is taken from there on, and anything else (a finger's fling gliding on, a key, a scrollbar let go of) is
// stopped where the stage pins. With `firstStepOnEntry` coming into the room from above also takes the stage on to the
// first step after the one it starts on, for a stage that starts empty. Past the last step (or before the first) the
// page scrolls on as usual, straight away.
// The room keeps its length, scrolling back up too, which takes the steps back the way they came, until `isDone`, or
// with `letsGoPastEnd` until the reader has scrolled on past the last step: then it's taken away (spacerRef), so the
// page scrolls past the stage as usual and the stage stays on the step it's on. That's done with the page scrolled back
// by as much, so nothing moves on the screen, and only once nothing is scrolling and no finger is on the screen: on a
// touch screen the scroll can't be put right while it's still gliding, and the page would jump on past the room.
// With `stopsAtNext`, a scroll that sets off down the page from the stage (the last step's been seen and the page moves
// on) stops when what comes after the room reaches the top of the window under the nav, however hard it was going, so
// a strong swipe can't carry the page on past it. The next scroll goes on as usual. A finger dragging the page is
// left be; it's its fling that's stopped.
// In the transformed page the stage is carried down its room by hand, so it pins there too: a stage that's to pin
// there leaves its spacer showing, and is static instead of sticky
const usePinnedSteps = (
  count,
  {
    fitsWindow = false,
    stepsByGesture = false,
    firstStepOnEntry = false,
    stopsAtNext = false,
    letsGoPastEnd = false,
    isDone = false,
  } = {},
) => {
  const [step, setStep] = useState(0);
  const [isPastEnd, setIsPastEnd] = useState(false);
  const roomRef = useRef(null);
  const stageRef = useRef(null);
  const spacerRef = useRef(null);
  const contentRef = useRef(null);
  // The step showing; one a gesture or a pick has taken the stage to, which the scroll on its way there isn't to
  // override ({ index, until }); and whether the room has been let go of
  const shownRef = useRef(0);
  const takingRef = useRef(null);
  const isLetGoRef = useRef(false);
  // The room's top down the page and how far the stage is pinned for (screen px), measured with the layout rather than
  // on every turn of the wheel
  const layoutRef = useRef({ roomTop: 0, stageHeight: 0, pinnedFor: 0 });

  const show = useCallback((index) => {
    shownRef.current = index;
    setStep(index);
  }, []);

  // How far the scroll has got through the room (screen px), unlike carriage not held to it: below 0 the stage is
  // still coming up to its pin, past pinnedFor it's been carried all the way and is going on up
  // (nowhere, while the stage is off the page)
  const scrolledThrough = useCallback(() => {
    const { roomTop, stageHeight, pinnedFor } = layoutRef.current;
    if (!stageRef.current) return { through: -Infinity, pinnedFor: 0 };
    return { through: pinLine(stageRef.current, stageHeight) - (roomTop - window.scrollY), pinnedFor };
  }, []);

  const take = useCallback(
    (index) => {
      const { through, pinnedFor } = scrolledThrough();
      takingRef.current = { index, until: performance.now() + TAKING_FOR };
      show(index);
      window.scrollBy({ top: restOf(index, count, pinnedFor) - through, behavior: "smooth" });
    },
    [count, scrolledThrough, show],
  );

  useEffect(() => {
    const room = roomRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    let frame;
    // Whether the stage is carried by hand, on every scroll (where the scroll can't drive an animation), worked out
    // with the layout rather than on every scroll
    let isCarriedOnScroll = false;

    // The stage carried down its room in the transformed page: by an animation the scroll drives where there is one
    // (set up once for the layout), otherwise moved on every scroll
    const carry = () => {
      const { carried, pinnedFor } = carriage(room, stage);
      const zoom = zoomOf(stage);
      if (isCarriedOnScroll) {
        stage.style.translate = `0 ${carried / zoom}px`;
        return;
      }
      // From the room's top reaching the pin line to it having gone up past it by all of the carrying (page px of the
      // root scroller). Measured off the room, which the carrying doesn't move
      const start = window.scrollY + room.getBoundingClientRect().top - pinLine(stage);
      stage.style.setProperty("--carried", `${pinnedFor / zoom}px`);
      stage.style.animation = "pin-carry linear both";
      stage.style.animationTimeline = "scroll(root)";
      stage.style.animationRange = `${start}px ${start + pinnedFor}px`;
    };

    const fit = () => {
      if (!fitsWindow || !content) return;
      const zoom = zoomOf(stage);
      const naturalHeight = content.getBoundingClientRect().height / (parseFloat(content.style.scale) || 1);
      const available = document.documentElement.clientHeight - NAV_HEIGHT - 2 * FIT_MARGIN;
      const scale = Math.min(1, available / naturalHeight);
      content.style.scale = scale;
      // In page px, as its own lengths are
      const height = `${(naturalHeight * scale) / zoom}px`;
      stage.style.height = height;
      stage.style.setProperty("--stage-height", height);
    };

    // At most once a frame, however many scroll events come in. Once the room's been let go of the stage stays on
    // the step it was on
    const update = () => {
      frame = null;
      if (isCarriedOnScroll) carry();
      if (isLetGoRef.current) return;
      const index = stepAt(room, stage, count);
      const taking = takingRef.current;
      if (taking) {
        if (index !== taking.index && performance.now() < taking.until) return;
        takingRef.current = null;
      }
      if (index !== shownRef.current) show(index);
      if (letsGoPastEnd) {
        const { through, pinnedFor } = scrolledThrough();
        if (pinnedFor > 1 && through > pinnedFor + 1) setIsPastEnd(true);
      }
    };
    const onScroll = () => {
      frame ??= requestAnimationFrame(update);
    };

    const relayout = () => {
      fit();
      const roomBox = room.getBoundingClientRect();
      const stageHeight = stage.getBoundingClientRect().height;
      layoutRef.current = { roomTop: roomBox.top + window.scrollY, stageHeight, pinnedFor: roomBox.height - stageHeight };
      const isCarried = isTransformed(stage) && layoutRef.current.pinnedFor > 1;
      isCarriedOnScroll = isCarried && !canScrollDrive;
      if (isCarried) {
        carry();
      } else {
        stage.style.animation = "";
        stage.style.translate = "";
      }
      update();
    };

    // What's above the room settling (pictures loading, the language switching) moves where the carrying starts,
    // and what's on the stage changing size refits it
    const observer = new ResizeObserver(relayout);
    observer.observe(document.body);
    if (content) observer.observe(content);

    relayout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", relayout);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", relayout);
    };
  }, [count, fitsWindow, letsGoPastEnd, scrolledThrough, show]);

  // One step per gesture: the wheel's taken while the stage is pinned, a finger's swipe as it starts
  useEffect(() => {
    if (!stepsByGesture) return;
    const room = roomRef.current;
    let wheel = null;
    let swipe = null;
    // What's moving the page (the wheel, a finger, or anything else), whether a mouse button is held (dragging the
    // scrollbar), and where the scroll was at the last scroll, to see it come into the room
    let input = null;
    let isMouseDown = false;
    let lastScrollY = window.scrollY;
    let lastThrough = scrolledThrough().through;

    const isPinned = (through, pinnedFor) => !isLetGoRef.current && pinnedFor > 1 && through >= -1 && through <= pinnedFor + 1;
    // The step a gesture going down (1) or up (-1) takes the stage to from the one showing, or null past either end
    const nextStep = (direction) => {
      const index = shownRef.current + direction;
      return index >= 0 && index < count ? index : null;
    };

    // The page brought to a stop in the room, `by` back to where the stage pinned
    const halt = (by) => haltScroll(by, { isFling: input === "touch" });

    // Coming into the room, going down past where the stage pins or up past where it lets go. The nav coming and going
    // moves the pin too, so it only counts going the way the page scrolls. The page's own scrolling to a step is left be
    const onScroll = () => {
      const { through, pinnedFor } = scrolledThrough();
      const from = lastThrough;
      const isDown = window.scrollY > lastScrollY;
      lastThrough = through;
      lastScrollY = window.scrollY;
      if (isLetGoRef.current || pinnedFor <= 1 || takingRef.current || isMouseDown) return;
      if (isDown && from < 0 && through > 0) {
        halt(-through);
        if (firstStepOnEntry && shownRef.current === 0) take(1);
      } else if (!isDown && from > pinnedFor && through < pinnedFor) {
        halt(pinnedFor - through);
      }
    };

    const onWheel = (event) => {
      input = "wheel";
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const now = performance.now();
      const size = Math.abs(event.deltaY);
      const { through, pinnedFor } = scrolledThrough();
      const isIn = isPinned(through, pinnedFor);
      const isNew =
        !wheel ||
        now - wheel.lastAt > GESTURE_QUIET ||
        (now - wheel.startedAt > GESTURE_FIRST && size > wheel.lastSize * SURGE + SURGE_LEAST);
      if (isNew) wheel = { startedAt: now, hasComeIn: !isIn, isTaken: false };
      wheel.lastAt = now;
      wheel.lastSize = size;
      if (!isIn) return;
      // One that's come into the room stops there, and one that's been taken has done its step
      if (wheel.hasComeIn || wheel.isTaken) {
        wheel.isTaken = true;
        event.preventDefault();
        return;
      }
      const index = nextStep(Math.sign(event.deltaY));
      if (index === null) return;
      event.preventDefault();
      wheel.isTaken = true;
      take(index);
    };

    // A swipe is the stage's from its first move, so the page doesn't start scrolling under it; it takes its step once
    // the finger lifts
    const onTouchStart = (event) => {
      input = "touch";
      swipe = event.touches.length === 1 ? { y: event.touches[0].clientY, index: undefined } : null;
    };
    const onTouchMove = (event) => {
      if (!swipe) return;
      const by = swipe.y - event.touches[0].clientY;
      if (swipe.index === undefined && by !== 0) {
        const { through, pinnedFor } = scrolledThrough();
        swipe.index = isPinned(through, pinnedFor) ? nextStep(Math.sign(by)) : null;
      }
      if (swipe.index != null) event.preventDefault();
    };
    const onTouchEnd = () => {
      if (swipe?.index != null) take(swipe.index);
      swipe = null;
    };

    const onPointerDown = (event) => {
      if (event.pointerType === "touch") return;
      input = "other";
      isMouseDown = true;
    };
    const onPointerUp = () => (isMouseDown = false);
    const onKeyDown = () => (input = "other");

    // Listened to only while the room is near the window, as listeners that can hold up the scroll slow it down
    const listeners = [
      ["scroll", onScroll, { passive: true }],
      ["pointerdown", onPointerDown, { passive: true }],
      ["pointerup", onPointerUp, { passive: true }],
      ["keydown", onKeyDown, { passive: true }],
      ["wheel", onWheel, { passive: false }],
      ["touchstart", onTouchStart, { passive: true }],
      ["touchmove", onTouchMove, { passive: false }],
      ["touchend", onTouchEnd, { passive: true }],
      ["touchcancel", onTouchEnd, { passive: true }],
    ];
    const listen = (isOn) => {
      if (isOn) {
        lastScrollY = window.scrollY;
        lastThrough = scrolledThrough().through;
      }
      listeners.forEach(([type, listener, options]) =>
        isOn ? window.addEventListener(type, listener, options) : window.removeEventListener(type, listener, options),
      );
    };
    const observer = new IntersectionObserver(([entry]) => listen(entry.isIntersecting), { rootMargin: "50% 0px" });
    observer.observe(room);
    return () => {
      observer.disconnect();
      listen(false);
    };
  }, [count, stepsByGesture, firstStepOnEntry, scrolledThrough, take]);

  // A scroll setting off from the stage stopped at what comes next
  useEffect(() => {
    const room = roomRef.current;
    const stage = stageRef.current;
    const next = room?.nextElementSibling;
    if (!stopsAtNext || !next) return;
    let input = null;
    let fingers = 0;
    let lastScrollY = window.scrollY;
    // Whether the page is on the move (it's scrolled lately, or a finger is on it), whether this move set off from
    // the stage, and the last wheel event of a gesture that's been stopped, which has the rest of it to itself
    let isMoving = false;
    let isArmed = false;
    let stoppedWheelAt = null;
    let timer;

    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (fingers > 0) return;
        isMoving = false;
        isArmed = false;
      }, SETTLED);
    };
    const stopLine = () => NAV_HEIGHT + FIT_MARGIN;

    // The rest of a stopped wheel gesture goes nowhere, until the wheel's been still
    const onStoppedWheel = (event) => {
      const now = performance.now();
      if (now - stoppedWheelAt > GESTURE_QUIET) {
        window.removeEventListener("wheel", onStoppedWheel);
        stoppedWheelAt = null;
        return;
      }
      stoppedWheelAt = now;
      event.preventDefault();
    };

    const onScroll = () => {
      const isDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;
      if (!isMoving) {
        isMoving = true;
        // Setting off down the page with the stage still in the window and what's next yet to reach the top
        isArmed = isDown && stage.getBoundingClientRect().bottom > 0 && next.getBoundingClientRect().top > stopLine();
      }
      settle();
      if (!isDown) isArmed = false;
      if (!isArmed || fingers > 0) return;
      const nextTop = next.getBoundingClientRect().top;
      if (nextTop > stopLine()) return;
      isArmed = false;
      haltScroll(nextTop - stopLine(), { isFling: input === "touch" });
      if (input === "wheel") {
        stoppedWheelAt = performance.now();
        window.addEventListener("wheel", onStoppedWheel, { passive: false });
      }
    };
    const onWheel = () => (input = "wheel");
    const onTouch = (event) => {
      input = "touch";
      fingers = event.touches.length;
      if (fingers > 0) isMoving = true;
      settle();
    };
    const onOther = () => (input = "other");

    const listeners = [
      ["scroll", onScroll],
      ["wheel", onWheel],
      ["touchstart", onTouch],
      ["touchend", onTouch],
      ["touchcancel", onTouch],
      ["keydown", onOther],
      ["pointerdown", onOther],
    ];
    listeners.forEach(([type, listener]) => window.addEventListener(type, listener, { passive: true }));
    return () => {
      clearTimeout(timer);
      listeners.forEach(([type, listener]) => window.removeEventListener(type, listener));
      window.removeEventListener("wheel", onStoppedWheel);
    };
  }, [stopsAtNext]);

  // The room taken away once done with, at the first moment it can be without the page jumping
  const isLettingGo = isDone || isPastEnd;
  useEffect(() => {
    const stage = stageRef.current;
    const spacer = spacerRef.current;
    if (!isLettingGo || !spacer || spacer.hidden) return;
    let fingers = 0;
    let timer;

    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(letGo, SETTLED);
    };
    const onTouch = (event) => {
      fingers = event.touches.length;
      settle();
    };
    const events = [
      ["scroll", settle],
      ["touchstart", onTouch],
      ["touchend", onTouch],
      ["touchcancel", onTouch],
    ];
    const stop = () => {
      clearTimeout(timer);
      events.forEach(([type, listener]) => window.removeEventListener(type, listener));
    };

    function letGo() {
      if (fingers > 0) return;
      const stageTop = stage.getBoundingClientRect().top;
      isLetGoRef.current = true;
      spacer.hidden = true;
      stage.style.animation = "";
      stage.style.translate = "";
      // The browser may move the scroll itself as the spacer goes (scroll anchoring), so the scroll is put right by
      // however far the stage then is from where it was
      window.scrollBy({ top: stage.getBoundingClientRect().top - stageTop, behavior: "instant" });
      stop();
    }

    events.forEach(([type, listener]) => window.addEventListener(type, listener, { passive: true }));
    settle();
    return stop;
  }, [isLettingGo]);

  // Scrolls to where a step rests, from wherever the reader is, pinned yet or not. Once the room's been let go of (or
  // where the stage can't pin) there's no scrolling to it, so the step is simply shown
  const goTo = useCallback(
    (index) => {
      if (isLetGoRef.current || layoutRef.current.pinnedFor <= 1) show(index);
      else take(index);
    },
    [show, take],
  );

  return { roomRef, stageRef, spacerRef, contentRef, step, goTo };
};

export default usePinnedSteps;
