import { StandardContent } from "./standardContent.tsx";
import { FC, TransitionEvent, useEffect, useRef, useState } from "react";
import { useRenderPosition } from "../logic/useRenderPosition.ts";
import { canUseDOM } from "../helpers/common.ts";
import { TState } from "./react-hinter.tsx";
import { ReactHinterProps } from "../@types/common";

const initialState: TState = {
  steps: 0,
  currentStep: 0,
  text: "",
  elements: [],
  position: { left: undefined, top: undefined },
};

const ACTIVE_CLASS = "react-hinter-active-element";

export const ReactHinterCore: FC<ReactHinterProps> = ({
  active,
  namespace,
  onEnd,
  content: Content,
  className,
  scrollToActiveElement,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState(initialState);
  const [isFirstStepPassed, setIsFirstStepPassed] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Управление видимостью
  const { renderPositionStopped } = useRenderPosition({
    ref,
    setInfo,
    info,
    scrollToActiveElement,
  });

  const {
    elements,
    steps: infoSteps,
    currentStep,
    position: { left, top },
  } = info;

  const handleFinish = () => {
    onEnd();
    elements.forEach((el) => el.classList.remove(ACTIVE_CLASS));

    setIsFirstStepPassed(false);

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

    if (active) {
      if (currentStep === 1) {
        setIsFirstStepPassed(true);
      }
    } else {
      setInfo((p) => ({ ...p, position: {} }));
      setIsVisible(false);
    }
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
      setIsVisible(true);

      const elems = document.querySelectorAll(
        `[data-rh-namespace='${namespace}']`
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
          : 1
      );

      const firstElement = parsedElems.find(
        (item) => (item as HTMLElement)?.dataset?.rhStep?.toString() === "1"
      );

      if (!firstElement) {
        onEnd();
        return console.error("REACT_HINTER: You didnt provide the first step");
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

  if (!active && !isVisible) return null; // Полностью убираем из DOM
  return (
    <div
      ref={ref}
      onTransitionEnd={onTransitionEnd}
      style={!renderPositionStopped ? { top, left } : {}}
      className={`
          react-hinter-wrapper  
          ${className || ""} 
          react-hinter-namespace__${namespace}  
          react-hinter-active__${isVisible && active}
          react-hinter-step__${currentStep} 
          react-hinter-is-first-step-transition-end__${isFirstStepPassed}
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
  );
};
