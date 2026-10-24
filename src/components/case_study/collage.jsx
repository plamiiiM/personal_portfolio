import React from "react";
import { place, rem } from "../global/layout";

// Overlapping pictures laid out like the Figma design. Each item is a box in Figma px measured from the
// collage's top-left corner (it can reach outside it) and fills the whole collage when left out.
// An item without a src is a plain box: give it `content` to write on the collage, or a className for
// effects like a frosted panel.
const Collage = ({ width, height, items, loading = "lazy", className = "" }) => {
  return (
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
};

export default Collage;
