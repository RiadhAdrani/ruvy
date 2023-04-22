import { areEqual } from "@riadh-adrani/utils";
import { ActionType, Branch, BranchKey } from "../../types/index.js";
import createAction from "../actions/index.js";

/**
 * create new text branch from data.
 * @param data text to be displayed, could be a string, number...
 * @param parent parent branch
 * @param key key
 */
const text = (
  current: Branch<string>,
  data: string,
  _parent: Branch,
  _key: BranchKey
): Array<unknown> => {
  // we check if text are different
  if (!areEqual(current.text, data)) {
    current.pendingActions.push(createAction(ActionType.UpdateText, current, data));
  }

  return [];
};

export default text;
