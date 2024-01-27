import React, { AriaAttributes, DOMAttributes, FC } from "react";

type ReactHinterPlacesType = "top" | "bottom";

interface ReactHinterContentProps {
  steps: number;
  currentStep: number;
  text: string;
  elements: HTMLElement[];
  position: { left?: number; top?: number };
  nextStep: () => void;
  prevStep: () => void;
  finish: () => void;
}

interface ReactHinterProps {
  active: boolean;
  namespace: string;
  onEnd: () => void;
  content?: FC<ReactHinterContentProps>;
  className?: string;
}

declare const ReactHinter: (props: ReactHinterProps) => React.JSX.Element;

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-rh-namespace"?: string;
    "data-rh-preferred-position"?: ReactHinterPlacesType;
    "data-rh-text"?: string;
    "data-rh-step"?: number;
  }
}

export {
  ReactHinter,
  ReactHinterProps,
  ReactHinterContentProps,
  ReactHinterPlacesType,
};
