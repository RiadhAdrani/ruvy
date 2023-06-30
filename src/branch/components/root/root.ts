import { Branch, BranchStatus, BranchTag } from '../../types.js';
import { createNewBranchChildren } from '../../process/index.js';
import { initBranch } from '../../utils/index.js';

/**
 * create the root branch.
 * @param container html container.
 * @param child child template
 */
const createRoot = (container: HTMLElement, child: unknown): Branch => {
  const branch: Branch = initBranch({
    tag: BranchTag.Root,
    type: BranchTag.Root,
    instance: container,
    status: BranchStatus.Mounted,
  });

  branch.children = createNewBranchChildren([child], branch);

  return branch;
};

export default createRoot;
