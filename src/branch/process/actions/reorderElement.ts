import { Callback } from "@riadh-adrani/utils";
import { Branch } from "../../types/index.js";
import { getHostBranchIndexFromHostParent } from "../../utils/index.js";
import { changeChildPosition } from "@riadh-adrani/dom-utils";

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
