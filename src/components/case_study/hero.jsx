import React from "react";

// Building blocks of the case study headers. Each page places them itself, as their designs space them differently.
// The phone layout uses smaller sizes; the lg: sizes are the designs'.
// They come in with the header, once the page has put .in-view on it (usePageEntrance): the name tag is stuck on,
// then the tagline and the details ease in one after another

// Paper name tag, pinned at an angle like the project titles on the landing page
export const NameTag = ({ children, className = "" }) => (
  <h1
    className={`stick w-fit -rotate-7 bg-[#faf8f8] p-[10px] lg:p-[16.87px] font-plamenas text-[2.75rem] lg:text-[5.0625rem]
                tracking-[0.03em] shadow-[0_1.69px_1.69px_rgba(0,0,0,0.3),0_3.38px_5.06px_rgba(0,0,0,0.15)] ${className}`}
  >
    {children}
  </h1>
);

export const Tagline = ({ title, role, className = "" }) => (
  <div className={`flex max-w-239.5 flex-col gap-y-3 lg:gap-y-6 font-poppins ${className}`}>
    <p className="soft-in delay-200 text-[1.625rem] lg:text-[2.5rem] font-semibold tracking-[0.03em] max-lg:text-balance">{title}</p>
    <p className="soft-in delay-300 text-[1.0625rem] lg:text-[1.25rem] tracking-[0.03em] text-(--red)">{role}</p>
  </div>
);

// Time period, platform and so on: [{ term, details }]
export const ProjectDetails = ({ items, className = "" }) => (
  <dl className={`flex lg:w-111.25 flex-col gap-y-6 lg:gap-y-11.25 font-poppins ${className}`}>
    {items.map(({ term, details }, index) => (
      <div key={term} className="soft-in flex flex-col gap-y-2" style={{ transitionDelay: `${400 + index * 100}ms` }}>
        <dt className="text-[1.125rem] lg:text-[1.25rem] tracking-[0.03em] text-(--red)">{term}</dt>
        <dd className="text-[1rem] lg:text-[1.125rem] tracking-[0.03em]">{details}</dd>
      </div>
    ))}
  </dl>
);

// Skills underlined in pencil. The underlines are placed by hand in the designs, so an item can nudge its
// label or line, and a longer label can bring a longer line: { label, labelClassName, lineClassName, lineSrc }
export const ExpertiseList = ({ items }) => (
  <ul className="flex flex-wrap gap-5 text-[1rem] tracking-[0.03em]">
    {items.map(({ label, labelClassName = "", lineClassName = "mt-[25.84px]", lineSrc = "/case_study/filter_underline.svg" }) => (
      <li key={label} className="grid">
        <span className={`col-start-1 row-start-1 whitespace-nowrap ${labelClassName}`}>{label}</span>
        <img src={lineSrc} alt="" className={`col-start-1 row-start-1 self-start ${lineClassName}`} />
      </li>
    ))}
  </ul>
);
