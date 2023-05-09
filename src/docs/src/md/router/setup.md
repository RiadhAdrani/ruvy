# Router

<br/>

A router enables `client side routing`

<br/>

Client side routing allows the update of the URL from a link click without making another request for another document from the server. Instead, your app can immediately render some new UI and make data requests with fetch to update the page with new information.

<br/>

## Setup

<br/>

To setup the router, all you need is to call `createRouter` rendering the app using `mountApp`

<br/>

```ts
function createRouter(
  routes: Array<RawRoute<RuvyNode>>,
  config: Omit<RouterParams, "onStateChange">
): void;

interface RawRoute<T = unknown> extends CommonRoute<T> {
  routes?: Array<RawRoute>;
}

type RuvyNode = BranchTemplate | string | boolean | null | undefined | number;

interface RouterParams {
  onStateChange: Callback;
  base?: string;
  scrollToTop?: boolean;
}
```

<br/>

### Example

<br/>

Two examples of creating an app with a home and about pages :

<br/>

#### Nested

```ts
createRouter([
  {
    path: "/",
    title: "Home",
    element: <Home />,
    routes: [
      {
        path: "about",
        title: "About",
        element: <About />,
      },
    ],
  },
]);
```

<br/>

#### Flat

```ts
createRouter([
  {
    path: "/",
    title: "Home",
    element: <Home />,
  },
  {
    path: "/about",
    title: "About",
    element: <About />,
  },
]);
```

<br/>

#### Notes

- _When nesting routes, You don't need to add `/` to children routes._
- _You can mix and match the two methods, but keep in mind that the newest will override the current._

<br/>

### Dynamic Route

<br/>

Like other `Routers` and `Frameworks`, you can add `:` to the beginning of the path to signal that it is a dynamic.

<br/>

#### Example

```ts
[
  {
    path: "/user",
    element: <User />,
    title: "Users",
    routes: [
      {
        path: ":id",
        element: <UserId />,
      },
    ],
  },
];
```
