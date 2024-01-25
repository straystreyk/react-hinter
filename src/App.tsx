import { useState } from "react";
import { ReactHinter } from "../lib/main";

import "../lib/styles/glob.css";

function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive(true)}>start</button>
      <button
        data-rh-text="2"
        data-rh-namespace="namespace"
        data-rh-step={1}
        data-rh-preferred-position="top"
      >
        Я СТИКИ
      </button>
      <button
        data-rh-text="4"
        data-rh-namespace="namespace"
        data-rh-step={2}
        data-rh-preferred-position="top"
      >
        Я АБСОЛЮТНЫЙ ВНУТРИ НЕ АБСОЛЮТНОГО
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
