# useMemo

<br/>

`useMemo` is a Hook that lets you cache the result of a computation between re-renders.

<br/>

```ts
function useMemo<T>(callback: () => T, deps: unknown): T;
```

<br/>

### Parameters

<br/>

- _`callback`_ : The function calculating the value that you want to cache, it should not take arguments.

- _`deps`_ - : The list of reactive values referenced inside of the `callback` function. Dependencies will be deeply compared.

### Returns

<br/>

`useMemo` returns the result of the computation.

<br/>

### Example

```ts
import { useState, useMemo } from 'ruvy';

function Component = ({todos}) => {

  const [items,setItems] = useState(todos)

  const [search, setSearch] = useState('');

  const filterItems = () => {
    // ...
  }

  const filtered = useMemo(filterItem, [search, items])

  // ...
}

```
