/** @jsx createJsxElement */

import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import element from "./element.js";
import { initBranch } from "../../utils/index.js";
import { ActionType, BranchStatus, BranchTag, BranchTemplate } from "../../types.js";
import { omit } from "@riadh-adrani/utils";

createJsxElement;

describe("new.element", () => {
  it("should create a new element branch", () => {
    const parent = initBranch();
    const jsx = <div></div>;
    const div = element(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(omit(div, "pendingActions")).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: "div",
      parent,
      unmountedChildren: [],
    });

    expect(div.pendingActions.length).toBe(1);

    const { type } = div.pendingActions[0];
    expect(type).toBe(ActionType.Render);
  });

  it("should create a div with props", () => {
    const parent = initBranch();
    const jsx = <div class="test"></div>;
    const div = element(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(omit(div, "pendingActions")).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [], class: "test" },
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: "div",
      parent,
      unmountedChildren: [],
    });
  });

  it("should throw with duplicate children keys", () => {
    const parent = initBranch();
    const jsx = (
      <div>
        <div key={1} />
        <div key={1} />
        <div />
      </div>
    );

    expect(() => element(jsx as BranchTemplate<string>, parent, 0)).toThrow();
  });
});
