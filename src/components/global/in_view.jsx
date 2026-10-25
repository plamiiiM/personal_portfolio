import useInView, { InViewAround, inViewClassName } from "./use_in_view";

// An element (a div, or whatever `as` says) that gets .in-view once it scrolls into view, so the motion classes in
// index.css (rise, soft-in, fade-in, stick, sketch) play on it and on what's inside it. `isWhole` waits until all of
// it is on the screen (see useInView). What's inside can follow it too, through InViewAround
const InView = ({ as = "div", isWhole, className = "", children, ...props }) => {
  const [ref, isInView, isInstant] = useInView({ isWhole });
  const Tag = as;

  return (
    <Tag ref={ref} className={`${className} ${inViewClassName(isInView, isInstant)}`} {...props}>
      {children && <InViewAround value={{ isInView, isInstant }}>{children}</InViewAround>}
    </Tag>
  );
};

export default InView;
