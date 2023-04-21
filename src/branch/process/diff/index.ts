import { haveSameTagAndType } from "../../check/index.js";
import { Branch } from "../../types/index.js";
import { unmountBranch } from "../common/index.js";
import process from "../index.js";

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

    switch (tag) {
    }

    // diff children
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
