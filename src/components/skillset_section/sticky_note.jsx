import React from "react";
import Layer from "./layer";
import { place } from "./layout";

// Hover: the note lifts off the page and its shadow falls further away. The note's box ignores
// the pointer and only its paper, tape and text catch it, so the transparent corners of
// overlapping notes don't steal each other's hover.
const LIFT =
  "transition-[translate,scale,rotate] duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-105 motion-reduce:transition-none";
const TILT = { left: "hover:-rotate-2", right: "hover:rotate-2" };
const SHADOW_DROP =
  "transition-[translate] duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-3 motion-reduce:transition-none";

const StickyNote = ({ note, tilt = "left" }) => {
  return (
    <li
      className={`group absolute pointer-events-none ${LIFT} ${TILT[tilt]}`}
      style={place(note)}
    >
      {note.layers.map((layer, index) => (
        <Layer
          key={index}
          layer={layer}
          className={layer.type === "shadow" ? SHADOW_DROP : "pointer-events-auto"}
        />
      ))}
    </li>
  );
};

export default StickyNote;
