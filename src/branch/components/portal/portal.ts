import { PropsWithUtility } from '../../../index.js';
import {
  ActionType,
  BranchTag,
  BranchTemplate,
  ComponentFunctionHandler,
} from '../../../branch/types.js';
import { initBranch } from '../../../branch/utils/index.js';
import createAction from '../../actions/index.js';

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
    });

  if (current) {
    // check if container changed
    const newContainer = (props as unknown as PortalProps).container;
    const oldContainer = (current.props as unknown as PortalProps).container;

    if (newContainer !== oldContainer) {
      // update instance and the container prop
      current.instance = newContainer;
      current.props.container = newContainer;

      current.pendingActions.push(createAction(ActionType.UpdatePortalChildren, current));
    }
  }

  return { branch, unprocessedChildren: children ?? [] };
};

export default handlePortalComponent;