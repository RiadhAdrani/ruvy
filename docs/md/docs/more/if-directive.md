# if directive

A structural directive that conditionally includes a component based on the value of an expression coerced to `boolean`. When the expression does not evaluates to `false`, `Ruvy` renders will render it, otherwise it will be hidden.

<hr/>

### Example

```ts
<>
  <div if={true}>Show me</div> // will be rendered
  <div if={false}>Hide me</div> // will be hidden
</>
```
