# `if` directive

A structural directive that conditionally includes a component based on the value of an expression coerced to `boolean`. When the expression does not evaluates to `false`, `Ruvy` will render it, otherwise it will be hidden.

<br/>

### Example

```ts
<>
  <div if={true}>Show me</div> // will be rendered
  <div if={false}>Hide me</div> // will be hidden
</>
```

# `else-if` directive

You can use the `else-if` directive to indicate an `"else if block"` for `if` or another `else-if` directive.

<br/>

### Example

```ts
<>
  <div if={false}>Show me</div>
  <div else-if={true}>Else-if</div> // 👈 will be rendered
</>
```

You can chain `else-if`s :

<br/>

```ts
<>
  <div if={false}>Show me</div>
  <div else-if={false}>Else-if 1</div>
  <div else-if={true}>Else-if 2</div> // 👈 will be rendered
</>
```

# `else` directive

You can use the `else` directive to indicate an `"else block"` for `if` or `else-if` directives. The value is not taken into consideration.

### Example

```ts
<>
  <div if={false}>Show me</div>
  <div else>Else</div> // 👈 will be rendered
</>

<>
  <div if={false}>Show me</div>
  <div else-if={false}>Show me</div>
  <div else>Else</div> // 👈 will be rendered
</>

<>
  <div if={false}>Show me</div>
  <div else-if={false}>Show me</div>
  <div else-if={false}>Show me</div>
  <div else>Else</div> // 👈 will be rendered
</>
```

# Notes ⚠️

- Cannot use `else` or `else-if` directives before an `if` directive at the beginning, `Ruvy` will throw an error.
