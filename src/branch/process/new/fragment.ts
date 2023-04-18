import { Branch, BranchKey, BranchTag, BranchTemplateFragment } from "../../types/index.js";
import { useHooksContext } from "../../hooks/index.js";
import { collectPendingEffect } from "../common/index.js";
import process from "../index.js";
import { initBranch } from "../../utils/index.js";

/**
 * create a new fragment branch from a template.
 * @param template fragment template
 * @param parent parent branch
 * @param key key
 */
const fragment = (template: BranchTemplateFragment, parent: Branch, key: BranchKey): Branch => {
  const { type, children, props } = template;

  const branch: Branch = initBranch({ key, props, type, parent, tag: BranchTag.Fragment });

  const fragmentChildren = useHooksContext(() => type(children), branch);

  branch.pendingActions.push(...collectPendingEffect(branch));

  branch.children = fragmentChildren.map((ch) => process(ch, undefined, branch, 0, 0));

  return branch;
};

export default fragment;
