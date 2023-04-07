import { describe, expect, it } from "vitest";
import { isComponentTemplate, isTemplateChild } from "./index.js";
import { ComponentSymbol } from "../../types/_component.js";

describe("isComponentTemplate", () => {
  it.each(["test", 1, true, false, null, undefined])(
    "should refuse primitive type: (%s)",
    (value) => {
      expect(isComponentTemplate(value)).toBe(false);
    }
  );

  it("should refuse objects with missing props", () => {
    const obj = { elementType: "div", children: [] };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should refuse objects with non-object props", () => {
    const obj = { elementType: "div", children: [], props: 1 };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should refuse objects with array as props", () => {
    const obj = { elementType: "div", children: [], props: [] };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should refuse objects with missing elementType", () => {
    const obj = { props: {}, children: [] };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should refuse objects with blank elementType", () => {
    const obj = { props: {}, children: [], elementType: "" };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should refuse objects with missing children", () => {
    const obj = { props: {}, elementType: "div" };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should refuse object with missing symbol", () => {
    const obj = { props: {}, elementType: "div", children: [] };

    expect(isComponentTemplate(obj)).toBe(false);
  });

  it("should accept object with valid props, elementType and children and symbol", () => {
    const obj = { props: {}, elementType: "div", children: [], symbol: ComponentSymbol };

    expect(isComponentTemplate(obj)).toBe(true);
  });

  it("should accept object with functrion as elementType", () => {
    const obj = { props: {}, elementType: () => 0, children: [], symbol: ComponentSymbol };

    expect(isComponentTemplate(obj)).toBe(true);
  });
});

describe("isTemplateChild", () => {
  it("should refuse false", () => {
    expect(isTemplateChild(false)).toBe(false);
  });

  it("should refuse null", () => {
    expect(isTemplateChild(null)).toBe(false);
  });

  it("should refuse undefined", () => {
    expect(isTemplateChild(undefined)).toBe(false);
  });

  it("should accept empty object", () => {
    expect(isTemplateChild({})).toBe(true);
  });

  it("should accept component template", () => {
    expect(
      isTemplateChild({ props: {}, elementType: "div", children: [], symbol: ComponentSymbol })
    ).toBe(true);
  });

  it("should accept strings", () => {
    expect(isTemplateChild("test")).toBe(true);
  });

  it("should accept numbers", () => {
    expect(isTemplateChild(1)).toBe(true);
  });

  it("should accept true", () => {
    expect(isTemplateChild(true)).toBe(true);
  });
});
