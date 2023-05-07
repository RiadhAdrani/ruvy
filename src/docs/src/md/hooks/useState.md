# useState

<br/>

`useState` is a Hook that lets you store a state variable in your component.

<br/>

```ts
function useState<T>(initialState: T): StateArray<T>;

type StateArray<T> = [T, (value: T) => void, Callback<T>];
```

<br/>

### Parameters

<br/>

- _`initialState`_ : The initial value of the state. It is ignored after the first rendering of the component.

### Returns

<br/>

`useState` returns an array with exactly three values:

- _`value`_ : The current state value.
- _`set`_ : a setter function that let's you update it and trigger a rerender.
- _`get`_ : a getter function that let's you retrieve the real time value of the state.

<br/>

### Example

```ts
import { useState } from 'ruvy';

function Component = () => {

  const [ count,setCount ] = useState(0);

  const increment = () => setCount(count + 1)

  return <div onClick={ increment }>{ count }</div>
}

```
