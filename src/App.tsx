import { FC, useState } from "react";
import "../lib/styles/glob.scss";

import "./glob.css";
import { ReactHinter, ReactHinterContentProps } from "../lib/main.ts";

const Component: FC<ReactHinterContentProps> = ({ text, finish, nextStep }) => {
  return (
    <div>
      <div>
        <button onClick={nextStep}>next</button>
        <button onClick={finish}>finish</button>
      </div>
      {text} <div onClick={finish}>выйти</div>
    </div>
  );
};

function App() {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        width: "auto",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 100,
          marginTop: 300,
        }}
      >
        <button onClick={() => setActive(true)}>Show the recipe</button>
      </div>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 100,
          marginTop: 300,
        }}
      >
        <button onClick={() => setActive2(true)}>Show the recipe 2</button>
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 50, marginLeft: 800 }}>
        <button
          data-rh-namespace="scramble"
          data-rh-step={1}
          data-rh-text="Take 2 eggs and beat them!"
          data-rh-preferred-position="bottom"
        >
          Step 1: Take eggs
        </button>

        <button
          data-rh-namespace="scramble"
          data-rh-step={2}
          data-rh-text="Enjoy your meal :)"
          data-rh-preferred-position="bottom"
        >
          Step 2: Enjoy
        </button>
        <button
          data-rh-namespace="scramble"
          data-rh-step={3}
          data-rh-text="Take a pen and heat it well!"
          data-rh-preferred-position="top"
        >
          Step 3: Take a pan
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          gap: 5,
          left: 0,
          bottom: 0,
          marginTop: 50,
          marginLeft: 800,
        }}
      >
        <button
          data-rh-namespace="scramble2"
          data-rh-step={1}
          data-rh-text="Take 2 eggs and beat them!"
          data-rh-preferred-position="bottom"
        >
          Step 1: Take eggs
        </button>

        <button
          data-rh-namespace="scramble2"
          data-rh-step={2}
          data-rh-text="Enjoy your meal :)"
          data-rh-preferred-position="bottom"
        >
          Step 2: Enjoy
        </button>
        <button
          data-rh-namespace="scramble2"
          data-rh-step={3}
          data-rh-text="Take a pen and heat it well!"
          data-rh-preferred-position="top"
        >
          Step 3: Take a pan
        </button>
      </div>
      <ReactHinter
        namespace="scramble"
        active={active}
        onEnd={() => setActive(false)}
        content={Component}
      />
      <ReactHinter
        namespace="scramble2"
        active={active2}
        onEnd={() => setActive2(false)}
        content={Component}
      />
    </div>
  );
}

export default App;
