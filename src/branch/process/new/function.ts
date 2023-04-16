import {
  Branch,
  BranchKey,
  BranchStatus,
  BranchTag,
  BranchTemplateFunction,
} from "../../types/index.js";
import { useHooksContext } from "../../hooks/index.js";

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

  // TODO collect effects that should be executed

  // TODO process and add children
  // branch.children = [process(child, undefined, branch, 0)];

  return branch;
};
