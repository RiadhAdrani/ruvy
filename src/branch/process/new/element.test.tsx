/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import el from "./element.js";
import { initBranch } from "../../utils/index.js";
import { Branch, BranchStatus, BranchTag, BranchTemplate } from "../../types/index.js";

describe("new.element", () => {
  it("should create a new element branch", () => {
    const parent = initBranch();
    const jsx = <div></div>;
    const div = el(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(div).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Pending,
      tag: BranchTag.Element,
      type: "div",
      parent,
    });
  });

  it("should create a div with props", () => {
    const parent = initBranch();
    const jsx = <div class="test"></div>;
    const div = el(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(div).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { children: [], class: "test" },
      status: BranchStatus.Pending,
      tag: BranchTag.Element,
      type: "div",
      parent,
    });
  });
});
