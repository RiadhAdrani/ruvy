import { initBranch } from '../../utils/index.js';
import { Branch, BranchTag, ComponentFunctionHandler } from '../../types.js';
import { areEqual, isUndefined } from '@riadh-adrani/utils';

export const handleContextComponent: ComponentFunctionHandler = (
  template,
  current,
  parent,
  key
) => {
  const { props, children } = template;

  const branch: Branch =
    current ??
    initBranch({
      type: BranchTag.Context,
      tag: BranchTag.Context,
      props,
      key,
      parent,
    });

  if (isUndefined(props.object)) {
    throw '[Ruvy] cannot create a context provider without a context object.';
  }

  if (current) {
    const newObject = props.object;
    const newValue = props.value;

    if (!areEqual(newObject, branch.props.object)) {
      // TODO : transform into Action
      branch.props.object = newObject;
    }

    if (!areEqual(newValue, branch.props.value)) {
      // TODO : transform into Action
      branch.props.value = newValue;
    }

    branch.props = props;
  }

  return {
    branch,
    unprocessedChildren: children,
  };
};

export default handleContextComponent;
