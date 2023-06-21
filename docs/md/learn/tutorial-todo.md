# Tutorial : Todo

Welcome to our comprehensive tutorial on building a simple `Todo List App` with `Ruvy`. In this tutorial, we will take you on a step-by-step journey to create a fully functional todo list, where you'll learn and apply the fundamental concepts of `Ruvy`. By the end of this tutorial, you'll have a solid understanding of Ruvy's `component-based` architecture, the power of `hooks` for managing, and how to efficiently `create`, `rea`d, and `delete` todo items. Whether you're a seasoned developer exploring a new framework or a beginner taking your first steps in web development, this tutorial will equip you with the skills to build dynamic web applications using Ruvy. Let's get started and bring your todo list to life with `Ruvy`!

<br/>

> ⚠️ We will be using `TypeScript` as it provides a better user experience and solid development flow.

> ✔️ You can find the final result <a href="https://stackblitz.com/edit/ruvy-tutorial-todo" target="_blank">`here`</a>.

<br/>

## `Setup the project 1️⃣`

For simplicity pursposes, we will be using the starter template in `StackBlitz`, which you can find <a href="https://stackblitz.com/edit/ruvy" target="_blank">`here`</a>.

<hr/>

## `Starting with a blank slate 🏜️`

Delete the content of the `src.main.tsx`, we are starting from zero 👌.

<hr/>

## `This is not a CSS tutorial ⛔`

This is obviously not a `CSS` tutorial, so you can copy the content of <a href="https://stackblitz.com/edit/ruvy-tutorial-todo?file=src%2Fstyle.css" target="_blank">`this file`</a> and replace whatever you have in your `src/style.css`.

<hr/>

## `Mounting our application 💨`

First, we need to mount our application to the DOM using `mountApp`, which we can import from `@riadh-adrani/ruvy`.

</br>

```ts
import { mountApp } from '@riadh-adrani/ruvy';
```

`mountApp` needs two parameters, a `hosting element` and the `Application callback`:

<br/>

```ts
const hostElement = document.querySelector<HTMLDivElement>('#app')!; // 👈 asserting that the element exists

const App = () => <div>Hello World</div>;

mountApp({ hostElement, callback: App });
```

This should display the "Hello World" text in the screen.

<hr/>

## `Creating the Layout 📏`

<hr/>

## `Adding a new Todo 📃`

<hr/>

## `Creating a <Todo/> component ⚛️`

<hr/>

## `Deleting a Todo ❌`

<hr/>

## `Updating a Todo 📝`

<hr/>

## `Improving the App : using Context ⬆️`

<hr/>

## `Adding another page/screen using the Router 🪧`

<hr/>

## `What's next 🎉`

Congrats on completing the tutorial, but we suggest that you continue your journey of learning through creating more complex apps, you may find these [`examples`](/examples) for inspiration, and in case of doubt feel free to check the [`documentation`](/docs).

<br/>

**`🎉 Happy Coding ! 🎉`**
