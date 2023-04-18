import { merge } from "@riadh-adrani/utils";
import { Branch, BranchStatus, BranchTag } from "../types/index.js";

export const initBranch = (data?: Partial<Branch>): Branch => {
  const initial: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Pending,
    tag: BranchTag.Null,
    type: BranchTag.Null,
  };

  return merge(initial, data ?? {});
};
