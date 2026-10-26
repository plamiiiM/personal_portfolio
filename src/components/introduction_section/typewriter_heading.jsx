import React from "react";
import useLanguage from "../global/use_language";

// Timed as in the Figma prototype: the heading types out "Plamena is" and an ending a letter at a time, holds it,
// erases the ending from its last letter back and types the next one, round and round. "Plamena is" stays put once
// it's typed. Every ending keeps the same rhythm, so the loop is worked out from their lengths
const TYPE_STEP = 55; // ms per letter typed, each one fading in over that long
const ERASE_STEP = 29; // ms per letter erased, each one fading out over that long
const HOLD = 1250; // ms a phrase stays whole
const GAP = 200; // ms between erasing one ending and typing the next

// The start every phrase shares, and the endings that take turns after it (in bold)
const PHRASES = {
  en: { start: "Plamena is ", endings: ["a curious designer", "growing businesses", "for users and developers"] },
  bg: { start: "Пламена е ", endings: ["любопитна дизайнерка", "двигател за растеж на бизнеси", "за потребителите и разработчиците"] },
};

// When each ending starts being typed and erased, in ms into the loop, and how long the loop is
const timeline = (endings) => {
  let start = 0;
  const timed = endings.map((text) => {
    const count = [...text].length;
    const eraseFrom = start + count * TYPE_STEP + HOLD;
    const ending = { text, count, start, eraseFrom };
    start = eraseFrom + count * ERASE_STEP + GAP;
    return ending;
  });
  return { endings: timed, loop: start };
};

// The shared start, typed once as the heading comes in (--type-in is when each letter does)
const StartLetters = ({ text }) =>
  [...text].map((letter, index) => (
    <span key={index} className="typewriter-start-letter" style={{ "--type-in": index * TYPE_STEP }}>
      {letter}
    </span>
  ));

// An ending's letters. Each has the moment in the loop it starts fading in (--type-in) and the moment it's gone again
// (--type-out); erasing goes from the last letter back
const EndingLetters = ({ ending }) =>
  [...ending.text].map((letter, index) => (
    <span
      key={index}
      className="typewriter-letter"
      style={{
        "--type-in": ending.start + index * TYPE_STEP,
        "--type-out": ending.eraseFrom + (ending.count - index) * ERASE_STEP,
      }}
    >
      {letter}
    </span>
  ));

// The phrases are stacked in one spot, so the heading keeps the size of the longest and nothing below it moves. Only
// the first one shows its start; the others keep theirs invisible, so their endings line up after it.
// Screen readers get the first phrase as plain text. It types once its section is .in-view (see .typewriter in index.css):
// --type-start is how long typing the start takes, after which the loop begins; --type-shown is the moment in the loop
// the first ending is whole, a ms after its last letter is in so that one's fully there
const TypewriterHeading = ({ className = "" }) => {
  const { t } = useLanguage();
  const { start, endings: texts } = t(PHRASES);
  const { endings, loop } = timeline(texts);
  const [first] = endings;

  return (
    <h2
      className={`typewriter grid ${className}`}
      style={{
        "--type-loop": loop,
        "--type-start": [...start].length * TYPE_STEP,
        "--type-shown": first.count * TYPE_STEP + 1,
      }}
    >
      <span className="sr-only">
        {start}
        <strong>{first.text}</strong>
      </span>
      {endings.map((ending, index) => (
        <span key={ending.start} className="col-start-1 row-start-1" aria-hidden="true">
          {index === 0 ? (
            <StartLetters text={start} />
          ) : (
            <span className="invisible">
              <StartLetters text={start} />
            </span>
          )}
          <strong>
            <EndingLetters ending={ending} />
          </strong>
        </span>
      ))}
    </h2>
  );
};

export default TypewriterHeading;
