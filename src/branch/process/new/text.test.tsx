/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import { initBranch } from "../../utils/index.js";
import { Branch, BranchStatus, BranchTag } from "../../types/index.js";
import text from "./text.js";

describe("new.text", () => {
  it("should create a text branch", () => {
    const parent = initBranch();
    const div = text("test", parent, 0);

    expect(div).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: {},
      status: BranchStatus.Pending,
      tag: BranchTag.Text,
      type: BranchTag.Text,
      parent,
      text: "test",
    });
  });
});
