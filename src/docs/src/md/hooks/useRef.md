# useRef

<br/>

`useRef` is a Hook that lets you store a reference to a value, ideally used to reference DOM element.

<br/>

```ts
function useRef<T>(value: T): { value: T };
```

<br/>

### Parameters

<br/>

- _`value`_ : The value you want the ref object's `value` property to be initially. Ignored after the first render.

### Returns

<br/>

`useRef` returns an object with a single key `value` which contains the reference.

<br/>

### Example

```ts
import { useRef } from 'ruvy';

function Component = () => {

  const el = useRef();

  return <div ref={el}>Hello World</div>
}

```
