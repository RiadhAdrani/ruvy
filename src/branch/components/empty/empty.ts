import {
  Branch,
  BranchKey,
  BranchStatus,
  BranchTag,
  ComponentFunctionHandler,
  ComponentHandler,
} from '../../types.js';
import { initBranch } from '../../utils/index.js';

/**
 * create a nullish branch.
 * @param parent parent branch
 * @param key key
 */
const create = (_: null, parent: Branch, key: BranchKey): Branch => {
  const branch: Branch = initBranch({
    key,
    status: BranchStatus.Mounted,
    tag: BranchTag.Null,
    type: BranchTag.Null,
    parent,
  });

  return branch;
};

const emptyComponentHandler: ComponentHandler<unknown, null> = {
  create,
  diff: () => [],
};

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

export default emptyComponentHandler;
