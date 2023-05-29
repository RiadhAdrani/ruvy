import { Callback } from "@riadh-adrani/utils";
import { Branch } from "../../types.js";
import { getHostBranchIndexFromHostParent } from "../../utils/index.js";
import { changeChildPosition } from "@riadh-adrani/dom-utils";

/**
 * create an action to automatically reorder a branch
 * @param branch target
 */
const createReorderHostElement = (branch: Branch): Callback => {
  return () => {
    const { instance } = branch;

    if (!instance) {
      return;
    }

    const { index } = getHostBranchIndexFromHostParent(branch);

    changeChildPosition(instance as Element, index);
  };
};

export default createReorderHostElement;
