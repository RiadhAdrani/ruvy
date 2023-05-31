import { initBranch } from "../../utils/index.js";
import { Branch, BranchKey, BranchTag, BranchTemplate } from "../../types.js";
import process from "../index.js";

/**
 * create a new context branch
 * @param template branch template
 * @param parent parent branch
 * @param key branch key
 */
const context = (template: BranchTemplate, parent: Branch, key: BranchKey): Branch => {
  const { props, children } = template;

  const branch: Branch = initBranch({
    props,
    type: BranchTag.Context,
    tag: BranchTag.Context,
    key,
    parent,
  });

  branch.children = children.map((child, index) => process(child, undefined, branch, index));

  return branch;
};

export default context;
