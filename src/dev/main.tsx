import { mountApp } from "../index.js";
import { setState, setEffect } from "../branch/index.js";
import { RuvyNode } from "../branch/types/index.js";
import { Arrayable } from "@riadh-adrani/utils";

const Button = () => {
  const [count, setCount] = setState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={onClick} style={{ cursor: "pointer" }}>
      {count}
    </button>
  );
};

const Container = ({ children }: { children?: Arrayable<RuvyNode> }) => {
  return <main>{children}</main>;
};

const App = () => {
  const [text, setText] = setState("");

  setEffect(() => {}, Date.now());

  const items = [
    { key: "1", name: "hello" },
    { key: "2", name: "world" },
    { key: "3", name: "test" },
  ].filter(
    (item) =>
      !text.trim() || item.name.toLocaleLowerCase().includes(text.trim().toLocaleLowerCase())
  );

  return (
    <>
      <input value={text} class={[text]} onInput={(e) => setText(e.currentTarget.value)} />
      <Container>
        {items.map((item) => (
          <div key={item.key} class={item.key}>
            <span>{item.name}</span>
            <Button />
          </div>
        ))}
      </Container>
    </>
  );
};

mountApp({
  callback: App,
  hostElement: document.getElementById("app") as HTMLElement,
});
