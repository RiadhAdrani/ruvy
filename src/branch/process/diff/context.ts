import { areEqual } from '@riadh-adrani/utils';
import { Branch, BranchTemplate } from '../../types.js';

/**
 * perform diffing of a context template and branch.
 * @param current
 * @param template
 */
const context = (current: Branch, template: BranchTemplate): Array<unknown> => {
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

export default context;
