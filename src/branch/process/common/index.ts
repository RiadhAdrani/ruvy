import { collectEffects, unmountEffects } from "../../hooks/index.js";
import { ActionPriority, ActionType, Branch, BranchAction } from "../../types/index.js";
import { isHostBranch } from "../../utils/index.js";
import createAction from "../actions/index.js";

export const collectPendingEffect = (branch: Branch): Array<BranchAction> => {
  const out: Array<BranchAction> = [];

  out.push(...collectEffects(branch));

  return out;
};

/**
 * collect branch pending actions for the unmount.
 * @param branch target
 */
export const unmountBranch = (branch: Branch): void => {
  // branch effect hooks
  unmountEffects(branch);

  // check if branch is element or text
  if (isHostBranch(branch)) {
    branch.pendingActions.push(createAction(ActionType.Unmount, branch));
  }

  branch.pendingActions.push(...collectPendingEffect(branch));

  // apply recursively
  branch.children.forEach(unmountBranch);
};

export const actionsSorter = (a1: BranchAction, a2: BranchAction): number => {
  if (ActionPriority[a1.type] === ActionPriority[a2.type]) {
    return a1.requestTime - a2.requestTime;
  }

  return ActionPriority[a1.type] - ActionPriority[a2.type];
};

export const collectActions = (branch: Branch): Array<BranchAction> => {
  const actions: Array<BranchAction> = [];

  if (branch.old) {
    actions.push(...collectActions(branch.old));
  }

  actions.push(...branch.pendingActions);

  branch.children.forEach((child) => {
    actions.push(...collectActions(child));
  });

  return actions;
};

/**
 * commit changes.
 * @param root tree root
 */
export const commit = (actions: Array<BranchAction>) => {
  const sorted = actions.sort(actionsSorter);

  sorted.forEach((a) => a.callback());
};
