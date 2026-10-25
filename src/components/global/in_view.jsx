import useInView, { inViewClassName } from "./use_in_view";

// An element (a div, or whatever `as` says) that gets .in-view once it scrolls into view, so the motion classes in
// index.css (rise, fade-in, stick, sketch) play on it and on what's inside it
const InView = ({ as = "div", className = "", ...props }) => {
  const [ref, isInView, isInstant] = useInView();
  const Tag = as;

  return <Tag ref={ref} className={`${className} ${inViewClassName(isInView, isInstant)}`} {...props} />;
};

export default InView;
