[![Version](http://img.shields.io/npm/v/react-hinter.svg)](https://www.npmjs.org/package/react-hinter)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

If you like the project, please give the project a GitHub 🌟
---------------

React component for showing information hints 🥸<br/>
🎨 Easy to customize<br/>
💨 Lightweight


## Installation
```sh
npm install react-hinter
```

## Usage
1 . Import the ReactHinter component and default styles for it. It's important to import default styles, hinter won't show without it.
```js
import { ReactHinter } from "react-hinter";
import "react-hinter/dist/css/style.css";
```

2 . Select the elements that ReactHinter will point to. 
Specify the required data-attributes as in the example below. 
**Mandatory data-attributes** are **data-rh-namespace** -
the namespace in which ReactHinter elements will be defined,
**data-rh-step** - the counting order that ReactHinter will point to, 
**data-text** - the text that ReactHinter will draw.

```jsx
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
    </>
);
```

 3 . Define a React Hinter component with required parameters. namespace - the same as data-namespace for elements, active - boolean state, onEnd - ReactHinter end events.
 
```jsx
 <ReactHinter
    namespace="namespace"
    active={active}
    onEnd={() => setActive(false)}
/>
```

## Full example

```jsx
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
```


## License
ISC