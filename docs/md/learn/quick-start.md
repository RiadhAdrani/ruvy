# Quick Start

In this section, you will learn:

> - How to create and nest components
> - How to add markup and styles
> - How to display data
> - How to render conditions and lists
> - How to respond to events and update the screen

<br/>

## Creating and nesting components

`React`, `Vue`, `Angular`, `Svelte` and many other frameworks' apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

<br/>

`Ruvy` components are JavaScript functions that return markup:

<br/>

```ts
function MyButton() {
  return <button>Click me</button>;
}
```

Now that you’ve declared MyButton, you can nest it into another component:

<br/>

```ts
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

Notice that `<MyButton/>` starts with a capital letter. That’s how you know it’s a `Ruvy` component. `Ruvy` Component names must always start with a capital letter, while HTML tags must be lowercase.

<hr/>

## Writing markup with JSX

The markup syntax you’ve seen above is called JSX. It is optional, but most `Ruvy` projects use JSX for its convenience, and we highly recommend it, otherwise, you may question your own existence.

<br/>

JSX is stricter than HTML. You have to close tags like `<br />`. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a `<div>...</div>` or an empty `<>...</>` wrapper:

```ts
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
```

<hr/>

## Adding styles

Unlike `React`, you specify a CSS class not with `className`, but with `class` just like html:

<br/>

```ts
<img class="avatar" />
```

Then you write the CSS rules for it in a separate CSS file:

```css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
```

We do not prescribe how you add CSS files. In the simplest case, you’ll add a `<link>` tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

<hr/>

## Displaying Data

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display `user.name`:

<br/>

```ts
return <h1>{user.name}</h1>;
```

You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes. For example, `class="avatar"` passes the `"avatar"` string as the CSS class, but `src={user.imageUrl}` reads the JavaScript `user.imageUrl` variable value, and then passes that value as the src attribute:

<br/>

```ts
return <img class="avatar" src={user.imageUrl} />;
```

<hr/>

## Conditional rendering

Like `React`, you can use the same techniques as you use when writing regular JavaScript code. For example, you can use an if statement to conditionally include JSX:

<br/>

```ts
let content;

if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return <div>{content}</div>;
```

If you prefer more compact code, you can use the `conditional ? operator`. Unlike if, it works inside JSX:

<br/>

```ts
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

When you don’t need the else branch, you can also use a shorter `logical &&` syntax:

<br/>

```ts
<div>{isLoggedIn && <AdminPanel />}</div>
```

### conditional directives

We saved the best for last, we offer [`if`](/docs/more/if-directive), [`else-if`](/docs/more/if-directive#elseif) and [`else`](/docs/more/if-directive#else) directives that works like `Vue.js`.

<br/>

```ts
<>
  <div if={false} />
  <div else-if={false} />
  <div else /> // 👈 will render
</>
```

<hr/>

## Rendering lists

You will rely on JavaScript features like for loop and the array map() function to render lists of components.

For example, let’s say you have an array of products:

<br/>

```ts
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

Inside your component, use the `map()` function to transform an array of products into an array of `<li>` items:

```ts
const listItems = products.map(product => <li key={product.id}>{product.title}</li>);

return <ul>{listItems}</ul>;
```

Notice how `<li>` has a `key ` attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. `Ruvy` uses your keys to know what happened if you later insert, delete, or reorder the items.

<br/>

> If there is a duplicate `key`, `Ruvy` will throw an error.

<hr/>

## Responding to events

You can respond to events by declaring event handler functions inside your components:

<br/>

```ts
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

Notice how `onClick={handleClick}` has no parentheses at the end! **DO NOT** call the event handler function: you only need to pass it down. `Ruvy` will call your event handler when the user clicks the button.

<hr/>

## Updating the screen

Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.

<br/>

First, import `useState`:

<br/>

```ts
import { useState } from '@riadh-adrani/ruvy';
```

Now you can declare a state variable inside your component:

<br/>

```ts
function MyButton() {
  const [count, setCount, getCount] = useState(0);
  // ...
```

You’ll get three things from `useState`: the current state (`count`), the function that lets you update it (`setCount`) and a getter function `getCount` that will retrieve the current value of the state. You can give them any names, but the convention is to write [``value``, ``setValue``, `getValue`].

<br/>

The first time the button is displayed, `count` will be `0` because you passed `0` to `useState()`. When you want to change state, call `setCount()` and pass the new value to it. Clicking this button will increment the counter:

```ts
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

`Ruvy` will compute your component function again. This time, count will be `1`. Then it will be `2`. And so on.

<br/>

If you render the same component multiple times, each will get `its own state`.

<br/>

> For more infos about hooks, check out the [Hooks](/docs/api#hooks) documentation.

<hr/>

## Next step

Check out the [Tutorial](/learn/tutorial-todo) to put them into practice and build your first mini-app.

<br/>
