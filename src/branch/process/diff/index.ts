import { haveSameTagAndType } from "../../check/index.js";
import {
  ActionType,
  Branch,
  BranchTag,
  BranchTemplate,
  BranchTemplateFragment,
  BranchTemplateFunction,
} from "../../types/index.js";
import {
  getClosestHostBranches,
  getCorrectKey,
  getCurrentBranchWithKey,
} from "../../utils/index.js";
import createAction from "../actions/index.js";
import { unmountBranch } from "../common/index.js";
import process from "../index.js";
import el from "./element.js";
import fragment from "./fragment.js";
import fn from "./function.js";
import text from "./text.js";

/**
 * @deprecated
 * @param template
 * @param current
 * @param parent
 * @param key
 * @param index
 * @returns
 */
const diffBranches = (
  template: unknown,
  current: Branch,
  parent: Branch,
  index: number
): Branch => {
  current.old = undefined;

  if (haveSameTagAndType(current, template)) {
    // we perform diffing
    const tag = current.tag;

    let children: Array<unknown> = [];

    switch (tag) {
      case BranchTag.Element: {
        children = el(current as Branch<string>, template as BranchTemplate<string>);
        break;
      }
      case BranchTag.Text: {
        children = text(current as Branch<string>, `${template}`);
        break;
      }
      case BranchTag.Fragment: {
        children = fragment(template as BranchTemplateFragment);
        break;
      }
      case BranchTag.Function: {
        children = fn(current, template as BranchTemplateFunction);
        break;
      }
      default:
        break;
    }

    const oldChildrenKeys = current.children.map((child) => child.key);
    const newChildrenKey = children.map((child, index) => getCorrectKey(child, index));

    children.forEach((child, index) => {
      const key = getCorrectKey(child, index);

      const maybeBranch = getCurrentBranchWithKey(current, key);

      const branchChild = process(child, maybeBranch, current, index);

      if (!maybeBranch) {
        current.children.push(branchChild);
      }
    });

    // remove excess children
    oldChildrenKeys.forEach((key) => {
      if (!newChildrenKey.includes(key)) {
        const maybeBranch = getCurrentBranchWithKey(current, key);

        if (maybeBranch) {
          unmountBranch(maybeBranch);

          current.pendingActions.push(createAction(ActionType.RemoveBranch, maybeBranch));
        }
      }
    });

    // rearrange current.children
    newChildrenKey.forEach((key, newIndex) => {
      const oldIndex = current.children.findIndex((child) => child.key === key);

      if (oldIndex !== newIndex) {
        // we need to change the index locally

        const branch = getCurrentBranchWithKey(current, key);

        if (!branch) {
          throw "Branch not found to be rearranged.";
        }

        const newChildren = [
          ...current.children.slice(0, oldIndex),
          ...current.children.slice(oldIndex + 1),
        ];

        const newWithBranch = [
          ...newChildren.slice(0, newIndex),
          branch,
          ...newChildren.slice(newIndex + 1),
        ];

        current.children = newWithBranch;

        // we need to get Host element(s) and rearrange them
        const hosts = getClosestHostBranches(branch);

        hosts.forEach((host) => {
          current.pendingActions.push(createAction(ActionType.Reorder, host));
        });
      }
    });
  } else {
    // we move current to old,
    const old = current;

    // collect unmount effects,
    unmountBranch(old);

    // compute the new one and merge it
    const newBranch = process(template, undefined, parent, index);

    newBranch.old = old;

    // replace current with newly computed one.
    current = newBranch;
  }

  return current;
};

export default diffBranches;
