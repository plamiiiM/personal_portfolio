import React from "react";
import { place, rem } from "./layout";

// One piece of a sticky note or cluster title: an image (paper, shadow, pen stroke), tape or text.
const Layer = ({ layer, as = "p", className = "" }) => {
  const style = { ...place(layer), opacity: layer.opacity };

  if (layer.type === "text") {
    const Text = as;
    return (
      <Text
        className={`absolute flex items-center justify-center text-center whitespace-pre leading-[normal] tracking-[0.07em] ${className}`}
        style={{
          ...style,
          fontFamily: `var(--font-${layer.font})`,
          fontWeight: layer.weight,
          fontSize: rem(layer.fontSize),
          color: layer.color,
        }}
      >
        {layer.text}
      </Text>
    );
  }

  if (layer.type === "tape") {
    return <div className={`absolute bg-(--tape) ${className}`} style={style} />;
  }

  return (
    <img
      src={`/skillset/${layer.src}`}
      alt=""
      className={`absolute max-w-none object-cover ${className}`}
      style={style}
    />
  );
};

export default Layer;
