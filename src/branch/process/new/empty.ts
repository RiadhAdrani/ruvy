import { Branch, BranchKey, BranchStatus, BranchTag } from "../../types/index.js";
import { initBranch } from "../../utils/index.js";

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
