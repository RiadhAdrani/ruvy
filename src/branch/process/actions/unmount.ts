import { Callback } from "@riadh-adrani/utils";
import { Branch, BranchStatus } from "../../types/index.js";
import { isHostBranch } from "../../utils/index.js";
import { removeNode } from "@riadh-adrani/dom-utils";

/**
 * create an unmount action callback
 * @param branch target
 */
const createUnmountAction =
  (branch: Branch<string>): Callback =>
  () => {
    // check if branch tag is Text or Element
    if (!isHostBranch(branch)) {
      throw `Cannot unmount a non-host branch.`;
    }

    removeNode(branch.instance as Element);

    branch.status = BranchStatus.Unmounted;
  };

export default createUnmountAction;
