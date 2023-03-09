import { mountApp, setState, createJsxElement } from "./core";

const hostElement = document.getElementById("app")!;

declare global {
  namespace JSX {
    type IntrinsicElements = Record<string, Record<string, unknown>>;
  }
}

const Component = ({ name = "Loading..." }: { name?: string }) => {
  return <div>{name}</div>;
};

mountApp({
  hostElement,
  callback: () => {
    const [value, setValue] = setState("text", "1");

    return (
      <div class="home" id="me">
        <input
          value={value}
          onInput={(e: Event) => setValue((e.target as unknown as Record<string, string>).value)}
        />
        {value}
        <Component name="yes" />
      </div>
    );
  },
});
