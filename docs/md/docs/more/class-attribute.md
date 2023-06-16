# Class attribute

In our framework, we have adopted the use of the `class` attribute instead of `className`, as commonly used in `React`. This decision was made to streamline the styling process and provide a more intuitive experience for developers. By using the familiar `class` attribute, you can leverage the power of CSS classes directly, without the need for additional JSX transformations. This not only simplifies the syntax but also allows you to seamlessly apply multiple classes to an element by providing either a `string` or an `array of strings` as the value of the class attribute. This flexibility empowers you to organize and manage your styles more efficiently, making it easier to achieve the desired look and feel for your components. Embracing the class attribute in our framework provides a smooth transition for developers familiar with traditional HTML and CSS practices, enhancing productivity and promoting code clarity.

---

### class not className

Just use `class` instead of `className`:

<br/>

```ts
<div class="better">Nice</div>
```

---

### string or array, it is all the same

Organize your classes:

<br/>

```ts
<div class={['better', 'way', 'for', 'css', 'classes']}>Nice</div>
```

---

### class directive

Conditionally add classes:

<br/>

```ts
const isActive = useMemo(() => {
  //...
});

<div class:active={isActive}>Nice</div>;
```
