import { mountApp } from "../index.js";

const App = () => {
  return <div>Hello World</div>;
};

mountApp({
  callback: App,
  hostElement: document.getElementById("app") as HTMLElement,
});
