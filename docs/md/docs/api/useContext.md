# useContext

`useContext` is a hook that lets subscribe to context from your component, which removes the need of props drilling.

<br/>

Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.

<br/>

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called [`"props drilling"`](https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props).

<hr/>

### Type & Parameters

```ts
function useContext<T>(object: ContextObject<T>): T;
```

The only parameter is the context `object` of type [`ContextObject`](/docs/types#contextobject), which is the output of [`createContext`](/docs/api/createContext). Like `React`, The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

<br/>

### Returns

useContext returns the context value for the calling component. It is determined as the value passed to the closest `Context.Provider` above the calling component in the tree. If there is no such provider, then the returned value will be the defaultValue you have passed to createContext for that context. The returned value is always up-to-date. Ruvy automatically re-renders components that read some context if it changes.

<hr/>

### Notes ⚠️

- `useContext` call in a component is not affected by providers returned from the same component. The corresponding `<Context.Provider>` needs to be above the component doing the `useContext` call.
- If The context is not found, an `exception` will be thrown.

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
