# useMemo

`useMemo` is a hook that lets cache the result of a calculation between re-renders.

<hr/>

### Type & Parameters

```ts
function useMemo<T>(callback: () => T, deps?: unknown): T;
```

accepts two parameters:

- `callback` : The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type.

- `deps` (optional) : an object or a list of values that will trigger the recomputation of the cached value when they changes.

<hr/>

### Notes ⚠️

- Unlike `React`, deps could be any object, an array is not mandatory.
- Unlike `React`, the default behavior without deps is to memoize once.

<hr/>

### Example

#### Memoize an array of items

```ts
import { useMemo } from '@riadh-adrani/ruvy';

function TodoList({ todos }: { todos: Array<ToDo> }) {
  const visibleTodos = useMemo(() => filterTodos(todos), [todos]);
  // ...
}
```

On every subsequent render, Ruvy will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared deeply), useMemo will return the value you already calculated before. Otherwise, the calculation will re-run which will return a new value.

In other words, useMemo caches a calculation result between re-renders until its dependencies change.
