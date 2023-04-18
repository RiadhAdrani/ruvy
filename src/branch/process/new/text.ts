import { Branch, BranchKey, BranchStatus, BranchTag } from "../../types/index.js";

/**
 * @deprecated
 * @param container
 * @param child
 * @returns
 */
const text = (data: string, parent: Branch, key: BranchKey): Branch => {
  const branch: Branch = {
    children: [],
    hooks: {},
    key,
    pendingActions: [],
    props: {},
    status: BranchStatus.Pending,
    tag: BranchTag.Text,
    type: BranchTag.Text,
    text: data,
    parent,
  };

  // TODO : render and append to parent

  return branch;
};

export default text;
