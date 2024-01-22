# mountApp

`mountApp` let's you mount your application and render it inside a browser DOM node.

<hr/>

### Type & Parameters

```ts
function mountApp(params: MountParams): void;
```

The only parameter is the `params` object of type [`MountParams`](/docs/types#mountparams), which contains multiple options :

<br/>

- _`host`_ (required) : A DOM element in which the application will be injected.
- _`app`_ (required) : a ruvy template.

<hr/>

### Notes ⚠️

- contrary to `React`, `Ruvy` allows the user to create **only a single app** in a given document, so if you try to call `mountApp` twice or more, you won't get two running apps.

<hr/>

### Example

<br/>

<iframe src="https://stackblitz.com/edit/ruvy-c7vnhf?embed=1&file=src%2Fmain.tsx&hideExplorer=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
