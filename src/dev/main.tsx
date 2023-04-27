import { mountApp } from "../index.js";
import { setState } from "../branch/index.js";
import { RuvyNode } from "../branch/types/index.js";
import { Arrayable } from "@riadh-adrani/utils";

const Container = ({ children }: { children?: Arrayable<RuvyNode> }) => {
  return <main>{children}</main>;
};

const App = () => {
  const [value, setValue] = setState(false);

  return (
    <>
      <input type="checkbox" onChange={(e) => setValue(e.currentTarget.checked)} />
      <Container>{value ? <div>Hello</div> : <button>World</button>}</Container>
    </>
  );
};

mountApp({
  callback: App,
  hostElement: document.getElementById("app") as HTMLElement,
});
