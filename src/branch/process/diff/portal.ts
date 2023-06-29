import { ActionType, Branch, BranchTemplate } from '../../types.js';
import { PortalBranchType, PortalProps } from '../new/portal.js';
import createAction from '../../actions/index.js';

/**
 * perform diffing of a context template and branch.
 * @param current
 * @param template
 */
const portal = (current: Branch, template: BranchTemplate<PortalBranchType>): Array<unknown> => {
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

export default portal;
