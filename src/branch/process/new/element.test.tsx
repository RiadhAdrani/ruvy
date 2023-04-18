/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import el from "./element.js";
import { initBranch } from "../../utils/index.js";
import { ActionType, BranchStatus, BranchTag, BranchTemplate } from "../../types/index.js";
import { omit } from "@riadh-adrani/utils";

describe("new.element", () => {
  it("should create a new element branch", () => {
    const parent = initBranch();
    const jsx = <div></div>;
    const div = el(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(omit(div, "pendingActions")).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [] },
      status: BranchStatus.Pending,
      tag: BranchTag.Element,
      type: "div",
      parent,
    });

    expect(div.pendingActions.length).toBe(1);

    const { type } = div.pendingActions[0];
    expect(type).toBe(ActionType.Render);
  });

  it("should create a div with props", () => {
    const parent = initBranch();
    const jsx = <div class="test"></div>;
    const div = el(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(omit(div, "pendingActions")).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [], class: "test" },
      status: BranchStatus.Pending,
      tag: BranchTag.Element,
      type: "div",
      parent,
    });
  });
});
