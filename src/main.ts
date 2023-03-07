import { range } from "@riadh-adrani/utils";
import {
  createComponent,
  processComponent,
  renderComponent,
  diffComponents,
  executeUpdateCallbacks,
} from "./component";

let n: number = 5;

const onClick = () => {
  n = n + 1;

  const updates = diffComponents(processed, processComponent(component()));

  console.log(updates);

  executeUpdateCallbacks(updates);
};

const component = (tag: "div" | "input" = "div") =>
  createComponent(tag, {
    children: range(n),
    onClick,
    style: {
      color: "red",
      fontWeight: "bold",
      fontSize: "3em",
      cursor: "pointer",
    },
  });

const processed = processComponent(component());

document.body.append(renderComponent(processed));
