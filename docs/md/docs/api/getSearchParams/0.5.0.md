# getSearchParams

`getSearchParams` is a function that returns an object of key/value pairs of the dynamic search params (if they exists) from the current URL.

<hr/>

### Type & Parameters

```ts
function getSearchParams(): Record<string, string | undefined>;
```

This function has no parameters.

<br/>

### Returns

returns an object of key/value pairs of the search params from the current URL matched by the current route.

<hr/>

### Notes ⚠️

- `getSearchParams` is not a hook.

<hr/>

### Example

#### Extract query from search params

```ts
import { getSearchParams } from '@riadh-adrani/ruvy';

function Component() {
  // url = /search?q=ruvy
  const { q } = getSearchParams();

  console.log(q); // displays "ruvy"
  // ...
}
```
