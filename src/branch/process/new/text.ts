import { ActionType, Branch, BranchKey, BranchStatus, BranchTag } from "../../types/index.js";
import createAction from "../actions/index.js";

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
    status: BranchStatus.Mounting,
    tag: BranchTag.Text,
    type: BranchTag.Text,
    text: data,
    parent,
    unmountedChildren: [],
  };

  branch.pendingActions.push(createAction(ActionType.Render, branch));

  return branch;
};

export default text;
