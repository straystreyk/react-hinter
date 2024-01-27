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
import { ReactHinterContentProps, ReactHinterProps } from "../@types/common";
import { renderHinterPos } from "../helpers/logic.ts";
import { StandardContent } from "./standardContent.tsx";
import { canUseDOM } from "../helpers/common.ts";

const initialState: Pick<
  ReactHinterContentProps,
  "steps" | "currentStep" | "text" | "elements" | "position"
> & { hasTransition: boolean } = {
  steps: 0,
  currentStep: 0,
  text: "",
  elements: [],
  position: { left: undefined, top: undefined },
  hasTransition: true,
};

const ACTIVE_CLASS = "react-hinter-active-element";

export const ReactHinter: FC<ReactHinterProps> = memo(
  ({ active, namespace, onEnd, content: Content, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [info, setInfo] = useState(initialState);
    const {
      hasTransition,
      elements,
      steps: infoSteps,
      currentStep,
      position: { left, top },
    } = info;
    const [steps, setSteps] = useState<number[]>([]);

    const isFirstStepActive = steps.includes(1);

    const renderPosition = useCallback(() => {
      if (!ref.current || !canUseDOM()) return;

      const currentElement = elements?.find(
        (item) =>
          (item as HTMLElement)?.dataset?.rhStep?.toString() ===
          currentStep.toString(),
      );
      if (!currentElement) return;

      const { left, top } = renderHinterPos(currentElement, ref.current);
      setInfo((p) => ({ ...p, position: { left, top } }));
    }, [currentStep, elements]);

    const handleFinish = () => {
      onEnd();
      elements.forEach((el) => el.classList.remove(ACTIVE_CLASS));

      setSteps([]);

      if (!hasTransition) return setInfo(initialState);
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

      if (active && (currentStep === 1 || infoSteps === currentStep))
        setSteps((p) => [...p, currentStep]);

      !active && setInfo(initialState);
    };

    const handleNext = () => {
      if (currentStep === infoSteps) return handleFinish();
      const nextElement = elements[currentStep];
      const currentElement = elements[currentStep - 1];
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
      if (currentStep === 1) return;
      const currentElement = elements[currentStep - 1];
      const prevElement = elements[currentStep - 2];
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
          hasTransition: ref.current
            ? !!window
                .getComputedStyle(ref.current, null)
                .getPropertyValue("transition-duration")
            : false,
        }));
      }
    }, [namespace, active, onEnd]);

    useEffect(() => {
      if (!ref.current || !elements.length || !canUseDOM()) return;
      renderPosition();
    }, [currentStep, elements.length, ref, renderPosition]);

    if (!namespace) return null;
    return (
      <Portal wrapperId="__REACT_HINTER_PORTAL__">
        <div
          ref={ref}
          onTransitionEnd={onTransitionEnd}
          style={{ top, left }}
          className={`
          react-hinter-wrapper 
          ${className || ""} 
          react-hinter-has-transition__${hasTransition}
          react-hinter-namespace__${namespace} 
          react-hinter-active__${active} 
          react-hinter-step__${currentStep} 
          react-hinter-is-first-step-transition-end__${isFirstStepActive}
          react-hinter-is-last-step__${infoSteps > 0 && currentStep === infoSteps}
          `}
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
