# Rules of Hooks

<br/>

Hooks are a feature in Ruvy that allow you to use state and other Ruvy features in function components. They provide a way to reuse stateful logic, making your code more modular and easier to read. With hooks, you can manage state, perform side effects, and even create your own custom hooks to share functionality across components. Overall, hooks make it easier and more efficient to build complex applications with Ruvy.

<br/>

Just like `React`, hooks have some specific rules that should not be broken:

<br/>

- ### `Top Level`

Hooks should be used at the top level of a `function` components, so you can't use them in a `Array.prototype.map` callback, it will throw anyway.

<br/>

#### Example

```ts
const Component = () => {
  const items = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div>
      {items.map((n) => {
        // ⚠️ Invalid hook call !
        const [count, setCount] = useState(n);

        return <button onClick={() => setCount(count + 1)}>{count}</button>;
      })}
    </div>
  );
};
```

<br/>

- ### `Non-conditional`

Hooks should not be called within a `condition` block like `if`. The comparison relies on a constant call order of each hook, otherwise the framework will throw an error.

#### Example

```ts
const Component = ({ show }: { show: boolean }) => {
  if (show) {
    // ⚠️ No hooks in conditional blocks
    const [display, setDisplay] = useState(true);
  }

  return <div />;
};
```
