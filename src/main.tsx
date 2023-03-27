import { mountApp } from "./core/index.js";

const hostElement = document.getElementById("app") as HTMLDivElement;

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
