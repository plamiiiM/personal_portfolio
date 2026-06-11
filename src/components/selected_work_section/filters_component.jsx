import React from "react";

const FiltersComponent = ({ filters = [] }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-x-9 gap-y-4 flex-wrap flex-1 ">
      {filters.map((filterName, index) => (
        <div key={index} className="flex flex-col text-center">
          <p className="font-[poppins] text-[0.875rem] leading-8 ">{filterName}</p>
          <img src="/underline_for_filters.png" alt="" className="w-full" />
        </div>
      ))}
    </div>
  );
};

export default FiltersComponent;
