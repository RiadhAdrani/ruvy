import { Branch, BranchKey, BranchTag, BranchTemplateFragment } from "../../types.js";
import { useHooksContext } from "../../hooks/index.js";
import { collectPendingEffect } from "../common/index.js";
import process from "../index.js";
import { initBranch } from "../../utils/index.js";
import { haveDuplicateKey } from "../../check/index.js";

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

  if (haveDuplicateKey(children)) {
    throw `Duplicate key detected within Component (${branch.type})`;
  }

  branch.children = fragmentChildren.map((ch, index) => process(ch, undefined, branch, index));

  return branch;
};

export default fragment;
