import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import debounce from "lodash.debounce";
import { canUseDOM } from "../helpers/common.ts";
import { renderHinterPos } from "../helpers/logic.ts";
import { TState } from "../components/react-hinter.tsx";
import { useMediaQuery } from "./useMatchMedia.ts";

export const useRenderPosition: (opts: {
  info: TState;
  ref: RefObject<HTMLDivElement>;
  setInfo: Dispatch<SetStateAction<TState>>;
}) => { renderPositionStopped: boolean } = ({
  ref,
  info: { elements, currentStep },
  setInfo,
}) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 1024px)");
  const renderPosition = useCallback(() => {
    if (!ref.current || !canUseDOM() || isTabletOrMobile) return;

    const currentElement = elements[currentStep - 1];
    if (!currentElement) return;

    const { left, top } = renderHinterPos(currentElement, ref.current);
    setInfo((p) => ({ ...p, position: { left, top } }));
  }, [currentStep, elements, isTabletOrMobile, ref, setInfo]);

  const debouncedRenderPosition = useCallback(
    () => debounce(renderPosition, 100),
    [renderPosition],
  );

  const refToRenderPosition = useRef(debouncedRenderPosition());

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
    refToRenderPosition.current = debouncedRenderPosition();
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
