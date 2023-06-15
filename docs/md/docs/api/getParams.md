# getParams

`getParams` is a function that returns an object of key/value pairs of the dynamic params from the current URL that were matched by the current route. Child routes inherit all params from their parent routes.

<hr/>

### Type & Parameters

```ts
function getParams(): Record<string, string>;
```

This function has no parameters.

<br/>

### Returns

returns an object of key/value pairs of the dynamic params from the current URL matched by the current route.

<hr/>

### Notes ⚠️

- `getParams` is not a hook.

<hr/>

### Example

#### extract user ID from the current path.

```ts
import { getParams } from '@riadh-adrani/ruvy';

function Component() {
  // route = /users/:id/settings
  // url = /users/123/settings
  const { id } = getParams();

  console.log(id); // displays "123"
  // ...
}
```
