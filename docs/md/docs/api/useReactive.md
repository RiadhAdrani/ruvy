### `@experimental`

# useReactive

`useReactive` is a hook that lets you add a reactive state variable inside a component.

<hr/>

### Type & Parameters

```ts
function useReactive<T extends object>(initialStateObject: T): T;
```

The only parameter is the `initialStateObject`, which as its name suggests, initialize the state value.

<br/>

> ⚠️ Throws when **`initialStateObject`** is not an object.

<br/>

### Returns

`useReactive` returns a `reactive` version of the provided object.

<hr/>

### Notes ⚠️

- `useReactive` does not make array methods reactive.
- `useReactive` is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
- Using the object returned by `useReactive` as a dependency for hooks like `useEffect` or `useMemo` won't have an effect, avoid using it when side effects or computed values are needed.

<hr/>

### Example

```ts
import { useReactive } from '@riadh-adrani/ruvy';

function MyComponent() {
  const value = useReactive({ count: 0 });

  function onClickHandler() {
    value.count++;
  }

  return <div onClick={onClickHandler}>{value.count}</div>;
}
```
