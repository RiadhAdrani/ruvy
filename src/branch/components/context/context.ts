import { initBranch } from '../../utils/index.js';
import { Branch, BranchKey, BranchTag, BranchTemplate, ComponentHandler } from '../../types.js';
import { createNewBranchChildren } from '../../index.js';
import { areEqual } from '@riadh-adrani/utils';

/**
 * create a new context branch
 * @param template branch template
 * @param parent parent branch
 * @param key branch key
 */
const create = (template: BranchTemplate, parent: Branch, key: BranchKey): Branch => {
  const { props, children } = template;

  const branch: Branch = initBranch({
    props,
    type: BranchTag.Context,
    tag: BranchTag.Context,
    key,
    parent,
  });

  branch.children = createNewBranchChildren(children, branch);

  return branch;
};

/**
 * perform diffing of a context template and branch.
 * @param current
 * @param template
 */
const diff = (template: BranchTemplate, current: Branch): Array<unknown> => {
  const { props, children } = template;

  const newObject = props.object;
  const newValue = props.value;

  if (!areEqual(newObject, current.props.object)) {
    // TODO : transform into Action
    current.props.object = newObject;
  }

  if (!areEqual(newValue, current.props.value)) {
    // TODO : transform into Action
    current.props.value = newValue;
  }

  return children;
};

const contextComponentHandler: ComponentHandler = {
  create,
  diff,
};

export default contextComponentHandler;
