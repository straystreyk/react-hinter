import { FC, ReactNode } from "react";

export interface IContentProps {
  steps: number;
  currentStep: number;
  text: string | ReactNode;
  elements: HTMLElement[];
  position: { left?: number; top?: number };
  nextStep: () => void;
  prevStep: () => void;
  finish: () => void;
}

export interface ReactHinterProps {
  active: boolean;
  namespace: string;
  onEnd: () => void;
  content?: FC<IContentProps>;
  className?: string;
}
