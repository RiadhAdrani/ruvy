import { createComponent, processComponent, renderComponent } from "./component";

const component = createComponent("div", {
  children: [
    "Hello",
    "World",
    createComponent("input", {
      oninput: () => {},
    }),
  ],
  onClick: () => {
    console.log("hello world");
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
