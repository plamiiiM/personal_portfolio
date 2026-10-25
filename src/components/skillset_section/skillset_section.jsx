import React from "react";
import Layer from "./layer";
import FitToWidth from "../global/fit_to_width";
import { rem } from "../global/layout";
import { SKILL_CLUSTERS } from "./skills_data";

// The box around a group of layers (before their rotation), so the group can be shown on its own
const boundsOf = (layers) => {
  const x = Math.min(...layers.map((layer) => layer.x));
  const y = Math.min(...layers.map((layer) => layer.y));
  const right = Math.max(...layers.map((layer) => layer.x + layer.w));
  const bottom = Math.max(...layers.map((layer) => layer.y + layer.h));
  return { x, y, w: right - x, h: bottom - y };
};

// A cluster title or sticky note on its own, cut out of the cluster and shrunk to the space it's given
const LayerGroup = ({ layers, as }) => {
  const box = boundsOf(layers);
  return (
    <FitToWidth className="mx-auto">
      <div className="relative" style={{ width: rem(box.w), height: rem(box.h) }}>
        {layers.map((layer, index) => (
          <Layer key={index} layer={{ ...layer, x: layer.x - box.x, y: layer.y - box.y }} as={as} />
        ))}
      </div>
    </FitToWidth>
  );
};

const SkillsetSection = () => {
  return (
    <section id="skills" className="flex flex-col items-center lg:mr-28">
      <div className="relative w-64 h-30 lg:w-85 lg:h-40 overflow-hidden">
        <img
          src="/skillset_text.png"
          alt="The heading of the section- Skillset"
          className="absolute left-0 top-[-26.3%] w-[113.5%] max-w-none"
        />
      </div>

      {/* Each cluster is laid out on the 1530px-wide Figma frame, centred on the section. */}
      <div className="hidden lg:flex flex-col items-center gap-y-60 mt-24">
        {SKILL_CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="relative w-[95.625rem] shrink-0"
            style={{ height: rem(cluster.height) }}
          >
            {cluster.title.map((layer, index) => (
              <Layer key={index} layer={layer} as="h3" />
            ))}
            <ul>
              {cluster.notes.map((note) => (
                <li
                  key={note.label}
                  className="absolute"
                  style={{ left: rem(note.x), top: rem(note.y) }}
                >
                  {note.layers.map((layer, index) => (
                    <Layer key={index} layer={layer} />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* A cluster doesn't fit the phone layout, so there its title comes first and its notes line up in a grid below */}
      <div className="lg:hidden flex w-full flex-col gap-y-16 mt-8">
        {SKILL_CLUSTERS.map((cluster) => (
          <div key={cluster.id}>
            <LayerGroup layers={cluster.title} as="h3" />
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4">
              {cluster.notes.map((note) => (
                <li key={note.label}>
                  <LayerGroup layers={note.layers} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsetSection;
