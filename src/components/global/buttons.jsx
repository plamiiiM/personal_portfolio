import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={` font-[poppins] font-bold text-[1rem] uppercase px-6 py-2 leading-8 tracking-wide transition-all active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
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
