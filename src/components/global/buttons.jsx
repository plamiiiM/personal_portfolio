import React from "react";

// Pass as="a" (with an href) for a link styled as a button. Both are inline-block, so they come out the same size
// wherever they sit
const Button = ({ as = "button", children, className = "", ...props }) => {
  const Tag = as;
  return (
    <Tag
      className={`cursor-pointer inline-block font-poppins font-bold text-[1rem] uppercase px-6 py-2 leading-8 tracking-wide transition-all active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

const Primary = (props) => (
  <Button
    {...props}
    className="bg-(--btnBgLight) text-(--btnTextOnLight) hover:bg-(--btnHoveronLight) border border-(--btnStrokeLight) rounded-xl"
  />
);

const Secondary = (props) => (
  <Button
    {...props}
    className="bg-(--btnBgDark) text-(--btnTextOnDark) hover:bg-(--btnHoveronDark) border border-(--btnStrokeDark) rounded-xl"
  />
);

Button.Primary = Primary;
Button.Secondary = Secondary;

export default Button;
