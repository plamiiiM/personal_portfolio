import React from "react";
import FitToWidth from "../global/fit_to_width";
import InView from "../global/in_view";
import { place, rem } from "../global/layout";

const STAGGER = 100; // ms between the pieces of a collage that come into view together

// Consecutive items that share a `note` (a sticky note: its paper, shadow and writing) or a `group` (a picture with
// something laid over it) come in as one piece, so their parts never drift apart
const piecesOf = (items) =>
  items.reduce((pieces, item) => {
    const key = item.note ?? item.group;
    const last = pieces.at(-1);
    if (key && last?.key === key) last.items.push(item);
    else pieces.push({ key, isNote: item.note != null, items: [item] });
    return pieces;
  }, []);

// The box around some items (before their rotation)
const boundsOf = (items) => {
  const x = Math.min(...items.map((item) => item.x));
  const y = Math.min(...items.map((item) => item.y));
  const right = Math.max(...items.map((item) => item.x + item.w));
  const bottom = Math.max(...items.map((item) => item.y + item.h));
  return { x, y, w: right - x, h: bottom - y };
};

// The collage's items placed in a box of the given size. Each piece sits in a box of its own that comes in as it
// scrolls into view: a picture eases in, a sticky note is stuck on like the skillset's
const Arrangement = ({ width, height, items, loading, className = "" }) => {
  const boxed = items.map(({ x = 0, y = 0, w = width, h = height, ...item }) => ({ ...item, x, y, w, h }));

  return (
    <div className={`relative ${className}`} style={{ width: rem(width), height: rem(height) }}>
      {piecesOf(boxed).map(({ isNote, items: parts }, index) => {
        const bounds = boundsOf(parts);
        return (
          <InView
            key={index}
            className={`absolute ${isNote ? "stick" : "soft-in"}`}
            style={{ ...place(bounds), transitionDelay: `${index * STAGGER}ms` }}
          >
            {parts.map(({ src, still, alt = "", content, className: itemClassName = "", ...box }, partIndex) => {
              const style = place({ ...box, x: box.x - bounds.x, y: box.y - bounds.y });
              const image = src && (
                <img
                  key={partIndex}
                  src={src}
                  alt={alt}
                  loading={loading}
                  decoding="async"
                  className={`absolute max-w-none ${itemClassName}`}
                  style={style}
                />
              );

              return still ? (
                <picture key={partIndex}>
                  <source media="(prefers-reduced-motion: reduce)" srcSet={still} />
                  {image}
                </picture>
              ) : src ? (
                image
              ) : (
                <div key={partIndex} className={`absolute ${itemClassName}`} style={style} aria-hidden={!content}>
                  {content}
                </div>
              );
            })}
          </InView>
        );
      })}
    </div>
  );
};

// Overlapping pictures laid out like the Figma design. Each item is a box in Figma px measured from the
// collage's top-left corner (it can reach outside it) and fills the whole collage when left out.
// An animated picture can bring a `still` one to show instead with reduced motion.
// An item without a src is a plain box: give it `content` to write on the collage, or a className for
// effects like a frosted panel.
// In the phone layout it's centred in the column and shrinks as a whole when it's wider than the column.
// Where that would make it too small to read, `phone` re-arranges it for phones: { width, height, shifts }, a
// collage of that size where each item moves by its [dx, dy] in Figma px, or is left out with null.
// Whatever falls outside the phone arrangement is cut off, so it can also just crop the collage
const Collage = ({ width, height, items, phone, loading = "lazy", className = "" }) => {
  if (!phone) {
    return (
      <FitToWidth className={`max-lg:mx-auto ${className}`}>
        <Arrangement width={width} height={height} items={items} loading={loading} />
      </FitToWidth>
    );
  }

  const phoneItems = items.flatMap((item, index) => {
    const shift = phone.shifts[index];
    if (!shift) return [];
    const { x = 0, y = 0, w = width, h = height } = item;
    return [{ ...item, x: x + shift[0], y: y + shift[1], w, h }];
  });

  return (
    <>
      <FitToWidth className={`max-lg:hidden ${className}`}>
        <Arrangement width={width} height={height} items={items} loading={loading} />
      </FitToWidth>
      <FitToWidth className={`lg:hidden mx-auto ${className}`}>
        <Arrangement width={phone.width} height={phone.height} items={phoneItems} loading={loading} className="overflow-clip" />
      </FitToWidth>
    </>
  );
};

export default Collage;
