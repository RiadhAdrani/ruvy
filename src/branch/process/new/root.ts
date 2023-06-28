import { Branch, BranchStatus, BranchTag } from '../../types.js';
import { createNewBranchChildren } from '../index.js';

/**
 * create the root branch.
 * @param container html container.
 * @param child child template
 */
const root = (container: HTMLElement, child: unknown): Branch => {
  const branch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Root,
    type: BranchTag.Root,
    instance: container,
    unmountedChildren: [],
  };

  branch.children = createNewBranchChildren([child], branch);

  return branch;
};

export default root;
