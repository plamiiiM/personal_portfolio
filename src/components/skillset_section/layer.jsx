import React from "react";
import { place, rem } from "./layout";

// Text style shared by every sticky note; the cluster titles set their own in skills_data.js.
const NOTE_TEXT = { font: "plamenas", fontSize: 31 };

// One piece of a sticky note or cluster title: an image (paper, shadow, pen stroke) or text.
const Layer = ({ layer, as = "p" }) => {
  const style = place(layer);

  if (layer.type === "text") {
    const Text = as;
    const { font, weight, fontSize } = { ...NOTE_TEXT, ...layer };
    return (
      <Text
        className="absolute flex items-center justify-center text-center whitespace-pre leading-[normal] tracking-[0.07em]"
        style={{
          ...style,
          fontFamily: `var(--font-${font})`,
          fontWeight: weight,
          fontSize: rem(fontSize),
        }}
      >
        {layer.text}
      </Text>
    );
  }

  return (
    <img
      src={`/skillset/${layer.src}`}
      alt=""
      className="absolute max-w-none object-cover"
      style={style}
    />
  );
};

export default Layer;
