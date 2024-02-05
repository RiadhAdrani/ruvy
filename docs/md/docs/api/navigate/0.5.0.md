# navigate

`navigate` lets you navigate programmatically between routes.

<hr/>

### Type & Parameters

```ts
function navigate(request: NavigationRequest): void;
```

The only parameter is `request` of type [`NavigationRequest`](/docs/types#navigationrequest).

<hr/>

### Notes ⚠️

- `navigate` pushes a new entry to the `history` object.

<hr/>

### Example

#### Navigate with a path string

```ts
// ...

navigate('/sign-in');

// ...
```

#### Navigate with a named route

```ts
//...

navigate({ name: 'Home' });

//...
```

#### Navigate with a named dynamic route

```ts
//...

navigate({ name: 'UserPage', params: { id: 1 } });

//...
```

#### Navigate relatively

```ts
//...

navigate(-1); // previous path
navigate(1); // forward path

//...
```
