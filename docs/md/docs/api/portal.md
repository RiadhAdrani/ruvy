# Portal

`<Portal/>` is a built-in component that allows us to "teleport" a part of a component's template into a DOM node that exists outside the DOM hierarchy of that component.

<hr/>

### Type & Parameters

```ts
function Portal(props: PortalProps): JSX.Element;
```

accepts an object of type [`PortalProps`](/docs/types#portalprops) with the following properties:

- `container` : the HTML element that will host the children.
- `key` : (optional) component key.
- `children` : (optional) children to be teleported. Can be ignored as you can nest children directly in the JSX.

<hr/>

### Notes ⚠️

- The `container` must be already in the DOM when the `<Portal>` component is mounted. Ideally, this should be an element outside the entire application. If targeting another element rendered by the framework, you need to make sure that element is mounted before the `<Portal>`.

<hr/>

### Example

#### Rendering a modal in the `body`

```ts
import HelloModal from './HelloModal.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import { Portal } from '@riadh-adrani/ruvy';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <Portal container={document.body}>
        <HelloModal />
      </Portal>
    </>
  );
}
```
