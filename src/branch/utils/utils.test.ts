import { describe, expect, it, vitest } from "vitest";
import {
  getHtmlElementEventListeners,
  getHtmlElementProps,
  getNamespace,
  getElementHost,
  initBranch,
  isHostBranch,
  getCorrectKey,
} from "./index.js";
import { BranchTag, Namespace } from "../types/index.js";
import { createElement, injectNode } from "@riadh-adrani/dom-utils";
import { createTemplate } from "../create/index.js";

describe("utils", () => {
  describe("getNamespace", () => {
    it("shoult get namespace from props", () => {
      const branch = initBranch({ props: { ns: Namespace.MATH } });

      expect(getNamespace(branch)).toBe(Namespace.MATH);
    });

    it("shoult get default namespace", () => {
      const branch = initBranch({ props: {} });

      expect(getNamespace(branch)).toBe(Namespace.HTML);
    });
  });

  describe("getHtmlElementProps", () => {
    it("should collect html attributes", () => {
      const branch = initBranch({ props: { class: "test", id: "test" } });

      const attributes = getHtmlElementProps(branch);

      expect(attributes).toStrictEqual({ class: "test", id: "test" });
    });

    it("should skip ns, children, key and events", () => {
      const branch = initBranch({ props: { ns: "test", children: [], key: 0, onClick: () => 0 } });

      const attributes = getHtmlElementProps(branch);

      expect(attributes).toStrictEqual({});
    });
  });

  describe("getHtmlElementEventListeners", () => {
    it("should collect html events", () => {
      const onClick = vitest.fn();
      const onInput = vitest.fn();

      const branch = initBranch({ props: { onClick, onInput } });

      const attributes = getHtmlElementEventListeners(branch);

      expect(attributes).toStrictEqual({ onClick, onInput });
    });

    it("should ignore non-functions", () => {
      const onClick = "test";

      const branch = initBranch({ props: { onClick } });

      const attributes = getHtmlElementEventListeners(branch);

      expect(attributes).toStrictEqual({});
    });
  });

  describe("isHostBranch", () => {
    it.each([
      [BranchTag.Element, true],
      [BranchTag.Fragment, false],
      [BranchTag.Function, false],
      [BranchTag.Null, false],
      [BranchTag.Root, true],
      [BranchTag.Text, false],
    ])("should determine if (%s) is host => (%s)", (tag, res) => {
      expect(isHostBranch(initBranch({ tag }))).toBe(res);
    });
  });

  describe("getElementHost", () => {
    const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

    it("should throw when host is not found", () => {
      expect(() => getElementHost(initBranch())).toThrow("Unable to locate the hosting branch.");
    });

    it("should get root as host element", () => {
      const branch = initBranch({ type: "div", parent: root });

      expect(getElementHost(branch)).toStrictEqual(document.body);
    });

    it("should get the closest host element", () => {
      const parentInstance = createElement("div");

      injectNode(parentInstance, document.body);

      const parent = initBranch({
        type: "div",
        parent: root,
        instance: parentInstance,
        tag: BranchTag.Element,
      });
      const branch = initBranch({ type: "div", parent });

      expect(getElementHost(branch)).toStrictEqual(parentInstance);
    });
  });

  describe("getCorrectKey", () => {
    it.each([
      [createTemplate("div", { key: 1 }, []), 3, 1],
      [createTemplate("div", {}, []), 1, 1],
      ["hello", 0, 0],
      [null, 0, 0],
    ])("should get correct key", (template, index, expected) => {
      expect(getCorrectKey(template, index)).toBe(expected);
    });
  });
});
