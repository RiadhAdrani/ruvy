import { collectEffects } from "../../hooks/index.js";
import { Branch, BranchAction } from "../../types/index.js";

export const collectPendingEffect = (branch: Branch): Array<BranchAction> => {
  const out: Array<BranchAction> = [];

  out.push(...collectEffects(branch));

  return out;
};

/**
 * commit changes.
 * @param root tree root
 */
export const commit = (root: Branch) => {
  // TODO : sort && render actions should be executed before hooks' effects

  root.pendingActions.forEach((action) => {
    action.callback();
  });

  root.children.forEach((child) => commit(child));
};
