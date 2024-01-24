import { useState, FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { canUseDOM } from "../helpers/common.ts";

const createWrapperAndAppendToBody = (wrapperId: string) => {
  if (!canUseDOM()) return;

  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const Portal: FC<{ children: ReactNode; wrapperId?: string }> = ({
  children,
  wrapperId = "portal",
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    if (!canUseDOM()) return;
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId) || null;
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  return wrapperElement ? createPortal(children, wrapperElement) : null;
};
