import { isUndefined } from "@riadh-adrani/utils";
import { Branch } from "../types/index.js";
import createNewBranch from "./new/index.js";
import diffBranches from "./diff/index.js";
import { getCorrectKey } from "../utils/index.js";

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
  index: number
): Branch => {
  const $key = getCorrectKey(template, index);

  return isUndefined(current)
    ? createNewBranch(template, parent, $key)
    : diffBranches(template, current!, parent, index);
};

export default process;
