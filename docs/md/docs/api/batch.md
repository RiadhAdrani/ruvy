# batch

`batch` lets you batch state updates in a single one.

<hr/>

### Type & Parameters

```ts
function batch<T>(callback: Callback): T;
```

The only parameter is the `callback` that contains multiple state updates.

<hr/>

### Notes ⚠️

- `batch` callback should not be asynchronous or it will not do its intended job.

<hr/>

### Example

#### Updating multiple states after an asynchronous api fetch

```ts
import { useEffect, batch } from '@riadh-adrani/ruvy';

function User() {
  // ...

  useEffect(() => {
    fetchData().then(data => {
      // maybe perform data checking here

      // and here we batch all our state updates
      batch(() => {
        setData(data);
        setLoading(false);
      });
    });
  });

  // ...
}
```
