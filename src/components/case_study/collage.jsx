import React from "react";
import FitToWidth from "../global/fit_to_width";
import { place, rem } from "../global/layout";

// The collage's items placed in a box of the given size
const Arrangement = ({ width, height, items, loading, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: rem(width), height: rem(height) }}>
    {items.map(({ src, alt = "", content, className: itemClassName = "", ...box }, index) => {
      const style = place({ x: 0, y: 0, w: width, h: height, ...box });

      return src ? (
        <img
          key={index}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`absolute max-w-none ${itemClassName}`}
          style={style}
        />
      ) : (
        <div key={index} className={`absolute ${itemClassName}`} style={style} aria-hidden={!content}>
          {content}
        </div>
      );
    })}
  </div>
);

// Overlapping pictures laid out like the Figma design. Each item is a box in Figma px measured from the
// collage's top-left corner (it can reach outside it) and fills the whole collage when left out.
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
