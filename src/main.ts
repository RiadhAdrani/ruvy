import { mountApp, setEffect, setState, createComponent } from "./core";

const hostElement = document.getElementById("app")!;

mountApp({
  hostElement,
  callback: () => {
    const [value, _, getValue] = setState("text", 1);
    const [should, setShould] = setState("should-render", false);

    setEffect(
      () => {
        document.getElementById("el")!.style.fontSize = `${getValue() + 10}px`;
      },
      "log",
      value
    );

    return createComponent("div", {
      id: "el",
      children: [
        createComponent("button", {
          children: "Click",
          onClick: () => {
            setShould(!should);
          },
        }),
        !should ? {} : createComponent("p", { children: ["Hello"] }),
        createComponent("p", { children: ["World"] }),
      ],
    });
  },
});
