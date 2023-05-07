# useEffect

<br/>

`useEffect` is a Hook that lets you synchronize a component with an external system.

<br/>

```ts
function useEffect(callback: EffectCallback, deps?: unknown): void;

type Callback<T = void> = () => T;

type EffectCallback = Callback<void | Callback>;
```

<br/>

### Parameters

<br/>

- _`callback`_ : The function with your Effect's logic, it can optionally return a cleanup function which will be executed when the component is unmounted, or when the deps changes.

- _`deps`_ : optional dependencies. Used to track reactive values inside the callback. if omitted, the effect will run only once.

<br/>

### Example

```ts
import { useEffect } from 'ruvy';

function Component = () => {

  const [isConnected, setConnected] = useState(false);

  useEffect(() => {

    // fetch something from an api and update state
    fetch('some-api-url').then((v) => {
      setConntext(v)
    })
  })

  return <div> You are {isConnected ? 'Connected' : 'Offline'} </div>
}

```
