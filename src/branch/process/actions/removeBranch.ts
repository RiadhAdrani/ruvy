import { Callback } from "@riadh-adrani/utils";
import { Branch } from "../../types/index.js";

/**
 * removes a branch from parent
 * @param branch target
 */
const createRemoveBranchAction = (branch: Branch): Callback => {
  return () => {
    const parent = branch.parent;

    if (!parent) {
      return;
    }

    parent.children = parent.children.filter((child) => child !== branch);
  };
};

export default createRemoveBranchAction;
