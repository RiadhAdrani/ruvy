# createStore

`createStore` is a function that lets you create a new global store, accessed from anywhere.

<hr/>

### Type & Parameters

```ts
function createStore<T>(key: string, initialValue: T): [StateGetter<T>, (value: T) => void];
```

accepts two parameters :

- `key` : a unique string identifying the state within the global state store.
- `initialState` : initialize the state value.

<br/>

### Returns

`createStore` returns a [StateArray](/docs/types#statearray) omitting the first value.

<hr/>

### Notes ⚠️

- `createStore` will throw when a store with the same name is already created.

<hr/>

### Example

```ts
import { createStore } from '@riadh-adrani/ruvy';

// create a store outside the component scope
const [getCount, setCount] = createStore('count', 0);

function MyComponent() {
  function onClickHandler() {
    setCount(getCount() + 1);
  }

  return <div onClick={onClickHandler}>{getCount()}</div>;
}
```
