# usePromise

`usePromise` is a hook that runs an asynchronous function and stroing its return value, while keeping track of the state of the request.

<hr/>

### Type & Parameters

```ts
function usePromise<T>(callback: () => Promise<T>): UsePromiseReturn<T>;
```

Accepts an `asynchronous callback` as the only parameter.

<br/>

### Returns

returns an object of type [`UsePromiseReturn`](/docs/types#usepromisereturn) which is an array of three values:

1. `state` : the state of the request of type [`UsePromiseState`](/docs/types#usepromisereturn): `pending`, `refreshing`, `resolved` or `rejected`.
2. `value` : the return value of the callback or `undefined` if not resolved.
3. `refresh` : a function that refresh that execute the function again and so refreshes the value.

<hr/>

### Notes ⚠️

- Do not call `refresh` unconditionally as that might cause multiple requests to be made simultaneously which may cause `Race condtions`.

<hr/>

### Example

#### Fetch some data from an api

```ts
import { usePromise } from '@riadh-adrani/ruvy';

function Component() {
  const [state, data, refreshData] = usePromise(async () => {
    const res = await fetch('some/public/api/url');

    return await res.json();
  });

  // ...
}
```
