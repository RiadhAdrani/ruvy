# useEffect

`useEffect` is a hook that lets synchronize your component with an external

<hr/>

### Type & Parameters

```ts
function useEffect(callback: Effect, deps?: unknown): void;
```

accepts two parameters:

- `callback` : of type [`Effect`](/docs/types#effect), it is a setup function that may also return a cleanup function. When the component is mounted, the framework will run your function, and each time dependencies changes, the `cleanup` function will be executed and the effect will run again. The `cleanup` function runs one last time when the component is unmounted.

- `deps` (optional) : an object or a list of values that `useEffect` should track in order to rerun the callback and the cleanup functions.

<hr/>

### Notes ⚠️

- `useEffect` will run only once if no `deps` are provided.
- Avoid updating state unconditionally inside `useEffect` as that might cause an infinite-loop of rerenders.
- The cleanup functions will run each time the `deps` provided changes, and when the component is unmounted.
- Unlike `React`, deps could be any object, an array is not mandatory.
- Unlike `React`, the default behavior without deps is to run once.

<hr/>

### Example

#### Subscribing to an external system

```ts
import { useState, useEffect } from '@riadh-adrani/ruvy';

function MyComponent() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const connection = createConnection('some-data-api-url').subscribe(it => setData(id));

    return () => connection.disconnect();
  });

  return <div>{data}</div>;
}
```
