import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { canUseDOM, debounce } from "../helpers/common.ts";
import { renderHinterPos } from "../helpers/logic.ts";
import { TState } from "../components/react-hinter.tsx";
import { useMediaQuery } from "./useMatchMedia.ts";

export const useRenderPosition: (opts: {
  info: TState;
  ref: RefObject<HTMLDivElement | null>;
  setInfo: Dispatch<SetStateAction<TState>>;
  scrollToActiveElement?: boolean;
}) => { renderPositionStopped: boolean } = ({
  ref,
  info: { elements, currentStep },
  setInfo,
  scrollToActiveElement,
}) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 1024px)");
  const renderPosition = useCallback(() => {
    if (!ref.current || !canUseDOM() || isTabletOrMobile) return;

    const currentElement = elements[currentStep - 1];
    if (!currentElement) return;

    const { left, top, isInViewport } = renderHinterPos(
      currentElement,
      ref.current
    );

    if (!isInViewport && scrollToActiveElement) {
      currentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setInfo((p) => ({ ...p, position: { left, top } }));
  }, [currentStep, elements, isTabletOrMobile, ref, setInfo]);

  const debouncedRenderPosition = useMemo(
    () => debounce(renderPosition, 100),
    [renderPosition]
  );

  const refToRenderPosition = useRef(debouncedRenderPosition);

  useEffect(() => {
    const handleResize = () => {
      refToRenderPosition.current();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!ref.current || !elements.length || !canUseDOM() || isTabletOrMobile)
      return;
    refToRenderPosition.current = debouncedRenderPosition;
    renderPosition();
  }, [
    currentStep,
    debouncedRenderPosition,
    elements.length,
    isTabletOrMobile,
    ref,
    renderPosition,
  ]);

  return {
    renderPositionStopped: isTabletOrMobile,
  };
};
