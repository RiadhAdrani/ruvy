/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createJsxElement, createFragmentTemplate } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import { initBranch } from "../../utils/index.js";
import { Branch, BranchStatus, BranchTag, BranchTemplateFragment } from "../../types/index.js";
import fragment from "./fragment.js";

describe("new.fragment", () => {
  it("should create a new empty branch", () => {
    const parent = initBranch();
    const jsx = (<></>) as BranchTemplateFragment;

    const branch = fragment(jsx, parent, 0);

    expect(branch).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Fragment,
      type: createFragmentTemplate,
      parent,
    });
  });
});
