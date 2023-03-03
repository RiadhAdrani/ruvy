import { createComponent, transformRawComponentTemplate } from "./component/Component";

/** @jsx createComponent */

const App = createComponent(({}) => {
  return {
    tag: "a",
    children: ["Hello", () => {}],
    onClick: () => 0,
    onChange: () => 0,
    ns: "http://www.w3.org/1998/Math/MathML",
  };
});
