import { Branch, BranchKey, BranchTag, BranchTemplate } from "../../types/index.js";
import { initBranch } from "../../utils/index.js";
import { collectPendingEffect } from "../common/index.js";
import process from "../index.js";

/**
 * create a new branch element from a template.
 * @param template element template
 * @param parent parent branch
 * @param key element key
 */
const el = (template: BranchTemplate<string>, parent: Branch, key: BranchKey) => {
  const { props, type, children } = template;

  const branch: Branch = initBranch({ tag: BranchTag.Element, type, parent, key, props });

  // TODO : render element into parent
  branch.pendingActions.push(...collectPendingEffect(branch));

  branch.children = children.map((child, index) => process(child, undefined, branch, index, index));

  return branch;
};

export default el;
