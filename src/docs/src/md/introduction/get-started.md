# Getting Started

<br/>

Welcome to the Ruvy documentation! This page will give you an introduction to the majority of the concepts that you will be using most of the times.

<br/>

> ## You will learn
>
> - How to create and nest components
> - How to add markup and styles
> - How to display data
> - How to respond to events and update the screen
> - How to share data between components

<br/>

## Creating and nesting components

Ruvy apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

<br/>

Ruvy components are JavaScript functions that return markup:

<br/>

```ts
function MyButton() {
  return <button>I'm a button</button>;
}
```

<br/>

Now that you’ve declared MyButton, you can nest it into another component:

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

<br/>

Notice that <MyButton /> starts with a capital letter. That’s how you know it’s a Ruvy component. Ruvy component names must always start with a capital letter, while HTML tags must be lowercase.

<br/>

Have a look at the result:

<br/>

```ts
function MyButton() {
  return <button>I'm a button</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

<br/>

## Writing markup with JSX

<br/>

The markup syntax you’ve seen above is called JSX. It is optional, but most Ruvy projects use JSX for its convenience. All of the tools we recommend for local development support JSX out of the box.

<br/>

JSX is stricter than HTML. You have to close tags like `<br />`. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a `<div>...</div>` or an empty `<>...</>` wrapper:

<br/>

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

<br/>

## Adding styles

<br/>

You can specify a CSS class with a `class` prop, and it works the same way as the HTML `class` attribute:

<br/>

```ts
<img class="avatar" />
```

<br/>

## Displaying data

<br/>

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display user.name:

<br/>

```ts
return <h1>{user.name}</h1>;
```

<br/>

You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes. For example, `className="avatar"` passes the "avatar" string as the CSS class, but `src={user.imageUrl}` reads the JavaScript `user.imageUrl` variable value, and then passes that value as the `src` attribute:

<br/>

```ts
return <img class="avatar" src={user.imageUrl} />;
```

<br/>

## Rendering lists

<br/>

You will rely on JavaScript features like for loop and the array map() function to render lists of components.

<br/>

For example, let’s say you have an array of products:

<br/>

```ts
const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];
```

<br/>

Inside your component, use the map() function to transform an array of products into an array of <li> items:

<br/>

```ts
const listItems = products.map((product) => <li key={product.id}>{product.title}</li>);

return <ul>{listItems}</ul>;
```

<br/>

Notice how `<li>` has a key attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. Ruvy uses your keys to know what happened if you later insert, delete, or reorder the items.

<br/>

> Duplicate `key` will result in an error.

<br/>

## Responding to events

<br/>

You can respond to events by declaring event handler functions inside your components:

<br/>

```ts
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

<br/>

Notice how onClick={handleClick} has no parentheses at the end! Do not call the event handler function: you only need to pass it down. Ruvy will call your event handler when the user clicks the button.

<br/>

## Responding to events

<br/>

Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.

<br/>

First, import useState from Ruvy:

<br/>

```ts
import { useState } from "ruvy";
```

<br/>

Now you can declare a state variable inside your component:

<br/>

```ts
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

<br/>

You’ll get two things from `useState`: the current state (`count`), and the function that lets you update it (`setCount`). You can give them any names, but the convention is to write `[something, setSomething]`.

<br/>

The first time the button is displayed, count will be 0 because you passed 0 to `useState()`. When you want to change state, call `setCount()` and pass the new value to it. Clicking this button will increment the counter:

<br/>

```ts
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

<br/>

Ruvy will call your component function again. This time, count will be 1. Then it will be 2. And so on.

<br/>

If you render the same component multiple times, each will get its own state. Click each button separately:

<br/>

```ts
import { useState } from "ruvy";

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

<br/>

Notice how each button “remembers” its own count state and doesn’t affect other buttons.
