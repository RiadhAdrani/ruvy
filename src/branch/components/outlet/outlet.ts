import { Core } from '../../../core/index.js';
import {
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplateFunction,
  ComponentHandler,
} from '../../types.js';
import { getOutletDepth, initBranch } from '../../utils/index.js';
import { createNewBranchChildren } from '../components.js';

const create = (template: BranchTemplateFunction, parent: Branch, key: BranchKey): Branch => {
  const { props, type } = template;

  const branch: Branch = initBranch({ key, props, tag: BranchTag.Outlet, type, parent });

  const depth = getOutletDepth(branch) - 1;

  const child = Core.singleton.router?.getComponentByDepth(depth);

  branch.children = createNewBranchChildren([child], branch);

  return branch;
};

const diff = (_: unknown, current: Branch): Array<unknown> => {
  const depth = getOutletDepth(current) - 1;

  const child = Core.singleton.router?.getComponentByDepth(depth);

  return [child];
};

const outletComponentHandler: ComponentHandler<unknown, BranchTemplateFunction> = {
  create,
  diff,
};

export default outletComponentHandler;
