import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  /** Handles the change event of the media query. */

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const getMatches = (query: string): boolean => {
      if (typeof window !== "undefined") {
        return window.matchMedia(query).matches;
      }
      return false;
    };

    const handleChange = () => {
      setMatches(getMatches(query));
    };

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
};
