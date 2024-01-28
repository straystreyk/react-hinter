import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { canUseDOM } from "../helpers/common.ts";
import { renderHinterPos } from "../helpers/logic.ts";
import debounce from "lodash.debounce";
import { TState } from "../components/react-hinter.tsx";

export const useRenderPosition: (opts: {
  info: TState;
  ref: RefObject<HTMLDivElement>;
  setInfo: Dispatch<SetStateAction<TState>>;
}) => void = ({ ref, info: { elements, currentStep }, setInfo }) => {
  const renderPosition = useCallback(() => {
    if (!ref.current || !canUseDOM()) return;
    const currentElement = elements[currentStep - 1];

    const { left, top } = renderHinterPos(currentElement, ref.current);
    setInfo((p) => ({ ...p, position: { left, top } }));
  }, [currentStep, elements, ref, setInfo]);

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
    if (!ref.current || !elements.length || !canUseDOM()) return;
    refToRenderPosition.current = debouncedRenderPosition();
    renderPosition();
  }, [
    currentStep,
    debouncedRenderPosition,
    elements.length,
    ref,
    renderPosition,
  ]);
};
