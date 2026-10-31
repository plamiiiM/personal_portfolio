import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_HEIGHT } from "../global/layout";

// Room kept above and below a stage fitted into the window (screen px)
const FIT_MARGIN = 16;

// Where the browser can drive an animation by the scroll itself, the stage is carried along off the main thread, so it
// holds still under a finger on a touch screen instead of trailing the scroll a frame behind
const canScrollDrive = typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()");

// A wheel gesture (a turn of the wheel, or a swipe of the touchpad and its tail, the momentum after it) is over once the
// wheel has been still this long (ms)
const GESTURE_QUIET = 200;
// After the wheel takes a step, how long before a new swipe within the same gesture can take another (ms)
const STEP_LOCK = 300;
// A new swipe over the tail of the one before: the wheel's last few turns this much bigger than the ones before them,
// and at least this big (px), once the one before has died down to under this share of the biggest turn it had
const SURGE = 1.5;
const SURGE_LEAST = 8;
const DIED_DOWN = 0.5;
// How many of the wheel's latest turns are kept to tell those apart
const TURNS_KEPT = 10;
// The scroll to a step that's been taken gets this long to reach it, before the scroll has its say again (ms)
const TAKING_FOR = 1000;
// The longest the wheel is held back for while the page glides on to what comes after the room (ms). The browser's
// smooth scroll is usually over sooner
const GLIDE = 1000;
// Nothing scrolling and no finger on the screen for this long, so the scroll can be put right (ms)
const SETTLED = 150;

// `turns` are how far the wheel's latest turns would have scrolled
const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const isSpeedingUp = (turns) => {
  if (turns.length < TURNS_KEPT) return false;
  const latest = average(turns.slice(-5));
  return latest > SURGE_LEAST && latest > SURGE * average(turns.slice(0, -5));
};
// The tail of a swipe dying down, rather than a new swipe or a wheel kept turning: its latest turn smaller than the few
// before it
const isDyingDown = (turns) => turns.length > 1 && turns.at(-1) < average(turns.slice(-6, -1));
// A turn of the wheel added to a held swipe's ({ turns, peak, sincePeak }), and whether it's a new swipe over that one's
// tail, to be taken like a new gesture, as a pause would be: the latest few turns speeding up from the ones before
// them. Those are to be the held one's tail, so it's to have peaked before them and died down since, and an uneven rise
// of its own (a slow drag speeding up) isn't one. Its peak is the biggest of the turns before the latest few, and
// sincePeak how many of those have come since, so a new swipe bigger than the held one doesn't hide itself
const isNewSwipe = (swipe, event) => {
  swipe.turns.push(Math.abs(event.deltaY));
  if (swipe.turns.length > TURNS_KEPT) swipe.turns.shift();
  // The turn just gone from the latest few to the ones before them
  const older = swipe.turns.at(-6);
  if (older > swipe.peak) Object.assign(swipe, { peak: older, sincePeak: 0 });
  else if (older !== undefined) swipe.sincePeak++;
  const before = swipe.turns.slice(0, -5);
  return swipe.sincePeak >= before.length && isSpeedingUp(swipe.turns) && average(before) < DIED_DOWN * swipe.peak;
};

// The page has been, or is being, taken to `to` (its scroll) by the page itself, with nothing moving on the screen but
// the step (the stage pinned, or the room shrinking by as much). That's told to the nav with a "scrollshift" event, so
// it doesn't take the page getting there for the reader scrolling and come or go (see navbar)
const tellShifting = (to) => window.dispatchEvent(new CustomEvent("scrollshift", { detail: to }));
// The page scrolled `by` at once
const shiftScroll = (by) => {
  const from = window.scrollY;
  window.scrollBy({ top: by, behavior: "instant" });
  if (window.scrollY !== from) tellShifting(window.scrollY);
};
// The page scrolled `by` smoothly, by the browser itself as a finger would scroll it (at once with reduced motion)
const glideScroll = (by) => {
  const end = document.documentElement.scrollHeight - window.innerHeight;
  tellShifting(Math.min(end, Math.max(0, window.scrollY + by)));
  window.scrollBy({ top: by });
};

// What last moved the page: the wheel, a finger ("touch"), or anything else (a key, the scrollbar). Followed all along,
// not only near a room, as a finger's fling can carry the page into one long after the finger was put down
let lastInput = null;
[["wheel", "wheel"], ["touchstart", "touch"], ["keydown", "other"]].forEach(([type, input]) =>
  window.addEventListener(type, () => (lastInput = input), { passive: true, capture: true }),
);
window.addEventListener("pointerdown", (event) => event.pointerType !== "touch" && (lastInput = "other"), {
  passive: true,
  capture: true,
});
const isFinger = () => lastInput === "touch";

// A finger's fling glides on whatever the page asks, so the page can't scroll for a moment, which ends it, and then
// `then` goes on. That's until the next frame: scroll events come just before this frame's animation callbacks, and the
// browser has to have drawn a frame that can't scroll to stop the fling
const stopFling = (then) => {
  const root = document.documentElement;
  if (root.style.overflow) return then();
  root.style.overflow = "hidden";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      root.style.overflow = "";
      then();
    }),
  );
};

// A wheel event kept from scrolling the page. Only a gesture whose first turn was cancelled can be cancelled after it
// (otherwise the browser scrolls the rest on its own), so for the rest the page can't scroll at all, until the wheel
// has been still for a moment or the gesture is let be. The native scrollbar is hidden, so nothing shifts as it goes
let isWheelLocked = false;
let unlocking;
const lockForWheel = (locks) => {
  clearTimeout(unlocking);
  if (locks) unlocking = setTimeout(() => lockForWheel(false), GESTURE_QUIET);
  if (isWheelLocked === locks) return;
  isWheelLocked = locks;
  document.documentElement.style.overflow = locks ? "hidden" : "";
};
const holdWheel = (event) => {
  if (event.cancelable) event.preventDefault();
  else lockForWheel(true);
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
// moves through `count` steps. Picking a step glides to it (goTo), so the scroll and what's showing never disagree.
// With `fitsWindow`, what's on the stage (contentRef) is shrunk if need be so all of it fits in the window under the
// nav, its title too, and the stage takes the shrunk height. It's refitted whenever what's on it changes size (pictures
// loading, the language switching), so the stage is to keep the same height from one step to the next.
// With `stepsByGesture`, while the stage is pinned a scroll gesture (a turn of the wheel, a swipe of the touchpad with
// its glide, or of a finger) takes it one step on or back, however far it would have scrolled, so no step can be
// scrolled past unseen. The step changes as the gesture's taken, and for the wheel the page scrolls on to where it rests
// behind it; for a finger the page isn't moved at all (an iPhone flashes a pinned stage when the page is moved under it).
// A new swipe of the touchpad over the tail of the last one counts as a new gesture, as a turn of a mouse wheel after a
// pause does: it takes another step, or once the room's let go of the stage, scrolls on.
// Whatever brings the page into the room stops there, on the step it came to, however hard it was going: the rest of a
// wheel's gesture is held back, and anything else (a finger's fling gliding on, a key, a scrollbar let go of) is
// stopped where the stage pins. With `firstStepOnEntry` coming into the room from above also takes the stage on to the
// first step after the one it starts on, for a stage that starts empty. Past the last step (or before the first) the
// page scrolls on as usual, straight away.
// With `onlyForward`, steps stay once they're in: the step never goes back, and a gesture back up scrolls on up as
// usual straight away, as there's nothing to go back through (the wheel's skips back to where the stage pinned first;
// a finger's stage is still there).
// With `glidesToNext`, the gesture that moves on past the last step glides the page on to what comes after the room
// instead, and it stops with that in the middle of the window, so a strong swipe can't go past it unseen either.
// That's told with a "glide" event, whose `detail.top` is where its top comes to rest (screen px down the window), so it
// can play in fully on the way. Only the tail of that swipe is held back once it's there: scrolling on goes on at once.
// The room keeps its length, scrolling back up too, which takes the steps back the way they came, until with
// `onlyForward` the last step is in, or with `letsGoPastEnd` the reader has scrolled on past the last step: then it's
// taken away (spacerRef), so the page scrolls past the stage as usual and the stage stays on the step it's on. That's
// done with the page scrolled back by as much, so nothing moves on the screen, and only once nothing has scrolled for a
// moment. A glide takes it away as it sets off. A finger's stage is still where it pinned, at the start of its room, so
// for a finger the page needn't be moved at all.
// In the transformed page the stage is carried down its room by hand, so it pins there too: a stage that's to pin
// there leaves its spacer showing, and is static instead of sticky
const usePinnedSteps = (
  count,
  {
    fitsWindow = false,
    stepsByGesture = false,
    firstStepOnEntry = false,
    onlyForward = false,
    glidesToNext = false,
    letsGoPastEnd = false,
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

  // The step shown, and the page scrolled to where it rests, the step kept showing on the way. While the stage is pinned
  // nothing but the step changes on the screen, so the wheel's step is scrolled to at once, and a click's glides there
  // (`glides`), as does one from outside the room (a step picked before the stage has pinned).
  // A finger's step (`byFinger`) doesn't move the page at all: an iPhone flashes a pinned stage when the page is moved
  // at once under it. The stage stays at the start of its room, where it pinned (the page glides there if it isn't),
  // which is also where the room can be let go of without moving the page (see letGo), and the step's kept showing until
  // the page moves on. With `stopsFling` a fling bringing the page in is stopped first
  const take = useCallback(
    (index, { byFinger = false, glides = false, stopsFling = false } = {}) => {
      takingRef.current = { index, until: byFinger ? Infinity : performance.now() + TAKING_FOR };
      show(index);
      const scroll = () => {
        const { through, pinnedFor } = scrolledThrough();
        const by = restOf(byFinger ? 0 : index, count, pinnedFor) - through;
        if (byFinger && Math.abs(by) < 1) return;
        if (byFinger || glides || through < -1 || through > pinnedFor + 1) glideScroll(by);
        else shiftScroll(by);
      };
      if (stopsFling) stopFling(scroll);
      else scroll();
    },
    [count, scrolledThrough, show],
  );

  // The room taken away, with the page scrolled back by as much, so nothing moves on the screen
  const letGo = useCallback(() => {
    const stage = stageRef.current;
    const from = window.scrollY;
    const stageTop = stage.getBoundingClientRect().top;
    isLetGoRef.current = true;
    spacerRef.current.hidden = true;
    stage.style.animation = "";
    stage.style.translate = "";
    // The browser may move the scroll itself as the spacer goes (scroll anchoring), so the scroll is put right by
    // however far the stage then is from where it was
    window.scrollBy({ top: stage.getBoundingClientRect().top - stageTop, behavior: "instant" });
    if (window.scrollY !== from) tellShifting(window.scrollY);
  }, []);

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

    // At most once a frame, however many scroll events come in, and only from the room coming into the window to it
    // being a window past it, going by where it was laid out: before that the stage is on its first step, and after,
    // measuring it would only have the page lay itself out, which costs every frame of a scroll elsewhere (the page
    // gliding to the hypothesis on a phone). Once the room's been let go of the stage stays on the step it was on
    const update = () => {
      frame = null;
      const { roomTop, stageHeight, pinnedFor } = layoutRef.current;
      const roomScreenTop = roomTop - window.scrollY;
      if (roomScreenTop > window.innerHeight || roomScreenTop + stageHeight + pinnedFor < -window.innerHeight) return;
      if (isCarriedOnScroll) carry();
      if (isLetGoRef.current) return;
      const scrolledTo = stepAt(room, stage, count);
      const index = onlyForward ? Math.max(shownRef.current, scrolledTo) : scrolledTo;
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
  }, [count, fitsWindow, onlyForward, letsGoPastEnd, scrolledThrough, show]);

  // One step per gesture: the wheel's taken while the stage is pinned, a finger's swipe as it starts
  useEffect(() => {
    if (!stepsByGesture) return;
    const room = roomRef.current;
    // The wheel's gesture going on, the finger's swipe, and the glide going on
    let gesture = null;
    let swipe = null;
    let glide = null;
    // Whether a mouse button is held (dragging the scrollbar), and where the scroll was at the last scroll, to see it come
    // into the room
    let isMouseDown = false;
    let lastScrollY = window.scrollY;
    let lastThrough = scrolledThrough().through;

    const isPinned = (through, pinnedFor) => !isLetGoRef.current && pinnedFor > 1 && through >= -1 && through <= pinnedFor + 1;
    // Where a gesture going down (1) or up (-1) takes the stage from the step showing: to another step (its index), on
    // to what comes after the room ("glide"), or nowhere (null), the page scrolling on as usual
    const nextStep = (direction) => {
      if (onlyForward && direction < 0) return null;
      const index = shownRef.current + direction;
      if (index >= 0 && index < count) return index;
      return glidesToNext && index === count && room.nextElementSibling ? "glide" : null;
    };

    // The page glides on until what comes after the room is in the middle of the window (or its top at the top, if it's
    // taller than the window), scrolled smoothly by the browser itself, so it stays smooth however busy the page is. The
    // room lets go of the stage first, as that moves the scroll, which would cut the glide short
    const glideOn = () => {
      const next = room.nextElementSibling;
      letGo();
      const box = next.getBoundingClientRect();
      const top = Math.max(0, (window.innerHeight - box.height) / 2);
      next.dispatchEvent(new CustomEvent("glide", { detail: { top } }));
      glide = { to: window.scrollY + box.top - top, until: performance.now() + GLIDE };
      window.scrollBy({ top: box.top - top });
    };
    const goOn = (to) => (to === "glide" ? glideOn() : take(to, { byFinger: isFinger() }));
    // Going back up from steps that stay once in, the stage is put straight back where it pinned, so the wheel scrolls on
    // up at once
    const skipBack = (through) => shiftScroll(-through);

    // Brought into the room, the page is stopped where the step showing rests, or the first step after it for an empty
    // stage come in from above. A finger's fling is stopped, and the page glides back to where the stage pinned
    const comeIn = (isFromAbove) => {
      const index = isFromAbove && firstStepOnEntry && shownRef.current === 0 ? 1 : shownRef.current;
      take(index, { byFinger: isFinger(), stopsFling: isFinger() });
    };

    // Coming into the room, going down past where the stage pins or up past where it lets go (where there are steps to go
    // back through). The nav coming and going moves the pin too, so it only counts going the way the page scrolls. The
    // page's own scrolling to a step is left be
    const onScroll = () => {
      const { through, pinnedFor } = scrolledThrough();
      const from = lastThrough;
      const isDown = window.scrollY > lastScrollY;
      lastThrough = through;
      lastScrollY = window.scrollY;
      if (isLetGoRef.current || pinnedFor <= 1 || takingRef.current || isMouseDown) return;
      if (isDown && from < 0 && through > 0) {
        // A finger dragging the page in is left be, and its fling stopped once it lifts (see onTouchEnd)
        if (swipe) {
          swipe.cameIn = true;
          return;
        }
        comeIn(true);
      } else if (!isDown && !onlyForward && from > pinnedFor && through < pinnedFor) {
        comeIn(false);
      }
    };

    const onWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const { through, pinnedFor } = scrolledThrough();
      const isIn = isPinned(through, pinnedFor);
      const now = performance.now();

      // Gestures are told apart by when their turns were made, not when they're seen, so a busy page can't split one.
      // A gesture: when its last turn was, whether the page is held still for it and since when, whether it's been
      // outside the room since it was last stopped in it, whether it glided ("during" one, or "setOff" one), and its
      // latest turns since it was held, and the biggest of them (see isNewSwipe)
      const isNew = !gesture || event.timeStamp - gesture.lastAt > GESTURE_QUIET;
      if (isNew) gesture = { lastAt: 0, isHeld: false, heldAt: 0, wasOutside: false, glided: null, turns: [], peak: 0, sincePeak: 0 };
      gesture.lastAt = event.timeStamp;
      if (!isIn) gesture.wasOutside = true;
      const isSwipedOn = isNewSwipe(gesture, event) && gesture.isHeld;
      const hold = () => Object.assign(gesture, { isHeld: true, heldAt: event.timeStamp, turns: [], peak: 0, sincePeak: 0 });

      if (glide && (now > glide.until || Math.abs(window.scrollY - glide.to) < 1)) glide = null;
      if (glide) {
        // Nothing else moves the page while it glides
        gesture.isHeld = true;
        gesture.glided ??= "during";
      } else if (gesture.glided) {
        // Once it's glided, only the tail of the swipe that set it off is held back, while it dies down. Anything else
        // (a swipe on, or made while it glided, or a wheel kept turning) scrolls on at once
        gesture.isHeld &&= gesture.glided === "setOff" && isDyingDown(gesture.turns);
      } else if (isIn && (isNew || (isSwipedOn && event.timeStamp - gesture.heldAt > STEP_LOCK))) {
        // A new gesture (or a new swipe over the tail of the last) takes the next step on from the one showing
        const direction = Math.sign(event.deltaY);
        const to = nextStep(direction);
        if (to !== null) {
          hold();
          if (to === "glide") gesture.glided = "setOff";
          goOn(to);
        } else {
          gesture.isHeld = false;
          if (onlyForward && direction < 0) skipBack(through);
        }
      } else if (isSwipedOn && !isIn) {
        // The room's let go of the stage since (its last step's in), so a new swipe scrolls on, as a new gesture would
        gesture.isHeld = false;
      } else if (isIn && gesture.wasOutside && !gesture.isHeld) {
        // Brought into the room (and stopped where it pins, see onScroll): the rest of the gesture is held back, and the
        // stage put where its step rests, in case the page went on in before it was held, or on to the first step if
        // it's come in from above to an empty stage (in case it came in here, not by a scroll). Only once, so the same
        // gesture scrolling on past the last step isn't brought back
        hold();
        gesture.wasOutside = false;
        take(firstStepOnEntry && shownRef.current === 0 && event.deltaY > 0 ? 1 : shownRef.current);
      }

      // Let be, the page scrolls on with the rest of the gesture
      if (gesture.isHeld) holdWheel(event);
      else lockForWheel(false);
    };

    // A swipe is the stage's from its first move, so the page doesn't start scrolling under it; it takes its step once
    // the finger lifts. One that's dragged the page into the room is stopped there as it lifts, rather than flinging on
    // through the steps. One that has no step to take scrolls the page as usual (with steps that stay once in, going
    // back up through them)
    const onTouchStart = (event) => {
      swipe = event.touches.length === 1 ? { y: event.touches[0].clientY, to: undefined } : null;
    };
    const onTouchMove = (event) => {
      if (!swipe) return;
      const by = swipe.y - event.touches[0].clientY;
      if (swipe.to === undefined && by !== 0) {
        const { through, pinnedFor } = scrolledThrough();
        swipe.to = isPinned(through, pinnedFor) ? nextStep(Math.sign(by)) : null;
      }
      if (swipe.to != null) event.preventDefault();
    };
    const onTouchEnd = () => {
      if (swipe?.to != null) goOn(swipe.to);
      else if (swipe?.cameIn) {
        const { through, pinnedFor } = scrolledThrough();
        if (isPinned(through, pinnedFor)) comeIn(true);
      }
      swipe = null;
    };

    const onPointerDown = (event) => {
      if (event.pointerType !== "touch") isMouseDown = true;
    };
    const onPointerUp = () => (isMouseDown = false);

    // Listened to only while the room is near the window, as listeners that can hold up the scroll slow it down
    const listeners = [
      ["scroll", onScroll, { passive: true }],
      ["pointerdown", onPointerDown, { passive: true }],
      ["pointerup", onPointerUp, { passive: true }],
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
      lockForWheel(false);
    };
  }, [count, stepsByGesture, firstStepOnEntry, onlyForward, glidesToNext, scrolledThrough, take, letGo]);

  // The room taken away once done with, at the first moment it can be without the page jumping: once nothing has
  // scrolled for a moment
  const isLettingGo = isPastEnd || (onlyForward && step === count - 1);
  useEffect(() => {
    const spacer = spacerRef.current;
    if (!isLettingGo || !spacer || spacer.hidden) return;
    let timer;
    const stop = () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", settle);
    };
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        stop();
        if (!spacer.hidden) letGo();
      }, SETTLED);
    };
    window.addEventListener("scroll", settle, { passive: true });
    settle();
    return stop;
  }, [isLettingGo, letGo]);

  // Glides to where a step rests, from wherever the reader is, pinned yet or not. Once the room's been let go of (or
  // where the stage can't pin) there's no scrolling to it, so the step is simply shown
  const goTo = useCallback(
    (index) => {
      if (isLetGoRef.current || layoutRef.current.pinnedFor <= 1) show(index);
      else take(index, isFinger() ? { byFinger: true } : { glides: true });
    },
    [show, take],
  );

  return { roomRef, stageRef, spacerRef, contentRef, step, goTo };
};

export default usePinnedSteps;
