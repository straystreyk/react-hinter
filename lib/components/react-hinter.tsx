import "../styles/glob.css";
import { Portal } from "./portal.tsx";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  TransitionEvent,
} from "react";
import { IContentProps, ReactHinterProps } from "../@types/common";
import { renderHinterPos } from "../helpers/logic.ts";
import { StandardContent } from "./standardContent.tsx";
import { canUseDOM } from "../helpers/common.ts";

const initialState: Pick<
  IContentProps,
  "steps" | "currentStep" | "text" | "elements" | "position"
> = {
  steps: 0,
  currentStep: 0,
  text: "",
  elements: [],
  position: { left: undefined, top: undefined },
};

const ACTIVE_CLASS = "react-hinter-active-element";

export const ReactHinter: FC<ReactHinterProps> = memo(
  ({ active, namespace, onEnd, content: Content, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [info, setInfo] = useState(initialState);

    const renderPosition = useCallback(() => {
      if (!ref.current || !canUseDOM()) return;

      const currentElement = info.elements?.find(
        (item) =>
          (item as HTMLElement)?.dataset?.rhStep?.toString() ===
          info.currentStep.toString(),
      );
      if (!currentElement) return;

      const { left, top } = renderHinterPos(currentElement, ref.current);
      setInfo((p) => ({ ...p, position: { left, top } }));
    }, [info]);

    const handleFinish = () => {
      onEnd();
      const currentElement = info.elements[info.currentStep - 1];
      currentElement.classList.remove(ACTIVE_CLASS);

      setInfo((p) => ({
        ...initialState,
        text: p.text,
        position: p.position,
        steps: p.steps,
        currentStep: p.currentStep,
      }));
    };

    const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      !active && setInfo(initialState);
    };

    const handleNext = () => {
      if (info.currentStep === info.steps) return handleFinish();
      const nextElement = info.elements[info.currentStep];
      const currentElement = info.elements[info.currentStep - 1];
      nextElement.classList.add(ACTIVE_CLASS);
      currentElement.classList.remove(ACTIVE_CLASS);

      setInfo((p) => ({
        ...p,
        text: nextElement?.dataset?.rhText || "",
        currentStep: p.currentStep + 1,
        active: false,
      }));
    };
    const handlePrev = () => {
      if (info.currentStep === 1) return;
      const currentElement = info.elements[info.currentStep - 1];
      const prevElement = info.elements[info.currentStep - 2];
      currentElement.classList.remove(ACTIVE_CLASS);
      prevElement.classList.add(ACTIVE_CLASS);

      setInfo((p) => ({
        ...p,
        text: p.elements?.[p.currentStep - 2]?.dataset?.rhText || "",
        currentStep: p.currentStep - 1,
      }));
    };

    useEffect(() => {
      if (active && canUseDOM()) {
        const elems = document.querySelectorAll(
          `[data-rh-namespace='${namespace}']`,
        );
        if (!elems) {
          onEnd();
          return console.error("REACT_HINTER: Cannot find elements");
        }
        const parsedElems = ([...elems] as HTMLElement[]).sort((i, b) =>
          i.dataset?.rhStep &&
          b.dataset?.rhStep &&
          +i.dataset?.rhStep < +b.dataset?.rhStep
            ? -1
            : 1,
        );

        const firstElement = parsedElems.find(
          (item) => (item as HTMLElement)?.dataset?.rhStep?.toString() === "1",
        );
        if (!firstElement) {
          onEnd();
          return console.error(
            "REACT_HINTER: You didnt provide the first step",
          );
        }

        firstElement.classList.add(ACTIVE_CLASS);
        setInfo((p) => ({
          ...p,
          steps: elems.length,
          currentStep: 1,
          text: firstElement.dataset?.rhText || "",
          elements: parsedElems,
        }));
      }
    }, [namespace, active]);

    useEffect(() => {
      if (!ref.current || !info.elements.length || !canUseDOM()) return;
      renderPosition();
    }, [info.currentStep, ref]);

    if (!namespace) return null;
    return (
      <Portal wrapperId="__REACT_HINTER_PORTAL__">
        <div
          ref={ref}
          onTransitionEnd={onTransitionEnd}
          style={{ top: info.position.top, left: info.position.left }}
          className={`react-hinter-wrapper ${className || ""} react-hinter-namespace__${namespace} react-hinter-active__${active} react-hinter-step__${info.currentStep} react-hinter-is-last-step__${info.steps > 0 && info.currentStep === info.steps}`}
        >
          {Content ? (
            <Content
              {...info}
              nextStep={handleNext}
              finish={handleFinish}
              prevStep={handlePrev}
            />
          ) : (
            <StandardContent
              {...info}
              nextStep={handleNext}
              finish={handleFinish}
              prevStep={handlePrev}
            />
          )}
        </div>
      </Portal>
    );
  },
);
