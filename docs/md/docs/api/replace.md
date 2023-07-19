# replace

`replace` lets you replace the current route without adding a new entry in the `hsitory` object.

<hr/>

### Type & Parameters

```ts
function replace(request: Exclude<NavigationRequest, number>): void;
```

The only parameter is `request` of type [`NavigationRequest`](/docs/types#navigationrequest) omitting `number`.

<hr/>

### Notes ⚠️

- Unlike `navigate`, `replace` override the newest entry in the `history` object.

<hr/>

### Example

#### Replace with a path string

```ts
// ...

replace('/sign-in');

// ...
```

#### Replace with a named route

```ts
//...

replace({ name: 'Home' });

//...
```

#### Replace with a named dynamic route

```ts
//...

replace({ name: 'UserPage', params: { id: 1 } });

//...
```
