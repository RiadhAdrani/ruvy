import { Core } from '../../../core/index.js';
import {
  Branch,
  BranchStatus,
  BranchTag,
  BranchTemplateFunction,
  ComponentFunctionHandler,
} from '../../types.js';
import { getOutletDepth, initBranch } from '../../utils/index.js';

export const handleOutletComponent: ComponentFunctionHandler<BranchTemplateFunction> = (
  template,
  current,
  parent,
  key
) => {
  const { props, type } = template;

  const branch: Branch = current ?? initBranch({ key, props, tag: BranchTag.Outlet, type, parent });

  const depth = getOutletDepth(branch) - 1;
  const child = Core.singleton.router?.getComponentByDepth(depth);

  if (current) {
    branch.props = props;
  } else {
    branch.status = BranchStatus.Mounted;
  }

  return {
    unprocessedChildren: [child],
    branch,
  };
};

export default handleOutletComponent;
