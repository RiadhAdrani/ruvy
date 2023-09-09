import {
  Branch,
  BranchStatus,
  BranchTag,
  BranchTemplateFunction,
  ComponentFunctionHandler,
} from '../../types.js';
import { useHooksContext } from '../../hooks/index.js';
import { collectPendingEffect, initBranch } from '../../utils/index.js';

export const handleCallableComponent: ComponentFunctionHandler<BranchTemplateFunction> = (
  template,
  current,
  parent,
  key
) => {
  const { props, type } = template;

  const branch: Branch =
    current ?? initBranch({ key, props, tag: BranchTag.Function, type, parent });

  const child = useHooksContext(() => type(props), branch);

  if (current) {
    branch.props = props;
  } else {
    branch.status = BranchStatus.Mounted;
  }

  collectPendingEffect(branch);

  return { branch, unprocessedChildren: [child] };
};

export default handleCallableComponent;
