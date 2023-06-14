import { Callback, cast } from '@riadh-adrani/utils';
import { ActionType, Branch, BranchAction, Effect, PropDiff } from '../../types.js';
import createRenderAction from './render.js';
import createUnmountAction from './unmount.js';
import createElPropsUpdateAction from './updateElProps.js';
import createTextUpdateAction from './updateText.js';
import createRemoveBranchAction from './removeBranch.js';
import createReorderHostElement from './reorderElement.js';
import createMovePortalChildren from './movePortalChildren.js';
import { PortalBranchType } from '../new/portal.js';

/**
 * create an branch action
 * @param type action type
 * @param branch target branch
 * @param data additional data, optional
 */
const createAction = <T = unknown>(type: ActionType, branch: Branch, data?: T): BranchAction => {
  let callback: Callback = () => 0;

  switch (type) {
    case ActionType.Render: {
      callback = createRenderAction(branch as Branch<string>);
      break;
    }
    case ActionType.Unmount: {
      callback = createUnmountAction(branch as Branch<string>);
      break;
    }
    case ActionType.UpdateProps: {
      callback = createElPropsUpdateAction(branch as Branch<string>, data as Array<PropDiff>);
      break;
    }
    case ActionType.UpdateText: {
      callback = createTextUpdateAction(branch as Branch<string>, data as string);
      break;
    }
    case ActionType.RemoveBranch: {
      callback = createRemoveBranchAction(branch);
      break;
    }
    case ActionType.Reorder: {
      callback = createReorderHostElement(branch);
      break;
    }
    case ActionType.UpdatePortalChildren: {
      callback = createMovePortalChildren(branch as Branch<PortalBranchType>);
      break;
    }
    case ActionType.Cleanup:
    case ActionType.Effect: {
      callback = cast<Effect>(data);
      break;
    }
    default: {
      throw `Unknown action type (${type})`;
    }
  }

  const action: BranchAction = {
    callback: () => {
      // execute action
      callback();

      // remove action from branch
      branch.pendingActions = branch.pendingActions.filter(item => item !== action);
    },
    requestTime: Date.now(),
    type,
    debug: branch,
  };

  return action;
};

export default createAction;
