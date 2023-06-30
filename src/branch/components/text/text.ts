import {
  ActionType,
  Branch,
  BranchKey,
  BranchStatus,
  BranchTag,
  ComponentHandler,
} from '../../types.js';
import createAction from '../../actions/index.js';
import { areEqual } from '@riadh-adrani/utils';

/**
 * create new text branch from data.
 * @param template text to be displayed, could be a string, number...
 * @param parent parent branch
 * @param key key
 */
const create = (template: string, parent: Branch, key: BranchKey): Branch<string> => {
  const branch: Branch<string> = {
    children: [],
    hooks: {},
    key,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounting,
    tag: BranchTag.Text,
    type: BranchTag.Text,
    text: template,
    parent,
    unmountedChildren: [],
  };

  branch.pendingActions.push(createAction(ActionType.Render, branch));

  return branch;
};

/**
 * diff text branch with data.
 * @param template text to be displayed, could be a string, number...
 * @param parent parent branch
 * @param key key
 */
const diff = (template: string, current: Branch<string>): Array<unknown> => {
  // we check if text are different
  if (!areEqual(current.text, template)) {
    current.pendingActions.push(createAction(ActionType.UpdateText, current, template));

    current.text = template;
  }

  return [];
};

const textComponentHandler: ComponentHandler<string, string> = {
  create,
  diff,
};

export default textComponentHandler;
