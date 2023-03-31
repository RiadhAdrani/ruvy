import { mountApp } from "../index.js";

mountApp({
  callback: () => <div>Hello World</div>,
  hostElement: document.getElementById("root") as HTMLElement,
});
