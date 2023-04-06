import { describe, expect, it } from "vitest";
import { createJsxElement, createJsxFragmentElement } from "./index.js";
import { ComponentSymbol, ComponentTemplate } from "../../types/_component.js";

describe("createJsxElement", () => {
  it("should create a new element template with minimal args", () => {
    const template = createJsxElement("div", {});

    expect(template).toStrictEqual<ComponentTemplate>({
      children: [],
      elementType: "div",
      props: {},
      symbol: ComponentSymbol,
    });
  });

  it("should create a new element template with children", () => {
    const template = createJsxElement("div", {}, 1, 2, 3);

    expect(template).toStrictEqual<ComponentTemplate>({
      children: [1, 2, 3],
      elementType: "div",
      props: {},
      symbol: ComponentSymbol,
    });
  });

  it("should create a new element template with props", () => {
    const template = createJsxElement("div", { class: "test", id: "test" }, 1, 2, 3);

    expect(template).toStrictEqual<ComponentTemplate>({
      children: [1, 2, 3],
      elementType: "div",
      props: { class: "test", id: "test" },
      symbol: ComponentSymbol,
    });
  });

  it("should create a new element template with a callback as elementType ", () => {
    const callback = () => 0;

    const template = createJsxElement(callback, { class: "test", id: "test" }, 1, 2, 3);

    expect(template).toStrictEqual<ComponentTemplate>({
      children: [1, 2, 3],
      elementType: callback,
      props: { class: "test", id: "test" },
      symbol: ComponentSymbol,
    });
  });

  it("should create a new element template with flat children", () => {
    const template = createJsxElement("div", {}, 1, 2, 3, [4, 5, 6, [7, 8, [9]]]);

    expect(template).toStrictEqual<ComponentTemplate>({
      children: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      elementType: "div",
      props: {},
      symbol: ComponentSymbol,
    });
  });
});

describe("createJsxFragmentElement", () => {
  it("should just return children", () => {
    const fragment = createJsxFragmentElement("test", 1, 2, 3);

    expect(fragment).toStrictEqual<Array<unknown>>([1, 2, 3]);
  });

  it("should just return flat children", () => {
    const fragment = createJsxFragmentElement("test", 1, 2, 3, [4, 5, 6, [7, 8, 9, [10]]]);

    expect(fragment).toStrictEqual<Array<unknown>>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
