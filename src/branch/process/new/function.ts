import {
  Branch,
  BranchKey,
  BranchStatus,
  BranchTag,
  BranchTemplateFunction,
} from "../../types/index.js";
import { useHooksContext } from "../../hooks/index.js";
import { collectPendingEffect } from "../common/index.js";
import process from "../index.js";
import { getTag } from "../../check/index.js";

export default (template: BranchTemplateFunction, parent: Branch, key: BranchKey): Branch => {
  const { props, type } = template;

  const branch: Branch = {
    children: [],
    hooks: {},
    key,
    pendingActions: [],
    props,
    status: BranchStatus.Pending,
    tag: BranchTag.Function,
    type,
    instance: undefined,
    parent,
  };

  const child = useHooksContext(() => type(props), branch);

  branch.pendingActions.push(...collectPendingEffect(branch));

  if (getTag(child) !== BranchTag.Null) {
    branch.children = [process(child, undefined, branch, 0)];
  }

  return branch;
};
