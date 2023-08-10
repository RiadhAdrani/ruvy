import { PropsWithUtility } from '../../../index.js';
import {
  ActionType,
  BranchStatus,
  BranchTag,
  BranchTemplate,
  ComponentFunctionHandler,
} from '../../../branch/types.js';
import { initBranch } from '../../../branch/utils/index.js';
import createAction from '../../actions/actions.js';

export type PortalProps = PropsWithUtility<{ container: Element }>;

export const Portal = (props: PortalProps) => props as unknown as JSX.Element;

export type PortalBranchType = typeof Portal;

export const handlePortalComponent: ComponentFunctionHandler<
  BranchTemplate<PortalBranchType>,
  PortalBranchType
> = (template, current, parent, key) => {
  const { type, props } = template;
  const { children, container } = props as unknown as PortalProps;

  const branch =
    current ??
    initBranch<PortalBranchType>({
      tag: BranchTag.Portal,
      type,
      parent,
      key,
      props,
      instance: container,
      status: BranchStatus.Mounted,
    });

  if (current) {
    // check if container changed
    const newContainer = (props as unknown as PortalProps).container;
    const oldContainer = (current.props as unknown as PortalProps).container;

    if (newContainer !== oldContainer) {
      current.instance = newContainer;

      current.pendingActions.push(createAction(ActionType.UpdatePortalChildren, current));
    }

    branch.props = props;
  }

  return { branch, unprocessedChildren: children ?? [] };
};

export default handlePortalComponent;
