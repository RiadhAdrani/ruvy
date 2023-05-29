import { Callback } from "@riadh-adrani/utils";
import { Branch } from "../../types.js";

/**
 * removes a branch from parent
 * @param branch target
 */
const createRemoveBranchAction = (branch: Branch): Callback => {
  return () => {
    const parent = branch.parent;

    if (!parent) {
      throw "Unable to remove branch: Branch has no parent.";
    }

    parent.children = parent.children.filter(child => child.key !== branch.key);
  };
};

export default createRemoveBranchAction;
