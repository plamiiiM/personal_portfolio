import { useEffect, useState } from "react";

// Below Tailwind's lg breakpoint the pages switch to the phone layout: one column, where the unprefixed and max-lg:
// classes apply instead of the lg: ones. This tells components that also need to know it in their code
const PHONE_LAYOUT = "(width < 64rem)";

const usePhoneLayout = () => {
  const [isPhoneLayout, setIsPhoneLayout] = useState(() => window.matchMedia(PHONE_LAYOUT).matches);

  useEffect(() => {
    const query = window.matchMedia(PHONE_LAYOUT);
    const update = () => setIsPhoneLayout(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isPhoneLayout;
};

export default usePhoneLayout;
