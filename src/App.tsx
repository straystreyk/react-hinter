import { useState } from "react";
import { ReactHinter } from "../lib/main";
import "../dist/css/style.css";

function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        data-rh-namespace="namespace"
        data-rh-step={1}
        data-rh-text="Text for hinter step 1"
      >
        Step 1
      </button>

      <button
        data-rh-namespace="namespace"
        data-rh-step={2}
        data-rh-text="Text for hinter step 2"
      >
        Step 2
      </button>

      <ReactHinter
        namespace="namespace"
        active={active}
        onEnd={() => setActive(false)}
      />
    </>
  );
}

export default App;
