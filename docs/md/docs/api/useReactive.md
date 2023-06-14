# useReactive

`useReactive` is a hook that lets you add a reactive state variable inside a component.

<hr/>

### Type & Parameters

```ts
function useReactive<T extends object>(initialStateObject: T): T;
```

The only parameter is the `initialStateObject`, which as its name suggests, initialize the state value.

<br/>

### Returns

`useReactive` returns a `reactive` version of the provided object.

<hr/>

### Notes ⚠️

- `useReactive` is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
- `useReactive` transform the object you provide to a reactive one, even `Array`'s methods are reactive, with the exception of [`splice`](https://riadhadrani.github.io/utility-js/arrays.html#reactivearray).
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
