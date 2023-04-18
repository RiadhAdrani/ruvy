/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import { initBranch } from "../../utils/index.js";
import { Branch, BranchStatus, BranchTag } from "../../types/index.js";
import empty from "./empty.js";

describe("new.empty", () => {
  it("should create a new empty branch", () => {
    const parent = initBranch();
    const div = empty(parent, 0);

    expect(div).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: {},
      status: BranchStatus.Mounted,
      tag: BranchTag.Null,
      type: BranchTag.Null,
      parent,
    });
  });
});
