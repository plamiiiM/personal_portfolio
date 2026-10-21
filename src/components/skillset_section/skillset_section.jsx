import React from "react";
import Layer from "./layer";
import { rem } from "./layout";
import { SKILL_CLUSTERS } from "./skills_data";

const SkillsetSection = () => {
  return (
    <section className="flex flex-col items-center mr-28">
      <div className="relative w-85 h-40 overflow-hidden">
        <img
          src="/skillset_text.png"
          alt="The heading of the section- Skillset"
          className="absolute left-0 top-[-26.3%] w-[113.5%] max-w-none"
        />
      </div>

      {/* Each cluster is laid out on the 1530px-wide Figma frame, centred on the section. */}
      <div className="flex flex-col items-center gap-y-60 mt-24">
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
    </section>
  );
};

export default SkillsetSection;
