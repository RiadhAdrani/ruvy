import { haveSameTagAndType } from "../../check/index.js";
import {
  ActionType,
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateFragment,
  BranchTemplateFunction,
} from "../../types/index.js";
import { getClosestHostBranches, getCorrectKey, getBranchWithKey } from "../../utils/index.js";
import createAction from "../actions/index.js";
import { unmountBranch } from "../common/index.js";
import createNewBranch from "../new/index.js";
import element from "./element.js";
import fragment from "./fragment.js";
import fn from "./function.js";
import text from "./text.js";

/**
 * Move to UTILS
 * @param array
 * @param fromIndex
 * @param toIndex
 * @returns
 */
function moveElement<T>(array: Array<T>, fromIndex: number, toIndex: number) {
  const arrayCopy = [...array];
  const element = arrayCopy.splice(fromIndex, 1)[0];

  arrayCopy.splice(toIndex, 0, element);

  return arrayCopy;
}

/**
 * unmount children's excess.
 * @param current parent branch
 * @param newChildrenKeys new children keys
 */
export const removeChildrenExcess = (current: Branch, newChildrenKeys: Array<BranchKey>): void => {
  current.unmountedChildren = current.children.filter(
    (child) => !newChildrenKeys.includes(child.key)
  );

  current.unmountedChildren.forEach(unmountBranch);

  current.children = current.children.filter((child) => newChildrenKeys.includes(child.key));
};

/**
 * Perform diffing of the new children with the old ones.
 * @param current parent branch
 * @param children children templates
 */
export const diffNewChildren = (current: Branch, children: Array<unknown>) => {
  const oldKeys = current.children.map((child) => child.key);

  children.forEach((child, index) => {
    const key = getCorrectKey(child, index);

    const exists = oldKeys.includes(key);

    if (exists) {
      diffBranches(child, getBranchWithKey(current, key)!, current, index);
    } else {
      current.children.push(createNewBranch(child, current, key));
    }
  });
};

export const arrangeChildren = (current: Branch, children: Array<unknown>) => {
  const newChildrenKeys = children.map((child, index) => getCorrectKey(child, index));

  // rearrange current.children
  newChildrenKeys.forEach((key, newIndex) => {
    const oldIndex = current.children.findIndex((child) => child.key === key);

    if (oldIndex !== newIndex) {
      // we need to change the index locally

      const branch = current.children[oldIndex];

      if (!branch) {
        throw `Branch with key (${key}) not found to be rearranged.`;
      }

      current.children = moveElement(current.children, oldIndex, newIndex);

      // we need to get Host element(s) and rearrange them
      const hosts = getClosestHostBranches(branch);

      hosts.forEach((host) => {
        current.pendingActions.push(createAction(ActionType.Reorder, host));
      });
    }
  });
};

/**
 * diff a branch an a template
 * @param template new template
 * @param current current branch
 * @param parent parent
 * @param index index in parent
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
        children = element(current as Branch<string>, template as BranchTemplate<string>);
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

    const newChildrenKeys = children.map((child, index) => getCorrectKey(child, index));

    removeChildrenExcess(current, newChildrenKeys);

    diffNewChildren(current, children);

    arrangeChildren(current, children);
  } else {
    // we move current to old,
    const old = current;

    // collect unmount effects,
    unmountBranch(old);

    // compute the new one and merge it
    const newBranch = createNewBranch(template, parent, index);
    newBranch.old = old;

    // replace current with newly computed one.
    // bruh : current = newBranch;

    const parentChildren = current.parent!.children;
    const i = parentChildren.findIndex((child) => child === old);

    parentChildren[i] = newBranch;

    current.parent!.children[i] = newBranch;
  }

  return current;
};

export default diffBranches;
