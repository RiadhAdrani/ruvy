import { Callback } from "@riadh-adrani/utils";
import { ActionType, Branch, BranchAction, PropDiff } from "../../types/index.js";
import createRenderAction from "./render.js";
import createUnmountAction from "./unmount.js";
import createElPropsUpdateAction from "./updateElProps.js";

/**
 * @deprecated
 * @param type
 * @param branch
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
    }
    case ActionType.UpdateProps: {
      callback = createElPropsUpdateAction(branch as Branch<string>, data as Array<PropDiff>);
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
      branch.pendingActions = branch.pendingActions.filter((item) => item !== action);
    },
    requestTime: Date.now(),
    type,
  };

  return action;
};

export default createAction;
