import React from "react";

// A silent screen recording of the app, looping on a phone's screen. Lay it under a phone frame whose screen is cut
// out, so the bezel, its rounded corners and whatever sits over the screen (a notch, the app icon) stay on top.
// With reduced motion it stays on its first frame, the poster, and can be played from the controls instead
const ScreenRecording = ({ src, poster, label, className = "" }) => {
  const isStill = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <video
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay={!isStill}
      controls={isStill}
      muted
      loop
      playsInline
      preload={isStill ? "none" : "auto"}
      className={`size-full object-cover ${className}`}
    />
  );
};

export default ScreenRecording;
