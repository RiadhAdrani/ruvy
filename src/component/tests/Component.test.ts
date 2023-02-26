import { it, describe, expect } from "vitest";
import { RawComponentTemplate } from "../../types";
import { isValidRawComponent, transformComponentTemplate } from "../Component";

describe("Component", () => {
  it.each([
    [{}, false],
    ["", false],
    [0, true],
    [true, true],
    [false, true],
    [() => 1, true],
  ])("should validate child %s", (child, expected) => {
    expect(isValidRawComponent(child)).toBe(expected);
  });

  describe("transformComponentTemplate", () => {
    it.each([[""], [" "], [false], [true], [{}]])("should throw when tag is invalid", (tag) => {
      const template = { tag } as RawComponentTemplate;

      expect(() => transformComponentTemplate(template)).toThrow();
    });

    it("should assign default values", () => {
      const template = { tag: "div" };

      expect(transformComponentTemplate(template)).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        events: {},
        attributes: {},
      });
    });

    it("should add children as single element", () => {
      const template = { tag: "div", children: "test" };

      expect(transformComponentTemplate(template)).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: ["test"],
        events: {},
        attributes: {},
      });
    });

    it("should filter children array", () => {
      const template = { tag: "div", children: ["test", undefined, null] };

      expect(transformComponentTemplate(template)).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: ["test"],
        events: {},
        attributes: {},
      });
    });

    it("should add events", () => {
      const onClick = () => undefined;
      const onChange = () => undefined;

      const template = { tag: "div", onClick, onChange };

      expect(transformComponentTemplate(template)).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        events: { onClick, onChange },
        attributes: {},
      });
    });

    it("should add attributes", () => {
      const template = { tag: "div", class: "test", id: "test" };

      expect(transformComponentTemplate(template)).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        events: {},
        attributes: { class: "test", id: "test" },
      });
    });
  });
});
