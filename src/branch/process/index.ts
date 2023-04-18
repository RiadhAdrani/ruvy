import { isUndefined } from "@riadh-adrani/utils";
import { Branch, BranchKey } from "../types/index.js";
import createNewBranch from "./new/index.js";
import diffBranches from "./diff/index.js";

/**
 * @deprecated
 * @param template
 * @param current
 * @param parent
 * @param key
 * @returns
 */
const process = (
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  key: BranchKey,
  index: number
): Branch => {
  return isUndefined(current)
    ? createNewBranch(template, parent, key)
    : diffBranches(template, current!, parent, key, index);
};

export default process;
