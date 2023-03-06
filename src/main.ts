import { createComponent, processComponent, renderComponent } from "./component";

const component = createComponent("div", {
  children: [
    "Hello",
    "World",
    createComponent("input", {
      oninput: () => {},
    }),
  ],
  onMouseEnter: () => {
    console.log("hello");
  },
  onContextMenu: (e: Event) => {
    e.preventDefault();
  },
  class: ["container", "content"],
  id: "me",
  style: {
    color: "red",
    "font-weight": "bold",
  },
  "data-title": "test",
  dataset: {
    titler: "titler",
  },
});

const processed = processComponent(component);

document.body.append(renderComponent(processed));
