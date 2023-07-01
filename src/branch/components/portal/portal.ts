import { PropsWithUtility } from '../../../index.js';
import { createNewBranchChildren } from '../components.js';
import {
  ActionType,
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  ComponentFunctionHandler,
  ComponentHandler,
} from '../../../branch/types.js';
import { initBranch } from '../../../branch/utils/index.js';
import createAction from '../../actions/index.js';

export type PortalProps = PropsWithUtility<{ container: Element }>;

export const Portal = (props: PortalProps) => props as unknown as JSX.Element;

export type PortalBranchType = typeof Portal;

/**
 * create a new portal branch from the given template
 * @param template component template
 * @param parent parent branch
 * @param key component key
 */
const create = (
  template: BranchTemplate<PortalBranchType>,
  parent: Branch,
  key: BranchKey
): Branch<PortalBranchType> => {
  const { type, props } = template;
  const { children, container } = props as unknown as PortalProps;

  const branch = initBranch<PortalBranchType>({
    tag: BranchTag.Portal,
    type,
    parent,
    key,
    props,
    instance: container,
  });

  branch.children = createNewBranchChildren(children ?? [], branch);

  return branch;
};

/**
 * perform diffing of a context template and branch.
 * @param current
 * @param template
 */
const diff = (template: BranchTemplate<PortalBranchType>, current: Branch): Array<unknown> => {
  const { children, props } = template;

  // check if container changed
  const newContainer = (props as unknown as PortalProps).container;
  const oldContainer = (current.props as unknown as PortalProps).container;

  if (newContainer !== oldContainer) {
    // update instance and the container prop
    current.instance = newContainer;
    current.props.container = newContainer;

    current.pendingActions.push(createAction(ActionType.UpdatePortalChildren, current));
  }

  return children;
};

const portalComponentHandler: ComponentHandler<unknown, BranchTemplate<PortalBranchType>> = {
  create,
  diff,
};

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

export default portalComponentHandler;
