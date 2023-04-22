import { areEqual } from "@riadh-adrani/utils";
import { ActionType, Branch } from "../../types/index.js";
import createAction from "../actions/index.js";

/**
 * diff text branch with data.
 * @param data text to be displayed, could be a string, number...
 * @param parent parent branch
 * @param key key
 */
const text = (current: Branch<string>, data: string): Array<unknown> => {
  // we check if text are different
  if (!areEqual(current.text, data)) {
    current.pendingActions.push(createAction(ActionType.UpdateText, current, data));
  }

  return [];
};

export default text;
