import { mountApp } from "./core";

const hostElement = document.getElementById("app")!;

mountApp({
  hostElement,
  callback: () => {
    const [value, setValue] = setState("value", "");

    return (
      <div>
        <svg svg>
          <a svg>Hello World</a>
        </svg>
        <input value={value} onInput={(e) => setValue(e.currentTarget.value)} />
        <br />
        <span>value: {value}</span>
      </div>
    );
  },
});
