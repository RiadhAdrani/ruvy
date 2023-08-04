# Event modifiers

It is a very common need to call `event.preventDefault()` or `event.stopPropagation()` inside event handlers. We can do it easily within methods, but it would be better if the methods can be more pure with only data logic rather than having to deal with DOM event details.

<br/>

At the moment we have two most common modifiers:

<br/>

- `onClick:prevent` : for `preventDefault()`
- `onClick:stop` : for `stopPropagation()`

<br/>

> ✅ You can also combine them like this : _`onClick:prevent-stop`_

<br/>

### Example

```ts
const clickHandler = () => {
  // logic
};

<>
  // no modifier
  <button onClick={clickHandler}></button>
  // will stop propagation to the parent
  <button onClick:stop={clickHandler}></button>
  // will prevent default behavior
  <button onClick:prevent={clickHandler}></button>
  // will do both
  <button onClick:prevent-stop={clickHandler}></button>
</>;
```

### Notes ⚠️

- You can only use on method per event which means defining `onClick` and `onClick:prevent` for example will result in only one of them to be used as an event listener.
