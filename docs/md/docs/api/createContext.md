# createContext

`createContext` lets you create a context that components can provide or read.

<hr/>

### Type & Parameters

```ts
function createContext<T>(object: T): ContextObject<T>;
```

The only parameter is `object`, which is the initial value of the context.

<br/>

### Returns

createContext returns a [`ContextObject`](/docs/types#contextobject).

<br/>

The context object itself does not hold any information. It represents which context other components read or provide. Typically, you will use `Context.Provider` in components above to specify the context value, and call [`useContext(Context)`](/docs/api/useContext) in components below to read it. The context object has a single property, `Context.Provider` that lets you provide the context value to components.

<hr/>

### Example

#### Creating the context and using Context.Provider

```ts
import { useState, createContext, useContext } from '@riadh-adrani/ruvy';

// creating a new context object.
const CountContext = createContext(0);

function Parent() {
  const [count, setCount] = useState(0);

  // surrounding the child with a Context.Provider
  return <CountContext.Provider value={count}><Child/></CountContext.Provider/>
}

function Child() {
  // consuming the context
  const count = useContext(CountContext)

  return <div>{count}</div>
}
```
