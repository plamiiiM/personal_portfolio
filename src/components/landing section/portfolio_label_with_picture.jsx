import React from "react";

const PortfolioLabelWithPicture = ({}) => {
  return (
    <div className="flex flex-col justify-center ">
      <div className="relative flex items-center select-none top-13 ">
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <img
            src="/src/assets/scribble_graphite_small_color.png"
            alt="Graphite scribble"
            className=" mix-blend-multiply w-2xl"
          />
        </div>
        <img
          src="/src/assets/portfolio_label.png"
          alt="Portfolio label"
          className="relative w-md h-auto object-contain mix-blend-multiply left-5"
        />
      </div>
      <img
        src="/src/assets/picture_of_me_graphite_color.png"
        alt="Portfolio picture"
        className="w-3xl overflow-hidden object-cover opacity-100 mix-blend-multiply"
      />
    </div>
  );
};

export default PortfolioLabelWithPicture;
