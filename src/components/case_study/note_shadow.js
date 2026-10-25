// The soft shadow a smaller sticky note casts, as a Collage item to go just before the note { x, y, w, h }. It's placed
// from the note's own box the way the design places it under the virtual pet's note (a 302.07 x 313.24 note at 99, 169
// over a 349.25 x 336.38 shadow at 75.5, 166.59), so every such note casts it alike
export const noteShadow = ({ x, y, w, h, ...item }) => ({
  ...item,
  src: "/case_study/sticky_note_shadow.webp",
  x: x - w * (23.5 / 302.07),
  y: y - h * (2.41 / 313.24),
  w: w * (349.25 / 302.07),
  h: h * (336.38 / 313.24),
});
