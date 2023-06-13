# useCallback

`useCallback` is a hook that lets cache a function definition between re-renders.

<hr/>

### Type & Parameters

```ts
function useCallback<T>(callback: T, deps?: unknown): T;
```

accepts two parameters:

- `callback` : The function that will be memoized

- `deps` (optional) : The list of all reactive values referenced inside of the `callback` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.

<hr/>

### Notes ⚠️

- Unlike `React`, deps could be any object, an array is not mandatory.
- Unlike `React`, the default behavior without deps is to memoize the callback once.

<hr/>

### Example

#### Memoize event handlers

```ts
import { useCallback, useState } from '@riadh-adrani/ruvy';

function Component() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => setCount(count + 1), count);

  return <button onClick={onClick}>{count}</button>;
}
```
