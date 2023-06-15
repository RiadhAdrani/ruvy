# replace

`replace` lets you replace the current route without adding a new entry in the `hsitory` object.

<hr/>

### Type & Parameters

```ts
function replace(path: string): void;
```

The only parameter is the `path` string.

<hr/>

### Notes ⚠️

- Unlike `navigate`, `replace` override the newest entry in the `history` object.

<hr/>

### Example

#### Block user from accessing a page without being logged in.

```ts
import { useEffect, useContext, replace } from '@riadh-adrani/ruvy';
import UserContext from './UserContext.js';

function User() {
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      replace('/sign-in');
    }
  }, isAuthenticated);

  // ...
}
```
