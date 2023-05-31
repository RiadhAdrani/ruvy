/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement } from "../create/index.js";

import { describe, expect, it, vitest } from "vitest";
import {
  getHtmlElementEventListeners,
  getHtmlElementProps,
  getNamespace,
  getParentHostBranch,
  initBranch,
  isHostBranch,
  getCorrectKey,
  getHostBranchIndexFromHostParent,
  getClosestHostBranches,
  getOutletDepth,
  combineClasses,
  preprocessProps,
} from "./index.js";
import { BranchTag, Namespace } from "../types.js";
import { createElement, injectNode } from "@riadh-adrani/dom-utils";
import { createTemplate } from "../create/index.js";
import root from "../process/new/root.js";
import { Outlet } from "../index.js";

createFragmentTemplate;
createJsxElement;

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
      [BranchTag.Text, true],
    ])("should determine if (%s) is host => (%s)", (tag, res) => {
      expect(isHostBranch(initBranch({ tag }))).toBe(res);
    });
  });

  describe("getElementHost", () => {
    const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

    it("should throw when host is not found", () => {
      expect(() => getParentHostBranch(initBranch())).toThrow(
        "Unable to locate the hosting branch."
      );
    });

    it("should get root as host element", () => {
      const branch = initBranch({ type: "div", parent: root });

      expect(getParentHostBranch(branch).instance).toStrictEqual(document.body);
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

      expect(getParentHostBranch(branch).instance).toStrictEqual(parentInstance);
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

  describe("getHostBranchIndexFromHostParent", () => {
    const Button = () => <button>Hello</button>;

    const Container = ({ children }: { children?: Array<unknown> }) => {
      return <>{children}</>;
    };

    it("should get index from direct parent", () => {
      const parent = root(document.body, <div />);

      const branch = parent.children[0];

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });

    it("should get index when nested (+1)", () => {
      const parent = root(
        document.body,
        <Container>
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[0];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });

    it("should get index when nested (+1) and post branches", () => {
      const parent = root(
        document.body,
        <Container>
          <button />
          <div />
        </Container>
      );

      const branch = parent.children[0].children[0].children[0];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });

    it("should get index when nested (+1) and offset", () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[1];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 1,
      });
    });

    it("should get index when nested (+1) and nested offset", () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            hello
            <div />
            <div />
            <div />
          </>
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[2];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 5,
      });
    });
    it("should get index when nested (+1) and nested offset", () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            <Container>
              <Button />
              <div />
            </Container>
          </>
          <button />
        </Container>
      );

      const branch = parent.children[0].children[0].children[2];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 3,
      });
    });

    it("should get index when nested (+2) and nested offset", () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            <Container>
              <Button />
              <div />
            </Container>
          </>
          <>
            <button />
          </>
        </Container>
      );

      const branch = parent.children[0].children[0].children[2].children[0];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 3,
      });
    });

    it("should get index from correct parent host", () => {
      const parent = root(
        document.body,
        <Container>
          <div />
          <>
            <Container>
              <Button />
              <div />
            </Container>
          </>
          <div>
            <button />
          </div>
        </Container>
      );

      const branch = parent.children[0].children[0].children[2].children[0];

      expect(branch.type).toBe("button");

      expect(getHostBranchIndexFromHostParent(branch, undefined)).toStrictEqual({
        found: true,
        index: 0,
      });
    });
  });

  describe("getClosestHostBranches", () => {
    it("should get host branch directly", () => {
      const parent = root(document.body, <div></div>);

      const branch = parent.children[0];

      expect(getClosestHostBranches(branch)).toStrictEqual([branch]);
    });

    it("should get host branch directly nested", () => {
      const parent = root(
        document.body,
        <>
          <div key="div"></div>
        </>
      );

      const branch = parent.children[0];

      expect(getClosestHostBranches(branch).map(item => item.key)).toStrictEqual(["div"]);
    });

    it("should get host branch nested (1)", () => {
      const parent = root(
        document.body,
        <>
          <div key="div" />
          <>
            <div key="div1" />
            <div key="div2" />
          </>
        </>
      );

      const branch = parent.children[0];

      expect(getClosestHostBranches(branch).map(item => item.key)).toStrictEqual([
        "div",
        "div1",
        "div2",
      ]);
    });

    it("should get host branch nested (2)", () => {
      const parent = root(
        document.body,
        <>
          <div key="div" />
          <>
            <div key="div1" />
            <div key="div2" />
            <>
              <div key="div3" />
              <div key="div4">
                <div />
                <div />
                <div />
              </div>
            </>
          </>
        </>
      );

      const branch = parent.children[0];

      expect(getClosestHostBranches(branch).map(item => item.key)).toStrictEqual([
        "div",
        "div1",
        "div2",
        "div3",
        "div4",
      ]);
    });
  });

  describe("getOutletDepth", () => {
    it("should return 1 when parent is undefined", () => {
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(1);
    });

    it("should return 0 : parent > outlet", () => {
      const parent = initBranch();
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(1);
    });

    it("should return 2 : root > parent > outlet", () => {
      const root = initBranch();
      const parent = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent: root });
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(2);
    });

    it("should return 2 : root > outlet > wrapper > outlet", () => {
      const root = initBranch();
      const parent = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent: root });
      const outletWrapper = initBranch({ parent });
      const outlet = initBranch({ type: Outlet, tag: BranchTag.Outlet, parent: outletWrapper });

      const depth = getOutletDepth(outlet);

      expect(depth).toBe(2);
    });
  });

  describe("combineClasses", () => {
    it("should join strings", () => {
      expect(combineClasses("test-1", "test-2")).toBe("test-1 test-2");
    });

    it("should join array and string", () => {
      expect(combineClasses(["test-1", "test-3"], "test-2")).toBe("test-1 test-3 test-2");
    });
  });

  describe("preprocessProps", () => {
    it("should transform and remove props with prefix [:class]", () => {
      expect(preprocessProps({ "class:test": true })).toStrictEqual({ class: "test" });
    });

    it("should ignore props with [:class] prefix when their value is not true", () => {
      expect(preprocessProps({ "class:test": false })).toStrictEqual({});
      expect(preprocessProps({ "class:test": 1 })).toStrictEqual({});
    });

    it("should ignore prop [:class]", () => {
      expect(preprocessProps({ "class:": false })).toStrictEqual({});
      expect(preprocessProps({ "class:  ": false })).toStrictEqual({});
    });

    it("should combine classnames", () => {
      expect(
        preprocessProps({ "class:test": true, "class:done": true, class: "tester" })
      ).toStrictEqual({
        class: "tester test done",
      });
    });
  });
});
