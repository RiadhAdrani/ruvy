import { collectEffects } from "../../hooks/index.js";
import { Branch, BranchAction, BranchStatus } from "../../types/index.js";

export const collectPendingEffect = (branch: Branch): Array<BranchAction> => {
  const out: Array<BranchAction> = [];

  if (branch.status === BranchStatus.Pending) {
    // TODO : render or whatever
  }

  out.push(...collectEffects(branch));

  return out;
};
