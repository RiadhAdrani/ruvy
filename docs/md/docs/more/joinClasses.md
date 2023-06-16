# joinClasses

`joinClasses` is a function that filters and join classes of different types.

<hr/>

### Type & Parameters

```ts
function joinClasses(...classes: Arrayable<string | undefined | null>): string;
```

Accepts `Arrayable` arguments of type `string`, `undefined` or `null`.

<hr/>

### Notes ⚠️

- Eleminate `falsy` values like `undefined`, `null` or `false`.

<hr/>

### Example

```ts
joinClasses('join', 'classes'); // `join classes`
joinClasses(['join'], 'classes'); // `join classes`
joinClasses(['join'], undefined, 'classes', null); // `join classes`
```
