import { useState } from "react";
import { ReactHinter } from "../lib/main";
import "../lib/styles/glob.css";

function App() {
  const [active, setActive] = useState(false);

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
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 50, marginLeft: 500 }}>
        <button
          data-rh-namespace="scrable"
          data-rh-step={1}
          data-rh-text="Take 2 eggs and beat them!"
          data-rh-preferred-position="top"
        >
          Step 1: Take eggs
        </button>

        <button
          data-rh-namespace="scrable"
          data-rh-step={3}
          data-rh-text="Enjoy your meal :)"
        >
          Step 3: Enjoy
        </button>
        <button
          data-rh-namespace="scrable"
          data-rh-step={2}
          data-rh-text="Take a pen and heat it well!"
          data-rh-preferred-position="top"
        >
          Step 2: Take a pan
        </button>
      </div>

      <ReactHinter
        namespace="scrable"
        active={active}
        onEnd={() => setActive(false)}
      />
    </div>
  );
}

export default App;
