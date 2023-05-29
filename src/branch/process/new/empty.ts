import { Branch, BranchKey, BranchStatus, BranchTag } from "../../types.js";
import { initBranch } from "../../utils/index.js";

/**
 * create a nullish branch.
 * @param parent parent branch
 * @param key key
 */
const empty = (parent: Branch, key: BranchKey): Branch => {
  const branch: Branch = initBranch({
    key,
    status: BranchStatus.Mounted,
    tag: BranchTag.Null,
    type: BranchTag.Null,
    parent,
  });

  return branch;
};

export default empty;
