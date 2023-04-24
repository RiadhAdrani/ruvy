/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createJsxElement, createFragmentTemplate } from "../../create/index.js";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import root from "../new/root.js";
import { collectActions, commit, unmountBranch } from "./index.js";
import { setState } from "../../hooks/index.js";
import { ActionType, Branch, BranchStatus, BranchTag } from "../../types/index.js";
import { initBranch } from "../../utils/index.js";

describe("common", () => {
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
      (tag) => {
        branch = initBranch({ tag });

        unmountBranch(branch);

        expect(branch.pendingActions.some((a) => a.type === ActionType.Unmount)).toBe(true);
      }
    );

    it.each([[BranchTag.Fragment], [BranchTag.Function], [BranchTag.Null]])(
      "should not add an Unmount action to pendingActions if (%s)",
      (tag) => {
        branch = initBranch({ tag });

        unmountBranch(branch);

        expect(branch.pendingActions.some((a) => a.type === ActionType.Unmount)).toBe(false);
      }
    );

    it("should unmount children recursively", () => {
      branch = initBranch();

      branch.children.push(...[initBranch(), initBranch()]);

      unmountBranch(branch);

      const checkRecursively = (target: Branch) => {
        expect(target.pendingActions.some((a) => a.type === ActionType.Unmount));

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
        const [count] = setState(init);

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
        const [count] = setState(init);

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
});
