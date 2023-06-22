# Tutorial : Todo

Welcome to our comprehensive tutorial on building a simple `Todo List App` with `Ruvy`. In this tutorial, we will take you on a step-by-step journey to create a fully functional todo list, where you'll learn and apply the fundamental concepts of `Ruvy`. By the end of this tutorial, you'll have a solid understanding of Ruvy's `component-based` architecture, the power of `hooks` for managing, and how to efficiently `create`, `rea`d, and `delete` todo items. Whether you're a seasoned developer exploring a new framework or a beginner taking your first steps in web development, this tutorial will equip you with the skills to build dynamic web applications using Ruvy. Let's get started and bring your todo list to life with `Ruvy`!

<br/>

> ⚠️ We will be using `TypeScript` as it provides a better user experience and solid development flow.

> ✔️ You can find the final result <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx" target="_blank">`here`</a>.

<br/>

## `Setup the project 1️⃣`

For simplicity pursposes, we will be using the starter template in `StackBlitz`, which you can find <a href="https://stackblitz.com/edit/ruvy" target="_blank">`here`</a>.

<hr/>

## `Starting with a blank slate 🏜️`

Delete the content of the `src.main.tsx`, we are starting from zero 👌.

<hr/>

## `This is not a CSS tutorial ⛔`

This is obviously not a `CSS` tutorial, so you can copy the content of <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx,src%2Fstyle.css" target="_blank">`this file`</a> and replace whatever you have in your `src/style.css`.

<br/>

> Don't forget to import `style.css` in `main.tsx`

<br/>

```ts
import './style.css';
```

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
import { mountApp } from '@riadh-adrani/ruvy';
import './style.css';

const hostElement = document.querySelector<HTMLDivElement>('#app')!; // 👈 asserting that the element exists

const App = () => <div>Hello World</div>;

mountApp({ hostElement, callback: App });
```

This should display the "Hello World" text in the screen.

<hr/>

## `Creating the Layout 📏`

For organizational purposes, we will be writing our code in a new file that we will call `App.tsx`. Then, we will move the `App` callback to the new file.

<br/>

As a layout, we will have a big title at the top, under that we will place an input with a button which will allow us to add new todos. At the end, we will display the list of todos with the ability to edit and delete each one, we will have something like this:

```ts
const App = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input />
        <button>add</button>
      </div>
      <div>
        <div>
          <input type="checkbox" />
          <p>todo</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};

export default App;
```

It looks ugly at the moment, so let's add some classes :

<br/>

```ts
const App = () => {
  return (
    <div class="app-wrapper">
      <h1>Todo App</h1>
      <div class="new-todo-wrapper">
        <input class="new-todo-input" />
        <button>add</button>
      </div>
      <div class="todo-items-wrapper">
        <div class="todo-item">
          <input type="checkbox" />
          <p class="todo-item-text">todo</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};
```

Not the best, but that will do the job.

<hr/>

## `Adding a new Todo 📃`

To create a new todo, we need a `state` where we will store the user input, another `state` for the todos. We have two options, <a href="/docs/api/useState" target="_blank">`useState`</a> and <a href="/docs/api/useState" target="_blank">`useReactive`</a>, they serve the same purpose, but with caveat for each one. But first, let's declare a new `interface` for our `Todo` object:

<br/>

```ts
export interface ITodo {
  done: boolean;
  text: string;
  id: string;
}
```

then, at the top of the `App` function, we will use both `useState` and `useReactive`:

<br/>

```ts
// ⛔ useReactive accepts objects only !
const newTodoText = useReactive({ value: '' });

const [todos, setTodos] = useState<Array<ITodo>>([]);
```

Then we need a function to update the `newTodoText` value, and another one to create and push a new todo item :

<br/>

```ts
// update the input field
const updateNewTodoText = (value: string) => {
  newTodoText.value = value;
};

const addNewTodo = () => {
  // we don't add a todo when the text is empty
  if (!newTodoText.value.trim()) {
    alert('text is empty !');
    return;
  }

  // create a new todo
  const newTodo: ITodo = {
    done: false,
    id: Date.now().toString(),
    text: newTodoText.value,
  };

  // reset the value of the newTodoText
  newTodoText.value = '';

  // push it to the list of todos
  setTodos([...todos, newTodo]);
};
```

let's update our components tree to take into consideration our states and events:

<br/>

```ts
return (
  <div class="app-wrapper">
    <h1>Todo App</h1>
    <div class="new-todo-wrapper">
      <input
        class="new-todo-input"
        value={newTodoText.value}
        onInput={e => updateNewTodoText(e.currentTarget.value)}
      />
      <button onClick={addNewTodo}>add</button>
    </div>
    <div class="todo-items-wrapper">
      {todos.map(it => (
        <div class="todo-item" key={it.id}>
          <input type="checkbox" checked={it.done} />
          <p class="todo-item-text">{it.text}</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      ))}
    </div>
  </div>
);
```

Now, you can test both cases:

1. When the box is empty, and you click the `add` button, an alert saying `"text is empty"` should popup.
2. When the box is filled with at least on character and you click the `add` button, a new todo will appear just underneath.

<hr/>

## `Creating a <Todo/> component ⚛️`

Let's create a new component `<Todo/>` that will help us organize our code; create a new file `Todo.tsx`, we will be moving the logic in the `map` function into the new file:

```ts
import type { ITodo } from './App';

// it is recommended to create a props type
export interface TodoProps {
  // we don't need the key internally,
  // but Ruvy uses it to keep tracking the position of the element,
  key: string;
  // the actual data of the todo item
  it: ITodo;
}

const Todo = ({ it }: TodoProps) => {
  return (
    <div class="todo-item">
      <input type="checkbox" checked={it.done} />
      <p class="todo-item-text">{it.text}</p>
      <button>edit</button>
      <button>delete</button>
    </div>
  );
};

export default Todo;
```

And then, let's refactor our `map` function to use our new `<Todo/>` component:

<br/>

```ts
<div class="todo-items-wrapper">
  {todos.map(it => (
    <Todo it={it} key={it.id} />
  ))}
</div>
```

A little more cleaner 🧹 !

<hr/>

## `Deleting a Todo ❌`

We will add a new click listener to the `delete` button of the Todo component, we need the function itself, which we will add just before the return statement of the `App` component:

<br/>

```ts
const deleteTodo = (id: string) => {
  // filter out todos with the given id
  setTodos(todos.filter(it => it.id !== id));
};
```

However, we need to pass it to the `<Todo/>` component, so we will modify the `TodoProps` to accept a new property that we will call `onDelete` :

<br/>

```ts
import type { ITodo } from './App';

// it is recommended to create a props type
export interface TodoProps {
  // we don't need the key internally,
  // but Ruvy uses it to keep tracking the position of the element,
  key: string;
  // the actual data of the todo item
  it: ITodo;
  onDelete: (it: string) => void; // 👈 add this line
}

const Todo = ({ it, onDelete }: TodoProps) => {
  // deconstruct this 👆
  return (
    <div class="todo-item">
      <input type="checkbox" checked={it.done} />
      <p class="todo-item-text">{it.text}</p>
      <button>edit</button>
      <button onClick={() => onDelete(it.id)}>delete</button> // 👈 update this line
    </div>
  );
};

export default Todo;
```

Finally we pass the function to the component from `App.tsx` like this :

<br/>

```ts
<Todo it={it} key={it.id} onDelete={deleteTodo} />
```

<hr/>

## `Updating a Todo 📝`

As you may have guessed, we will be doing the same thing with the `update` process, but this time we need to change the state of the `Todo` component to an `edit` state, and then update it according to the needs. In the `edit` state, We will be displaying an input with two button `save` and `cancel`. We will add a new props named `onUpdate` just like `onDelete`,

<br/>

Here's how it should look after all what we dicussed earlier:

<br/>

```ts
import { useReactive } from '@riadh-adrani/ruvy';
import type { ITodo } from './App';

// it is recommended to create a props type
export interface TodoProps {
  // we don't need the key internally,
  // but Ruvy uses it to keep tracking the position of the element,
  key: string;
  // the actual data of the todo item
  it: ITodo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, update: Partial<Omit<ITodo, 'id'>>) => void;
  // 👆 this will be executing whenever we want to update the todo
}

const Todo = ({ it, onDelete, onUpdate }: TodoProps) => {
  const editMode = useReactive({ is: false, text: it.text });
  // this 👆 will store the edit state and the draft text

  // toggle between edit and normal mode
  const toggleEditMode = (value: boolean) => {
    if (value) {
      editMode.is = true;
      // initialize the text to the todo text value
      editMode.text = it.text;
    } else {
      editMode.is = false;
    }
  };

  // update the todo text
  const onSave = () => {
    onUpdate(it.id, { text: editMode.text });
    toggleEditMode(false);
  };

  // toggle the done state
  const toggleDone = () => {
    onUpdate(it.id, { done: !it.done });
  };

  return (
    <div class="todo-item">
      <>
        {!editMode.is ? (
          <>
            <input type="checkbox" checked={it.done} onChange={() => toggleDone()} />
            // add this 👆
            <p class="todo-item-text" style={{ textDecoration: it.done ? 'line-through' : '' }}>
              // 👆 will add a line-through when item is done
              {it.text}
            </p>
            <button onClick={() => toggleEditMode(true)}>edit</button>
            // and this 👆
            <button onClick={() => onDelete(it.id)}>delete</button>
          </>
        ) : (
          <>
            <input
              class="todo-item-input"
              value={editMode.text}
              //  also this 👆
              onInput={e => (editMode.text = e.currentTarget.value)}
              // this 👆 will update the draft text
            />
            <button onClick={() => onSave()}>save</button>
            // don't forget this 👆 which will update the text and close the edit mode
            <button onClick={() => toggleEditMode(false)}>cancel</button>
            // and finally add this 👆 to cancel from edit mode
          </>
        )}
      </>
    </div>
  );
};

export default Todo;
```

And in `App.tsx` :

<br/>

```ts
// ...

const updateTodo = (id: string, update: Partial<Omit<ITodo, 'id'>>) => {
  setTodos(todos.map(it => (it.id === id ? { ...it, ...update } : it)));
};

// ...

<div class="todo-items-wrapper">
  {todos.map(it => (
    <Todo it={it} key={it.id} onDelete={deleteTodo} onUpdate={updateTodo} />
  ))}
</div>;

// ...
```

And that's it for this tutorial, we hope you find it useful ! You can check the solution <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx" target="_blank">`here`</a>.

<hr/>

## `What's next 🎉`

Congrats on completing the tutorial, but we suggest that you continue your journey of learning through creating more complex apps, you may find these [`examples`](/examples) for inspiration, and in case of doubt feel free to check the [`documentation`](/docs).

<br/>

**`🎉 Happy Coding ! 🎉`**
