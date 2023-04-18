import { Branch, BranchKey, BranchStatus, BranchTag } from "../../types/index.js";

/**
 * create new text branch from data.
 * @param data text to be displayed, could be a string, number...
 * @param parent parent branch
 * @param key key
 */
const text = (data: string, parent: Branch, key: BranchKey): Branch<string> => {
  const branch: Branch<string> = {
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
