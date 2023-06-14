import { Callback } from '@riadh-adrani/utils';
import { Branch } from '../../../branch/types.js';
import { PortalBranchType } from '../new/portal.js';
import { getClosestChildrenHostBranches } from '../../../branch/utils/index.js';

const createMovePortalChildren = (branch: Branch<PortalBranchType>): Callback => {
  return () => {
    const container = branch.instance as Element;

    // get all direct children branches
    const children = branch.children.map(child => getClosestChildrenHostBranches(child)).flat();

    children.forEach(it => container.appendChild(it.instance as Node));
  };
};

export default createMovePortalChildren;
