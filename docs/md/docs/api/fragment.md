# Fragment

`<Fragment/>`, used also as `<></>`, is a built-in component that allows the user to group elements without the need of a wrapper node.

<hr/>

### Type & Parameters

```ts
function Fragment(props: PropsWithUtility): JSX.Element;
```

accepts an object of type [`PropsWithUtility`](/docs/types#propswithutility).

<hr/>

### Example

#### <Fragment/>

```ts
function Layout() {
  return (
    <Fragment>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Fragment>
  );
}
```

<hr/>

#### <></>

```ts
function Layout() {
  return (
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );
}
```
