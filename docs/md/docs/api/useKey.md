> `@deprecated` , use [createStore](/docs/api/createStore) instead

# useKey

`useKey` is a function that lets you create a new global stateful variable with the given key.

<hr/>

### Type & Parameters

```ts
function useKey<T>(key: string, initialState: T): StateArray<T>;
```

accepts two parameters :

- `key` : a unique string identifying the state within the global state store.
- `initialState` : initialize the state value.

<br/>

### Returns

`useKey` returns a [StateArray](/docs/types#statearray), which is an array of three values:

1. `value` : The current state, which will take the value of `initialState` during the first render.
2. `setter`: a function that lets you update the state which will trigger a re-render.
3. `getter` : a function that returns the current value of the state. useful when trying to access the state value within an _asynchronous function_ .

<hr/>

### Notes ⚠️

- `useKey` is **NOT A HOOK**, but it is preferrable to only call it at the top level of your components.
- Once a key is used, all the other `useKey` calls with the same key will have the same values.

<hr/>

### Example

```ts
import { useKey } from '@riadh-adrani/ruvy';

function MyComponent() {
  const [count, setCount] = useKey('count', 0);

  function onClickHandler() {
    setCount(count + 1);
  }

  return <div onClick={onClickHandler}>{count}</div>;
}
```
