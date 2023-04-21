/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import { initBranch } from "../../utils/index.js";
import { ActionType, BranchStatus, BranchTag } from "../../types/index.js";
import text from "./text.js";
import { omit } from "@riadh-adrani/utils";

describe("new.text", () => {
  it("should create a text branch", () => {
    const parent = initBranch();
    const div = text("test", parent, 0);

    expect(omit(div, "pendingActions")).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: {},
      status: BranchStatus.Mounting,
      tag: BranchTag.Text,
      type: BranchTag.Text,
      parent,
      text: "test",
    });

    expect(div.pendingActions.length).toBe(1);
    expect(div.pendingActions[0].type).toBe(ActionType.Render);
  });
});
