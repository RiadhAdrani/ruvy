import { it, describe, expect } from "vitest";
import { createComponent } from "../Component";

describe("Component", () => {
  describe("createComponent", () => {
    it("should throw when tag is empty", () => {
      expect(() => createComponent("", {})).toThrow();
    });

    it("should create a component template with minimal props", () => {
      expect(createComponent("div", {})).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: {},
        events: {},
      });
    });

    it("should override tag", () => {
      expect(createComponent("div", { tag: "a" })).toStrictEqual({
        tag: "a",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: {},
        events: {},
      });
    });

    it("should add array of children", () => {
      expect(createComponent("div", { children: ["1", 2, true] })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: ["1", 2, true],
        attributes: {},
        events: {},
      });
    });

    it("should add single children in array", () => {
      expect(createComponent("div", { children: "1" })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: ["1"],
        attributes: {},
        events: {},
      });
    });

    it("should add event", () => {
      const onClick = () => undefined;

      expect(createComponent("div", { onClick })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: {},
        events: { onClick },
      });
    });

    it("should add unknown key as attribute", () => {
      const test = "test";

      expect(createComponent("div", { test })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: { test },
        events: {},
      });
    });
  });
});
