# createRouter

`createrRouter` allows the user to initialize a router that uses the `DOM History API` to update the URL and react to any changes.

<hr/>

### Type & Parameters

```ts
function createRouter(options: RouterOptions): void;
```

options support the given properties :

<br/>

- `routes` : an arrat of the app's routes, could be nested.
- `correctScrolling` : (optional) auto scroll the window to the top when a new page loads.
- `base` : (optional) The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.
- `transformTitle` : (optional) a function used to transform title before applying it.
- `type` : (optional) specify router type `Browser` or `Hash`. `Browser` by default.

<hr/>

### Routes Entries

> Router types are re-exported from [`@riadh-adrani/dom-router`](https://github.com/RiadhAdrani/dom-router?tab=readme-ov-file#types)

#### `Layout Raw Route`

Used to wrap routes in a layout :

```ts
interface LayoutRawRoute<T = unknown> {
  element: T;
  children?: Array<RawRoute<T>>;
}
```

#### `Path Raw Route`

Used for both wrapping path/layout entries :

```ts
interface PathRawRoute<T = unknown> {
  path: string;
  name?: string;
  element?: T;
  title?: string;
  children?: Array<RawRoute<T>>;
}
```

#### `Index Raw Route`

Used to define the main/index path of a nested `PathRoute`. Will be considered only when nested within a `PathRawRoute`

```ts
interface IndexRawRoute<T = unknown> {
  path: '';
  name?: string;
  element?: T;
  title?: string;
}
```

#### `Catch Raw Route`

Used to define a catch route.

```ts
interface CatchRawRoute<T = unknown> {
  path: '*';
  title?: string;
  element?: T;
}
```

### Dynamic routes

Like React Router or any other routing system, you only need to add `:` before the route name to indicate that it is a dynamic one like `:id` (nested) or `/user/:id` (flat).

<hr/>

### Notes ⚠️

- You need to use this method before calling `mountApp` to create a new router correctly.
- The `routes` parameter accept a mix of nested and flat routes.
- Dynamic routes will be matched the last.
- Use an anchor element `<a/>` as the equivalent of `<Link/>` with `href` being the `to` attribute, e.g: `<a href="/">Home</a>`.
- Using `e.preventDefault()` on a sibling or parents of the anchor tag will cause the navigation effect to fail, because it relies on the event being propagated to the `window` object. you can use [`navigate`](/docs/api/navigate).

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-tvwwac?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
