// Figma px -> rem, so the layout follows the root font size like the rest of the site.
export const rem = (px) => `${px / 16}rem`;

// Inline style for a box from skills_data.js. CSS rotates it around its centre, as Figma does.
export const place = ({ x, y, w, h, rotate }) => ({
  left: rem(x),
  top: rem(y),
  width: rem(w),
  height: rem(h),
  rotate: rotate && `${rotate}deg`,
});
