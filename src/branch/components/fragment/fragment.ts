import {
  Branch,
  FragmentType,
  BranchTag,
  BranchTemplateFragment,
  ComponentFunctionHandler,
  BranchStatus,
} from '../../types.js';
import { initBranch } from '../../utils/index.js';

export const handleFragmentComponent: ComponentFunctionHandler<
  BranchTemplateFragment,
  FragmentType
> = (template, current, parent, key) => {
  const { type, children, props } = template;

  const branch: Branch<FragmentType> =
    current ??
    initBranch({ key, props, type, parent, tag: BranchTag.Fragment, status: BranchStatus.Mounted });

  return { unprocessedChildren: children, branch };
};

export default handleFragmentComponent;
