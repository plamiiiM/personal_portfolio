import React from "react";
import Layer from "./layer";
import FitToWidth from "../global/fit_to_width";
import InView from "../global/in_view";
import { place, rem } from "../global/layout";
import { SKILL_CLUSTERS } from "./skills_data";
import HandLetteredHeading from "../global/hand_lettered_heading";
import useLanguage from "../global/use_language";

// The box around a group of layers (before their rotation), so the group can be shown on its own
const boundsOf = (layers) => {
  const x = Math.min(...layers.map((layer) => layer.x));
  const y = Math.min(...layers.map((layer) => layer.y));
  const right = Math.max(...layers.map((layer) => layer.x + layer.w));
  const bottom = Math.max(...layers.map((layer) => layer.y + layer.h));
  return { x, y, w: right - x, h: bottom - y };
};

// A group's layers, placed in the box around them
const LayersInBox = ({ layers, box, as }) =>
  layers.map((layer, index) => <Layer key={index} layer={{ ...layer, x: layer.x - box.x, y: layer.y - box.y }} as={as} />);

// A cluster title or sticky note on its own, cut out of the cluster and shrunk to the space it's given
const LayerGroup = ({ layers, as }) => {
  const box = boundsOf(layers);
  return (
    <FitToWidth className="mx-auto">
      <div className="relative" style={{ width: rem(box.w), height: rem(box.h) }}>
        <LayersInBox layers={layers} box={box} as={as} />
      </div>
    </FitToWidth>
  );
};

// Each sticky note is pressed onto the page as it scrolls into view (.stick), turned the other way from the one before.
// `delay` (ms) staggers the notes that come into view together
const StuckNote = ({ index, delay, className = "", style, children }) => (
  <InView
    as="li"
    className={`stick ${className}`}
    style={{ ...style, transitionDelay: `${Math.round(delay)}ms`, "--stick-turn": `${index % 2 ? 6 : -6}deg` }}
  >
    {children}
  </InView>
);

const SkillsetSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="flex flex-col items-center lg:mr-28">
      <HandLetteredHeading
        src="/skillset_text.png"
        alt="Skillset"
        bgText="Умения"
        imageClassName="w-25.75 lg:w-42.75"
        className="-rotate-4 self-start"
      />

      {/* Each cluster is laid out on the 1530px-wide Figma frame, centred on the section.
          Its notes sit in boxes around their layers, so each turns about its own middle as it comes in.
          Notes in a row come in from left to right */}
      <div className="hidden lg:flex flex-col items-center gap-y-60 mt-24">
        {SKILL_CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="relative w-[95.625rem] shrink-0"
            style={{ height: rem(cluster.height) }}
          >
            {t(cluster.title).map((layer, index) => (
              <Layer key={index} layer={layer} as="h3" />
            ))}
            <ul>
              {cluster.notes.map((note, index) => {
                const box = boundsOf(note.layers);
                return (
                  <StuckNote
                    key={note.label}
                    index={index}
                    delay={note.x / 5}
                    className="absolute"
                    style={place({ ...box, x: note.x + box.x, y: note.y + box.y })}
                  >
                    <LayersInBox layers={note.layers} box={box} />
                  </StuckNote>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* A cluster doesn't fit the phone layout, so there its title comes first and its notes line up in a grid below */}
      <div className="lg:hidden flex w-full flex-col gap-y-16 mt-8">
        {SKILL_CLUSTERS.map((cluster) => (
          <div key={cluster.id}>
            <LayerGroup layers={t(cluster.title)} as="h3" />
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4">
              {cluster.notes.map((note, index) => (
                <StuckNote key={note.label} index={index} delay={(index % 2) * 100}>
                  <LayerGroup layers={note.layers} />
                </StuckNote>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsetSection;
