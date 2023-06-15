# getRoute

`getRoute` is a function that returns the current URL's pathname.

<hr/>

### Type & Parameters

```ts
function getRoute(): string;
```

This function has no parameters.

<br/>

### Returns

returns the current `pathname` without the `base`.

<hr/>

### Example

#### Get current route

```ts
import { getRoute } from '@riadh-adrani/ruvy';

function Component() {
  // url = /search
  const route = getRoute();

  console.log(route); // displays "/search"
  // ...
}
```

#### Get current route without the base

```ts
import { getRoute } from '@riadh-adrani/ruvy';

function Component() {
  // base = /ruvy
  // url = /ruvy/search
  const route = getRoute();

  console.log(route); // displays "/search"
  // ...
}
```
