/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import { Branch, BranchStatus, BranchTag } from "../../types/index.js";
import root from "./root.js";

describe("new.root", () => {
  it("should create a new empty branch", () => {
    const rt = root(document.body, null);

    expect(rt).toStrictEqual<Branch>({
      children: [
        {
          children: [],
          hooks: {},
          key: 0,
          pendingActions: [],
          props: {},
          status: BranchStatus.Mounted,
          tag: BranchTag.Null,
          type: BranchTag.Null,
          parent: rt,
        },
      ],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: {},
      status: BranchStatus.Mounted,
      tag: BranchTag.Root,
      type: BranchTag.Root,
      instance: document.body,
    });
  });
});
