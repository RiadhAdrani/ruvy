# createRouter

`createrRouter` allows the user to initialize a router that uses the `DOM History API` to update the URL and react to any changes.

<hr/>

### Type & Parameters

```ts
function createRouter(routes: Array<RawRoute<RuvyNode>>, params: RouterParams): void;
```

acceps two arguments:

<br/>

- `routes` : the list of routes in the app, could be nested.
- `params` : an object containing additional routing config:
  - <small>_`base`_</small> : (optional) The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.
  - <small>_`scrolToTop`_</small> : (optional) auto scroll the window to the top when a new page loads.
  - <small>_`titleSuffix`_</small> : (optional) text to be added to all routes as a suffix.
  - <small>_`titlePrefix`_</small> : (optional) text to be added to all routes as a prefix.

<hr/>

### Route entry

A route entry is of type [`RawRoute`](/docs/types#rawroute) composed of the following keys:

<br/>

- `path` : the path of the route or the segment of route.
- `component` : the component representing the route.
- `name` : (optional) a globally unique name.
- `title` : (optional) the tab bar title of the route.
- `redirectTo` : (optional) a redirection full path.

<hr/>

### Dynamic routes

Like React Router or any other routing system, you only need to add `:` before the route name to indicate that it is a dynamic one like `:id` (nested) or `/user/:id` (flat).

<hr/>

### Notes ⚠️

- You need to use this method before calling `mountApp` to create a new router correctly.
- Calling this methid twice will override the previous settings.
- The `routes` parameter accept a mix of nested and flat routes.
- When using nested routes, add a slash `/` only for the first level of routes.
- Dynamic routes will be matched the last.
- Use an anchor element `<a/>` as the equivalent of `<Link/>` with `href` being the `to` attribute, e.g: `<a href="/">Home</a>`.
- Using `e.preventDefault()` on a sibling or parents of the anchor tag will cause the navigation effect to fail, because it relies on the event being propagated to the `window` object. you can use [`navigate`](/docs/api/navigate) or [`replace`](/docs/api/replace) instead.

<hr/>

### Examples

#### `Creating a simple router`

```ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    { path: '/', component: <Home />, title: 'Home' },
    { path: '/docs', component: <Docs />, title: 'Docs' },
  ],
  {}
);
```

#### `Creating nested routes`

```ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    {
      path: '/',
      component: <Home />,
      title: 'Home',
      name: 'Home',
      routes: [
        { path: 'docs', component: <Docs />, title: 'Docs' },
        { path: 'help', component: <Help />, title: 'Help' },
      ],
    },
  ],
  {}
);
```

#### `A mix of flat and nested routes`

```ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    {
      path: '/',
      component: <Home />,
      title: 'Home',
      routes: [
        { path: 'docs', component: <Docs />, title: 'Docs' },
        { path: 'help', component: <Help />, title: 'Help' },
      ],
    },
    {
      path: '/examples',
      component: <Examples />,
      title: 'Example',
    },
  ],
  {}
);
```

#### `Dynamic routes`

```ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    { path: '/', component: <Home />, title: 'Home' },
    {
      path: '/user',
      name: 'User',
      component: <User />,
      title: 'Docs',
      routes: [{ path: ':id', name: 'UserId', component: <UserSecion /> }],
    },
  ],
  {}
);
```
