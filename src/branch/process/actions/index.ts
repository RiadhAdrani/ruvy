import { Callback } from "@riadh-adrani/utils";
import { ActionType, Branch, BranchAction } from "../../types/index.js";
import createRenderAction from "./render.js";
import createUnmountAction from "./unmount.js";

/**
 * @deprecated
 * @param type
 * @param branch
 */
const createAction = (type: ActionType, branch: Branch): BranchAction => {
  let callback: Callback = () => 0;

  switch (type) {
    case ActionType.Render: {
      callback = createRenderAction(branch as Branch<string>);
      break;
    }
    case ActionType.Unmount: {
      callback = createUnmountAction(branch as Branch<string>);
    }
    default: {
      throw `Unknown action type (${type})`;
    }
  }

  return {
    callback,
    requestTime: Date.now(),
    type,
  };
};

export default createAction;
