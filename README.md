[![Version](http://img.shields.io/npm/v/react-hinter.svg)](https://www.npmjs.org/package/react-hinter)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

If you like the project, please give the project a GitHub 🌟
---------------

<img alt="Intro" src="https://raw.githubusercontent.com/straystreyk/react-hinter/CustomBranch/public/intro.gif" style="width: 100%"/>


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

## Customization
if you want to make your own unique content,
ReactHinter accepts props content which takes 
exactly the same parameters for rendering as React Hinter.

```tsx
import { ReactHinter, ReactHinterContentProps } from "react-hinter";
import "react-hinter/dist/css/style.css";

const MyAwesomeContent:FC<ReactHinterContentProps> = ({ prevStep, nextStep, finish }) => {
    return (
        <div>
            My awesome content!
            <button onClick={nextStep}>Next step</button>
            <button onClick={prevStep}>Prev step</button>
            <button onClick={finish}>Finish</button>
        </div>
    )
}

const MainPage = () => {
    const [active, setActive] = useState(false);
    
    return (
        <>
            <button
                data-rh-namespace="scramble"
                data-rh-step={1}
                data-rh-text="Take 2 eggs and beat them!"
                data-rh-preferred-position="top"
            >
                Step 1: Take eggs
            </button>

            <button
                data-rh-namespace="scramble"
                data-rh-step={3}
                data-rh-text="Enjoy your meal :)"
            >
                Step 3: Enjoy
            </button>
            <button
                data-rh-namespace="scramble"
                data-rh-step={2}
                data-rh-text="Take a pen and heat it well!"
                data-rh-preferred-position="top"
            >
                Step 2: Take a pan
            </button>

            <ReactHinter
                namespace="scramble"
                active={active}
                content={MyAwesomeContent}
                onEnd={() => setActive(false)}
            />
        </>
    );
};
```

## ReactHinter props
| Parameter     | Type                   | Required | Default   | About                                                                                             |
|---------------|------------------------|----------|-----------|---------------------------------------------------------------------------------------------------|
| **active**    | boolean                | true     | false     | Active state of ReactHinter                                                                       |
| **namespace** | string                 | true     | –         | Namespace in which ReactHinter will navigate                                                      |
| **onEnd**     | () => void             | true     | –         | An event that fires when ReactHinter terminates. Here you should set the activity status to false |
| **content**   | FC\<ReactHinterProps\> | false    | undefined | Your custom content component                                                                     |
| **className** | string                 | false    | undefined | Your className                                                                                    |


## ReactHinterContent props
| Parameter       | Type                            | About                                                                                 |
|-----------------|---------------------------------|---------------------------------------------------------------------------------------|
| **steps**       | number                          | Total number of steps passed in this namespace                                        |
| **currentStep** | number                          | Current active step                                                                   |
| **text**        | string                          | data-rh-text that was passed to the element. Will subsequently display in ReactHinter |
| **elements**    | HTMLElement[]                   | All DOM namespace elements                                                            |
| **position**    | { left?: number; top?: number } | Current ReactHinter position                                                          |
| **nextStep**    | () => void                      | Function to go to next step                                                           |
| **prevStep**    | () => void                      | Function to go to previous step                                                       |
| **finish**      | () => void                      | function that terminates ReactHinter                                                  |


## Additional HTMLAttributes

| Parameter                      | Type                  | Required for work | About                                                                    |
|--------------------------------|-----------------------|-------------------|--------------------------------------------------------------------------|
| **data-rh-namespace**          | string                | true              | Namespace in which ReactHinter will navigate                             |
| **data-rh-preferred-position** | ReactHinterPlacesType | false             | ReactHinter's preferred position relative to the element (top or bottom) |
| **data-rh-text**               | string                | false             | Text that will be displayed in ReactHinter                               |
| **data-rh-step**               | number                | true              | The order in which ReactHinter will be rendered relative to this element |



## License
ISC