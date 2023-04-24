/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createFragmentTemplate, createJsxElement } from "../../create/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import root from "../new/root.js";
import { diffNewChildren, removeChildrenExcess } from "./index.js";
import { Branch, BranchKey, BranchStatus } from "../../types/index.js";
import { collectActions, commit } from "../common/index.js";

describe("diffBranches", () => {
  let App: Branch;

  beforeEach(() => {
    document.body.innerHTML = "";

    App = root(
      document.body,
      <div>
        <div key={0} />
        <button key={1} />
        <input key={2} />
      </div>
    );

    commit(collectActions(App));
  });

  describe("removeChildrenExcess", () => {
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

  describe("diffNewChildren", () => {
    it("should push new children at the end if not existing", () => {
      const branch = App.children[0];

      expect(branch.children.length).toBe(3);

      diffNewChildren(branch, [
        <main key={3} />,
        <div key={0} />,
        <button key={1} />,
        <input key={2} />,
      ]);

      expect(branch.children.length).toBe(4);
      expect(branch.children[3].type).toBe("main");
    });

    it("should not push new children or reorder if order changes", () => {
      const branch = App.children[0];

      diffNewChildren(branch, [<input key={2} />, <div key={0} />, <button key={1} />]);

      expect(branch.children.length).toBe(3);
      expect(branch.children[0].type).toBe("div");
      expect(branch.children[1].type).toBe("button");
      expect(branch.children[2].type).toBe("input");
    });
  });
});
