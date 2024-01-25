import { ReactHinter } from "../dist/main.js";
import { useState } from "react";

function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div style={{ marginTop: 500, marginLeft: 250 }}>
        <button
          data-rh-namespace="namespace"
          data-rh-text="Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step Information for the first step"
          data-rh-step={1}
          data-rh-preferred-position="bottom"
        >
          Hinter step 1
        </button>
        <button
          data-rh-namespace="namespace"
          data-rh-text="Information for the"
          data-rh-step={3}
        >
          Hinter step 2
        </button>
        <button
          style={{ position: "fixed", bottom: 0, right: 0 }}
          data-rh-text="XJ"
          data-rh-namespace="namespace"
          data-rh-step={2}
        >
          Hinter step 3
        </button>
      </div>
      <button onClick={() => setActive(true)}>start</button>
      <ReactHinter
        namespace="namespace"
        active={active}
        onEnd={() => setActive(false)}
      />
    </>
  );
}

export default App;
