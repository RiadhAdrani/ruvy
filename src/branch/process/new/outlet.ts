import { Core } from '../../../core/index.js';
import { Branch, BranchKey, BranchTag, BranchTemplateFunction } from '../../types.js';
import { getOutletDepth, initBranch } from '../../utils/index.js';
import { createNewBranchChildren } from '../index.js';

const outlet = (template: BranchTemplateFunction, parent: Branch, key: BranchKey): Branch => {
  const { props, type } = template;

  const branch: Branch = initBranch({ key, props, tag: BranchTag.Outlet, type, parent });

  const depth = getOutletDepth(branch) - 1;

  const child = Core.singleton.router?.getComponentByDepth(depth);

  branch.children = createNewBranchChildren([child], branch);

  return branch;
};

export default outlet;
