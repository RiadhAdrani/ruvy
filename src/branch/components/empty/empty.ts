import { BranchStatus, BranchTag, ComponentFunctionHandler } from '../../types.js';
import { initBranch } from '../../utils/index.js';

export const handleEmptyComponent: ComponentFunctionHandler<unknown, BranchTag.Null> = (
  _,
  current,
  parent,
  key
) => {
  const branch =
    current ??
    initBranch<BranchTag.Null>({
      key,
      status: BranchStatus.Mounted,
      tag: BranchTag.Null,
      type: BranchTag.Null,
      parent,
    });

  return { branch, unprocessedChildren: [] };
};

export default handleEmptyComponent;
