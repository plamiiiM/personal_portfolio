import React from "react";

// What happened at one stop on the experience trail. The trail draws the stop's marker beside the year
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
  at = "at",
  showRecommendation = false,
}) {
  return (
    <div className="flex flex-col font-poppins text-[1rem] lg:text-[1.125rem] leading-8">
      <h3 className="text-[1.25rem] font-semibold mb-3">{year ? `${year}` : "Year"}</h3>
      <p>
        {sentence ? `${sentence}` : "You did..."}{" "}
        <span className="text-(--red) font-bold">{role || "Role"}</span> {at}{" "}
        <span className="font-bold">{company ? `${company}` : "Company"}</span>
      </p>

      <p className="italic font-light mb-6">({date ? `${date}` : "Date"})</p>

      {showRecommendation && (
        <div className="border border-black rounded-2xl p-4 lg:p-6 lg:w-184 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 rounded-full ">
              <img
                src={imageOfEmployer ? `${imageOfEmployer}` : null}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="flex flex-row flex-wrap items-center gap-x-2">
              <h4 className="font-bold text-black ">
                {nameEmployer ? `${nameEmployer}` : "Name Name"}
              </h4>
              <span className="text-black ">
                | {positionEmployer ? `${positionEmployer}` : "Position"}
              </span>
            </div>
          </div>

          <p>
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
