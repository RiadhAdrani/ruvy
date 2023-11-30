import { initBranch } from '../../utils/index.js';
import { Branch, BranchStatus, BranchTag, ComponentFunctionHandler } from '../../types.js';
import { isUndefined } from '@riadh-adrani/obj-utils';

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
    branch.props = props;
  } else {
    branch.status = BranchStatus.Mounted;
  }

  return {
    branch,
    unprocessedChildren: children,
  };
};

export default handleContextComponent;
