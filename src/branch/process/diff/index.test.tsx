/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createFragmentTemplate, createJsxElement } from "../../create/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import root from "../new/root.js";
import { removeChildrenExcess } from "./index.js";
import { Branch, BranchKey, BranchStatus } from "../../types/index.js";
import { collectActions, commit } from "../common/index.js";

describe("diffBranches", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("removeChildrenExcess", () => {
    let App: Branch;

    beforeEach(() => {
      App = root(
        document.body,
        <div>
          <div />
          <button />
          <input />
        </div>
      );

      commit(collectActions(App));
    });

    it("should unmount children excess", () => {
      const current = App.children[0];

      const newKeys: Array<BranchKey> = [0, 1];

      removeChildrenExcess(current, newKeys);

      const unmountedChildren = current.children.filter((child) => !newKeys.includes(child.key));
      const mountedChildren = current.children.filter((child) => newKeys.includes(child.key));

      expect(unmountedChildren.every((c) => c.status === BranchStatus.Unmounting)).toBe(true);
      expect(mountedChildren.every((c) => c.status === BranchStatus.Unmounting)).toBe(false);
    });
  });
});
