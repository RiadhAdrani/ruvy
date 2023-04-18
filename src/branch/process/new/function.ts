import { Branch, BranchKey, BranchTag, BranchTemplateFunction } from "../../types/index.js";
import { useHooksContext } from "../../hooks/index.js";
import { collectPendingEffect } from "../common/index.js";
import process from "../index.js";
import { getTag } from "../../check/index.js";
import { initBranch } from "../../utils/index.js";

export default (template: BranchTemplateFunction, parent: Branch, key: BranchKey): Branch => {
  const { props, type } = template;

  const branch: Branch = initBranch({ key, props, tag: BranchTag.Function, type, parent });

  const child = useHooksContext(() => type(props), branch);

  branch.pendingActions.push(...collectPendingEffect(branch));

  if (getTag(child) !== BranchTag.Null) {
    branch.children = [process(child, undefined, branch, 0, 0)];
  }

  return branch;
};
