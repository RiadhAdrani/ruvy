# Outlet

`<Outlet/>` is a component that dynamically renders the suitable elements for the current router state.

<hr/>

### Type & Parameters

```ts
function Outlet(): void;
```

The only parameter is the `path` string.

<hr/>

### Notes ⚠️

- `<Outlet/>` returns the `catch`/`catch-all` component when no route mathces the current context.

<hr/>

### Example

#### Rendering the content of the website

```ts
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import { Outlet } from '@riadh-adrani/ruvy';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
```

#### Rendering a dynamic section of a page

```ts
import SideBar from './SideBar.js';
import { Outlet } from '@riadh-adrani/ruvy';

function User() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
```
