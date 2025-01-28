import "../styles/glob.scss";
import { Portal } from "./portal.tsx";
import { FC, memo } from "react";
import { ReactHinterContentProps, ReactHinterProps } from "../@types/common";
import { ReactHinterCore } from "./react-hinter-core.tsx";

export type TState = Pick<
  ReactHinterContentProps,
  "steps" | "currentStep" | "text" | "elements" | "position"
>;

export const ReactHinter: FC<ReactHinterProps> = memo((props) => {
  const { namespace } = props;

  if (!namespace) return null;

  return (
    <Portal wrapperId="__REACT_HINTER_PORTAL__">
      <ReactHinterCore {...props} />
    </Portal>
  );
});
