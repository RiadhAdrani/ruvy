import { cast, isUndefined } from "@riadh-adrani/utils";
import { getTag, haveSameTagAndType, isValidTemplate } from "../check/index.js";
import { Branch, BranchStatus, BranchTag, BranchTemplate } from "../types/index.js";
import createNewBranch from "./createNewBranch.js";

/**
 * @deprecated
 * @param template
 * @param current
 * @param parent
 * @param key
 * @returns
 */
export default (
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  key: string | number
): Branch => {
  // ? if branch is undefined, a new branch will be added to the parent
  if (isUndefined(current)) {
    return createNewBranch();
  }

  return undefined as unknown as Branch;
};
