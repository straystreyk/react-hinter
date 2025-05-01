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
  const { namespace, portal = true } = props;

  if (!namespace) {
    console.error(
      "[REACT HINTER]: You should pass a namespace for a ReactHinter component"
    );
    return null;
  }

  if (portal) {
    return (
      <Portal
        wrapperId={
          typeof portal === "string" ? portal : "__REACT_HINTER_PORTAL__"
        }
      >
        <ReactHinterCore {...props} />
      </Portal>
    );
  }
  return <ReactHinterCore {...props} />;
});
