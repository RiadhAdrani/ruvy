# navigate

`navigate` lets you navigate programmatically between routes.

<hr/>

### Type & Parameters

```ts
function navigate(path: string): void;
```

The only parameter is the `path` string.

<hr/>

### Notes ⚠️

- `navigate` pushes a new entry to the `history` object.

<hr/>

### Example

#### Block user from accessing a page without being logged in.

```ts
import { useEffect, useContext, navigate } from '@riadh-adrani/ruvy';
import UserContext from './UserContext.js';

function User() {
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, isAuthenticated);

  // ...
}
```
