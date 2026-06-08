import React from "react";

export function ExperienceCardComponent({
  year,
  date,
  role,
  company,
  recommendation,
  nameEmployer,
  positionEmployer,
  imageOfEmployer,
  sentence,
  showRecommendation = false,
}) {
  return (
    <div className="flex flex-col font-[poppins] text-lg leading-9 z-50">
      <div className="flex flex-row items-center gap-4 mb-6 -ml-10">
        <div className="left-0 top-15 w-6 h-6 bg-(--red) rounded-full " />
        <h2 className="">{year ? `${year}` : "Year"}</h2>
      </div>
      <p>
        {sentence ? `${sentence}` : "You did..."}{" "}
        <span className="text-(--red) font-bold">{role || "Role"}</span> at{" "}
        <span className="font-bold">{company ? `${company}` : "Company"}</span>
      </p>

      <p className="italic font-light mb-6">({date ? `${date}` : "Date"})</p>

      {showRecommendation && (
        <div className="border border-black rounded-2xl p-6 w-full max-w-lg relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 rounded-full ">
              <img
                src={imageOfEmployer ? `${imageOfEmployer}` : null}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <h4 className="font-bold text-black ">
                {nameEmployer ? `${nameEmployer}` : "Name Name"}
              </h4>
              <span className="text-black ">
                | {positionEmployer ? `${positionEmployer}` : "Position"}
              </span>
            </div>
          </div>

          <p className=" ">
            {recommendation
              ? `${recommendation}`
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>
        </div>
      )}
    </div>
  );
}

export default ExperienceCardComponent;
