import { mountApp } from "../index.js";
import { setState, setEffect } from "../branch/index.js";

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

const App = () => {
  const [text, setText] = setState("");

  setEffect(() => {
    console.log("hello");
  });

  return (
    <>
      <Button />
      <Button />
      <input value={text} class={[text]} onInput={(e) => setText(e.currentTarget.value)} />
      {text === "" && <Button />}
    </>
  );
};

mountApp({
  callback: App,
  hostElement: document.getElementById("app") as HTMLElement,
});
