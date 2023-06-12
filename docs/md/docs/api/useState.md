# useState

`useState` is a hook that lets you add a state variable inside a component.

<hr/>

### Type & Parameters

```ts
function useState<T>(initialState): StateArray<T>;
```

The only parameter is the `initialState`, which as its name suggests, initialize the state value.

<br/>

### Returns

`useState` returns a [StateArray](/docs/types#statearray), which is an array of three values:

1. `value` : The current state, which will take the value of `initialState` during the first render.
2. `setter`: a function that lets you update the state which will trigger a re-render.
3. `getter` : a function that returns the current value of the state. useful when trying to access the state value within an _asynchronous function_ .

<hr/>

### Notes ⚠️

- useState is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

<hr/>

### Example

```ts
import { useState } from '@riadh-adrani/ruvy';

const host = document.body;

function MyComponent() {
  const [count, setCount] = useState(42);

  function onClickHandler() {
    setCount(count + 1);
  }

  return <div onClick={onClickHandler}>{count}</div>;
}
```
