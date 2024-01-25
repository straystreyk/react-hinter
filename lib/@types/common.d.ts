import React, { AriaAttributes, DOMAttributes, FC, ReactNode } from "react";
import { ReactHinterProps } from "../../dist/main";

type PlacesType = "top" | "bottom";

interface IContentProps {
  steps: number;
  currentStep: number;
  text: string | ReactNode;
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
  content?: FC<IContentProps>;
  className?: string;
}

declare const ReactHinter: (props: ReactHinterProps) => React.JSX.Element;

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-rh-namespace"?: string;
    "data-rh-preferred-position"?: PlacesType;
    "data-rh-text"?: string;
    "data-rh-step"?: number;
  }
}

export { ReactHinter, ReactHinterProps, IContentProps };
