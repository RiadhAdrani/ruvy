import { haveSameTagAndType } from "../../check/index.js";
import { Branch, BranchTag, BranchTemplate } from "../../types/index.js";
import { unmountBranch } from "../common/index.js";
import process from "../index.js";
import el from "./element.js";

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
        // TODO
        break;
      }
      case BranchTag.Fragment: {
        // TODO
        break;
      }
      case BranchTag.Function: {
        // TODO
        break;
      }
      default:
        break;
    }

    // TODO : diff children, keys position etc...
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
