import React, { useEffect, useRef } from "react";
import ExperienceCard from "./experience_card_component";
import MarkedWord from "../global/marked_word_component";
import { rem } from "../global/layout";
import useLanguage from "../global/use_language";
import HandLetteredHeading from "../global/hand_lettered_heading";

// Oldest first, so the trail leads from the start of the journey to what comes next.
// x is where the stop sits across the section on wider screens (px of the 1530px-wide layout), so the trail winds
// from one to the next. The phone layout lines them all up on the left.
// The text is in both languages ({ en, bg }), picked with t() when rendered
const STOPS = [
  {
    x: 0,
    year: "2023",
    sentence: { en: "Currently obtaining a Bachelor's degree in", bg: "В момента следвам бакалавърска програма по" },
    role: { en: "ICT & Media Design", bg: "ICT & Media Design" },
    at: { en: "at", bg: "във" },
    company: "Fontys University of Applied Sciences",
    date: { en: "Sept 2023 - July 2027", bg: "септ. 2023 – юли 2027" },
  },
  {
    x: 480,
    year: "2025",
    sentence: { en: "Completed an internship as a", bg: "Завърших стаж като" },
    role: { en: "UX/ UI Designer", bg: "UX/UI дизайнер" },
    at: { en: "at", bg: "в" },
    company: "Spinnov",
    date: { en: "Sept 25- Jan 26", bg: "септ. 2025 – ян. 2026" },
    nameEmployer: "Chris Heger",
    positionEmployer: "COO",
    imageOfEmployer: "/chris_photo.webp",
    recommendation: {
      en: "Plamena did her internship with us (Spinnov) as an UI/UX designer and front-end software developer. She worked very structured and with great discipline, open to feedback, good tempo in her work and not afraid to take on different design challenges. She worked well in our project team and functioned as a full team member despite being an intern.",
      bg: "Пламена проведе стажа си при нас (Spinnov) като UI/UX дизайнер и front-end разработчик. Работеше много структурирано и с голяма дисциплина, беше отворена към обратна връзка, поддържаше добро темпо и не се страхуваше да поема различни дизайн предизвикателства. Работеше добре в проектния ни екип и беше пълноценен член на екипа, въпреки че беше стажантка.",
    },
    showRecommendation: true,
  },
];
// Where the X sits, like the stops' x
const DESTINATION_X = 224;

const SWAY = 16; // px the trail bends to either side, so it snakes along like a path on a map
const BEND_EVERY = 110; // px of trail per bend
const DRAW_LINE = 0.65; // the trail draws itself down to this far down the window
const GLIDE = 0.3; // s, how quickly the drawn trail catches up with the scroll (it eases out, so it never stalls)
const MIN_SPEED = 400; // px/s it keeps up at the end of a glide, so the last bit doesn't crawl in
const SAMPLE_STEP = 6; // px along the trail between the points kept to tell how much of it lies above a line

// Each stop's marker and the foot of its entry, in px of the map (the X's marker is its top, where the trail ends).
// getBoundingClientRect is in screen px, while lengths in the map get shrunk (ScaleToFit), so it's turned back into page px
const measureStops = (map, stops, zoom) => {
  const origin = map.getBoundingClientRect();
  const at = (rect, fx, fy) => ({
    x: (rect.left + rect.width * fx - origin.left) / zoom,
    y: (rect.top + rect.height * fy - origin.top) / zoom,
  });
  return stops.map((stop, i) => {
    const marker = at(stop.querySelector("[data-marker]").getBoundingClientRect(), 0.5, i === stops.length - 1 ? 0 : 0.5);
    return { marker, foot: { x: marker.x, y: at(stop.getBoundingClientRect(), 0, 1).y } };
  });
};

// Points every BEND_EVERY px or so on the way from one waypoint to the next, swaying to alternate sides of the
// straight line between them. The first bend goes to the side further down the map, which is away from the entries:
// to the left where it heads straight down beside one, and below the line where it crosses over to the next
const bendsBetween = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  const flip = dx < 0 ? -1 : 1;
  const side = { x: (-dy / length) * flip, y: (dx / length) * flip };
  const count = Math.max(1, Math.floor(length / BEND_EVERY));
  return Array.from({ length: count }, (_, k) => {
    const along = (k + 1) / (count + 1);
    const sway = k % 2 ? -SWAY : SWAY;
    return { x: from.x + dx * along + side.x * sway, y: from.y + dy * along + side.y * sway };
  });
};

// In from the top of the map, then through each marker and down beside its entry, and from the foot of one entry
// over to the next marker, bending along the way
const waypoints = (positions) => {
  const points = [{ x: positions[0].marker.x, y: 0 }];
  const goTo = (point) => points.push(...bendsBetween(points.at(-1), point), point);
  positions.forEach(({ marker, foot }, i) => {
    goTo(marker);
    if (i < positions.length - 1) goTo(foot);
  });
  return points;
};

// A smooth curve through the waypoints that flows through each one the way it's going (a Catmull-Rom spline),
// so it never turns a corner
const curveThrough = (points) =>
  points.reduce((d, b, i) => {
    if (i === 0) return `M ${b.x} ${b.y}`;
    const a = points[i - 1];
    const before = points[i - 2] ?? a;
    const after = points[i + 1] ?? b;
    return `${d} C ${a.x + (b.x - before.x) / 6} ${a.y + (b.y - before.y) / 6} ${b.x - (after.x - a.x) / 6} ${b.y - (after.y - a.y) / 6} ${b.x} ${b.y}`;
  }, "");

const sampleTrail = (path) => {
  const total = path.getTotalLength();
  const samples = [];
  for (let length = 0; length < total; length += SAMPLE_STEP) samples.push({ length, y: path.getPointAtLength(length).y });
  samples.push({ length: total, y: path.getPointAtLength(total).y });
  return samples;
};

// How much of the trail lies above y. It heads down the map (its bends barely turn back up),
// so that's how far along it first passes y
const lengthAbove = (samples, y) => {
  const after = samples.findIndex((sample) => sample.y > y);
  if (after === -1) return samples.at(-1).length;
  if (after === 0) return 0;
  const a = samples[after - 1];
  const b = samples[after];
  return a.length + ((y - a.y) / (b.y - a.y)) * (b.length - a.length);
};

// The reveal each stop's entry and the X's tag and line play once the trail reaches them (data-reached on the stop),
// skipped for a stop that was passed without being seen (data-instant)
const ARRIVE =
  "transition-[opacity,translate] ease-out motion-reduce:transition-none group-data-instant:transition-none group-data-reached:opacity-100 group-data-reached:translate-y-0";
const DRAW_STROKE =
  "[stroke-dasharray:1_2] [stroke-dashoffset:1.01] transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:transition-none group-data-instant:transition-none group-data-reached:[stroke-dashoffset:0]";

// A treasure map of the experience: a pencil trail that draws itself down the page as you scroll, filling in each stop
// as it reaches it, and ends at an X, where the reader is: the next role, at their company.
// It only ever grows, so what's been reached stays put when scrolling back up
const TimelineExperience = () => {
  const mapRef = useRef(null);
  const trailRef = useRef(null);
  const revealRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const map = mapRef.current;
    const trail = trailRef.current;
    const reveal = revealRef.current;
    const stops = [...map.querySelectorAll("[data-stop]")];
    const isStill = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let samples = [{ length: 0, y: 0 }];
    let stopLengths = [];
    let furthest = -Infinity; // the furthest down the map the draw line has been, in page px
    let drawn = 0;
    let target = 0;
    let frame;
    let lastTime;

    const zoomOf = () => parseFloat(getComputedStyle(map).getPropertyValue("--zoom")) || 1;
    const total = () => samples.at(-1).length;

    const render = () => {
      reveal.style.strokeDashoffset = total() - drawn;
      stops.forEach((stop, i) => stop.toggleAttribute("data-reached", drawn >= stopLengths[i] - 1));
    };

    // Eases towards the target over GLIDE seconds, however often the frames come
    const glide = (time) => {
      const seconds = (time - (lastTime ?? time)) / 1000;
      const gap = Math.abs(target - drawn);
      const step = Math.max(gap * (1 - Math.exp(-seconds / GLIDE)), MIN_SPEED * seconds);
      drawn = step >= gap ? target : drawn + Math.sign(target - drawn) * step;
      lastTime = time;
      render();
      frame = drawn === target ? undefined : requestAnimationFrame(glide);
      if (frame === undefined) lastTime = undefined;
    };

    const onScroll = () => {
      const mapTop = map.getBoundingClientRect().top / zoomOf();
      furthest = Math.max(furthest, window.innerHeight * DRAW_LINE / zoomOf() - mapTop);
      target = isStill ? total() : lengthAbove(samples, furthest);
      // What's above the top of the window was passed without being seen (the page opened further down, or a jump),
      // so it's simply there: drawn at once, with its stops filled in without their reveal (data-instant)
      const passed = Math.min(target, lengthAbove(samples, -mapTop));
      if (!isStill && drawn < passed) {
        drawn = passed;
        stops.forEach((stop, i) => {
          if (!stop.hasAttribute("data-reached") && drawn >= stopLengths[i] - 1) stop.setAttribute("data-instant", "");
        });
        render();
      }
      if (isStill) {
        drawn = target;
        render();
      } else if (frame === undefined && target !== drawn) {
        frame = requestAnimationFrame(glide);
      }
    };

    // Lays the trail through the stops wherever they've ended up. ResizeObserver also fires once on observe,
    // which does the initial measure
    const observer = new ResizeObserver(() => {
      const positions = measureStops(map, stops, zoomOf());
      const d = curveThrough(waypoints(positions));
      trail.setAttribute("d", d);
      reveal.setAttribute("d", d);
      samples = sampleTrail(trail);
      stopLengths = positions.map(({ marker }) => lengthAbove(samples, marker.y));
      reveal.style.strokeDasharray = `${total()} ${total() + 1}`;
      drawn = Math.min(drawn, total());
      render();
      onScroll();
    });
    observer.observe(map);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <HandLetteredHeading
        src="/experience_text.webp"
        alt="Experience"
        width={590}
        height={142}
        bgText="Опит"
        imageClassName="w-43.5 lg:w-72.5"
        className="-rotate-4"
      />

      <div ref={mapRef} className="relative mt-11 lg:mt-18">
        {/* The dashed pencil trail, shown only as far as the solid stroke in its mask has been drawn */}
        <svg className="absolute inset-0 size-full overflow-visible pointer-events-none text-(--pencilLine)" aria-hidden="true">
          <defs>
            <mask id="experience-trail-reveal" maskUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <path ref={revealRef} fill="none" stroke="white" strokeWidth="10" />
            </mask>
          </defs>
          <path
            ref={trailRef}
            mask="url(#experience-trail-reveal)"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="12 10"
            strokeLinecap="round"
          />
        </svg>

        <ol className="flex flex-col gap-y-16 lg:gap-y-36 pt-12 lg:pt-16">
          {STOPS.map(({ x, sentence, role, at, date, recommendation, ...entry }) => (
            <li key={entry.year} data-stop className="group relative pl-12 lg:ml-(--x)" style={{ "--x": rem(x) }}>
              {/* A pencil ring on the trail that fills in red once the trail gets there */}
              <span data-marker className="absolute left-0 top-1 size-6 rounded-full border-2 border-(--pencilLine)" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-(--red) scale-0 transition-transform duration-300 ease-out motion-reduce:transition-none group-data-instant:transition-none group-data-reached:scale-100" />
              </span>
              <div className={`opacity-0 translate-y-3 duration-700 ${ARRIVE}`}>
                <ExperienceCard
                  {...entry}
                  sentence={t(sentence)}
                  role={t(role)}
                  at={t(at)}
                  date={t(date)}
                  recommendation={recommendation && t(recommendation)}
                />
              </div>
            </li>
          ))}

          {/* Where the trail ends: an X drawn in two strokes, with a tag pinned beside it */}
          <li data-stop className="group relative pl-14 lg:pl-18 lg:ml-(--x)" style={{ "--x": rem(DESTINATION_X) }}>
            <svg
              data-marker
              viewBox="0 0 48 48"
              className="absolute -left-3 top-0 size-12 lg:-left-4 lg:top-1.5 lg:size-14 overflow-visible text-(--red)"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M 9 8 C 17 16 28 28 40 41" pathLength="1" className={DRAW_STROKE} />
              <path d="M 40 9 C 31 17 19 29 8 40" pathLength="1" className={`delay-250 ${DRAW_STROKE}`} />
            </svg>
            <div className="flex flex-col items-start gap-y-5 lg:gap-y-6">
              <p
                className={`w-fit -rotate-4 bg-[#faf8f8] px-3 py-2 lg:px-4 lg:py-3 font-plamenas text-[2rem] lg:text-[2.75rem] leading-none tracking-[0.03em]
                            shadow-[0_1.69px_1.69px_rgba(0,0,0,0.3),0_3.38px_5.06px_rgba(0,0,0,0.15)] opacity-0 -translate-y-2 duration-500 delay-500 ${ARRIVE}`}
              >
                {t({ en: "You are here", bg: "Вие сте тук" })}
              </p>
              <p className={`font-poppins text-[1.125rem] lg:text-[1.375rem] leading-8 lg:leading-10 opacity-0 translate-y-2 duration-500 delay-800 ${ARRIVE}`}>
                {t({
                  en: (
                    <>
                      My next journey: bringing my experience to <MarkedWord isHighlighted>your idea</MarkedWord>.
                    </>
                  ),
                  bg: (
                    <>
                      Следващото приключение: да вложа опита си във <MarkedWord isHighlighted>вашата идея</MarkedWord>.
                    </>
                  ),
                })}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
};

export default TimelineExperience;
