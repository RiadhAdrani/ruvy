import { Branch, BranchKey } from "../../types/index.js";

/**
 * @deprecated
 * @param template
 * @param current
 * @param parent
 * @param key
 * @param index
 * @returns
 */
const diffBranches = (
  template: unknown,
  current: Branch,
  parent: Branch,
  key: BranchKey,
  index: number
): Branch => {
  return undefined as unknown as Branch;
};

export default diffBranches;
