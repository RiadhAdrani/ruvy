# mountApp

`mountApp` let's you mount your application and render it inside a browser DOM node.

<hr/>

### Type & Parameters

```ts
function mountApp(params: MountParams): void;
```

The only parameter is the `params` object of type [`MountParams`](/docs/types#mountparams), which contains multiple options :

<br/>

- _`hostElement`_ (required) : A DOM element. Ruvy will use it to render the app.
- _`callback`_ (required) : A callback returning a JSX element, it represent your app.

<hr/>

### Notes ⚠️

- contrary to `React`, `Ruvy` allows the user to create **only a single app** in a given document, so if you try to call `mountApp` twice or more, you won't get two running apps.

<hr/>

### Example

Mounting an "Hello World" app

```ts
import { mountApp } from '@riadh-adrani/ruvy';

const App = () => <div>Hello World</div>;

const host = document.body;

// mounting the app
mountApp({ hostElement: host, callback: App });
```
