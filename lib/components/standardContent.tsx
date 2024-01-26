import { ReactHinterContentProps } from "../@types/common";
import { FC } from "react";

export const StandardContent: FC<ReactHinterContentProps> = (info) => {
  return (
    <div>
      <div className="react-hinter-content-header">
        {info.currentStep} / {info.steps}
        <button onClick={info.finish}>END</button>
      </div>
      {info.text}

      <div className="react-hinter-content-footer">
        <button onClick={info.prevStep}>prev</button>
        <button onClick={info.nextStep}>
          {info.steps === info.currentStep ? "finish" : "next"}
        </button>
      </div>
    </div>
  );
};
