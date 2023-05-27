/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createJsxElement, createFragmentTemplate } from "../../create/index.js";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import root from "../new/root.js";
import { actionsSorter, collectActions, commit, unmountBranch } from "./index.js";
import { useState } from "../../hooks/index.js";
import { ActionPriority, ActionType, Branch, BranchStatus, BranchTag } from "../../types/index.js";
import { initBranch } from "../../utils/index.js";
import createAction from "../actions/index.js";
import { shuffle } from "@riadh-adrani/utils";

describe("common", () => {
  it("should be an object of {action type : number}", () => {
    expect(ActionPriority).toStrictEqual({
      [ActionType.Unmount]: 0,
      [ActionType.Render]: 1,
      [ActionType.Unmounted]: 2,
      [ActionType.RemoveBranch]: 3,
      [ActionType.Reorder]: 4,
      [ActionType.UpdateProps]: 5,
      [ActionType.UpdateText]: 6,
      [ActionType.Cleanup]: 7,
      [ActionType.Effect]: 8,
    });
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const expectPendingActionsToBeEmpty = (branch: Branch) => {
    expect(branch.pendingActions).toStrictEqual([]);

    branch.children.forEach(expectPendingActionsToBeEmpty);
  };

  describe("unmountBranch", () => {
    let branch: Branch;

    beforeEach(() => {
      branch = initBranch();
    });

    it("should change status to unmounting", () => {
      unmountBranch(branch);

      expect(branch.status).toBe(BranchStatus.Unmounting);
    });

    it.each([[BranchTag.Element], [BranchTag.Text]])(
      "should add an Unmount action to pendingActions if (%s)",
      tag => {
        branch = initBranch({ tag });

        unmountBranch(branch);

        expect(branch.pendingActions.some(a => a.type === ActionType.Unmount)).toBe(true);
      }
    );

    it.each([[BranchTag.Fragment], [BranchTag.Function], [BranchTag.Null]])(
      "should not add an Unmount action to pendingActions if (%s)",
      tag => {
        branch = initBranch({ tag });

        unmountBranch(branch);

        expect(branch.pendingActions.some(a => a.type === ActionType.Unmount)).toBe(false);
      }
    );

    it("should unmount children recursively", () => {
      branch = initBranch();

      branch.children.push(...[initBranch(), initBranch()]);

      unmountBranch(branch);

      const checkRecursively = (target: Branch) => {
        expect(target.pendingActions.some(a => a.type === ActionType.Unmount));

        target.children.forEach(checkRecursively);
      };
    });
  });

  describe("commit", () => {
    it("should render tree into the dom", () => {
      const App = () => {
        return (
          <div>
            <button>Click me</button>
          </div>
        );
      };

      const branch = root(document.body, <App />);

      const actions = collectActions(branch);

      commit(actions);

      expectPendingActionsToBeEmpty(branch);

      expect(document.body.innerHTML).toBe("<div><button>Click me</button></div>");
    });

    it("should render tree into the dom (nested Functional component)", () => {
      const Button = ({ init = 0 }) => {
        const [count] = useState(init);

        return <button>{count}</button>;
      };

      const App = () => {
        return (
          <div>
            <Button init={0} />
            <Button init={1} />
            <Button init={2} />
          </div>
        );
      };

      const branch = root(document.body, <App />);

      const actions = collectActions(branch);

      commit(actions);

      expect(document.body.innerHTML).toBe(
        "<div><button>0</button><button>1</button><button>2</button></div>"
      );
    });

    it("should render tree into the dom (fragment)", () => {
      const Button = ({ init = 0 }) => {
        const [count] = useState(init);

        return <button>{count}</button>;
      };

      const App = () => {
        return (
          <div>
            <>
              <Button init={0} />
              <Button init={1} />
              <Button init={2} />
            </>
          </div>
        );
      };

      const branch = root(document.body, <App />);

      const actions = collectActions(branch);

      commit(actions);

      expect(document.body.innerHTML).toBe(
        "<div><button>0</button><button>1</button><button>2</button></div>"
      );
    });

    it("should render tree into the dom with props and events", () => {
      const onClick = vitest.fn();

      const App = () => {
        return (
          <div>
            <button {...{ onClick }} id={"btn"}>
              Click me
            </button>
          </div>
        );
      };

      const branch = root(document.body, <App />);

      const actions = collectActions(branch);

      commit(actions);

      const btn = document.getElementById("btn");
      btn?.click();

      expect(document.body.innerHTML).toBe('<div><button id="btn">Click me</button></div>');
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("collectActions", () => {
    const root = initBranch();
    const parent = initBranch();
    const child = initBranch();

    root.children = [parent];
    parent.children = [child];

    root.pendingActions.push(createAction(ActionType.Effect, root));
    parent.pendingActions.push(createAction(ActionType.Cleanup, parent));
    child.pendingActions.push(createAction(ActionType.UpdateProps, child));

    it("should collect all actions recursively", () => {
      const collection = collectActions(root);

      expect(collection.map(c => c.type)).toStrictEqual([
        ActionType.Effect,
        ActionType.Cleanup,
        ActionType.UpdateProps,
      ]);
    });
  });

  describe("ActionSorter", () => {
    const root = initBranch();
    const parent = initBranch();
    const child = initBranch();

    root.children = [parent];
    parent.children = [child];

    root.pendingActions.push(createAction(ActionType.Effect, root));
    root.pendingActions.push(createAction(ActionType.RemoveBranch, root));

    parent.pendingActions.push(createAction(ActionType.Cleanup, parent));
    parent.pendingActions.push(createAction(ActionType.Render, parent));
    parent.pendingActions.push(createAction(ActionType.Unmount, parent));

    child.pendingActions.push(createAction(ActionType.UpdateProps, child));
    child.pendingActions.push(createAction(ActionType.UpdateText, child));
    child.pendingActions.push(createAction(ActionType.Reorder, child));

    it("should order action correclty", () => {
      const actions = shuffle(collectActions(root));

      const sorted = actions.sort(actionsSorter);

      expect(sorted.map(s => s.type)).toStrictEqual([
        ActionType.Unmount,
        ActionType.Render,
        ActionType.RemoveBranch,
        ActionType.Reorder,
        ActionType.UpdateProps,
        ActionType.UpdateText,
        ActionType.Cleanup,
        ActionType.Effect,
      ]);
    });
  });
});
