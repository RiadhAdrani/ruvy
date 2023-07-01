import { Branch, BranchStatus, BranchTag } from '../../types.js';
import { handleComponent } from '../components.js';
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

  branch.children = [handleComponent(child, undefined, branch, 0)];

  return branch;
};

export default createRoot;
