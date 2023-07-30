import { ActionType, Branch, BranchTag, ComponentFunctionHandler } from '../../types.js';
import createAction from '../../actions/actions.js';
import { areEqual } from '@riadh-adrani/obj-utils';
import { initBranch } from '../../utils/index.js';

export const handleTextComponent: ComponentFunctionHandler<string, BranchTag.Text> = (
  template,
  current,
  parent,
  key
) => {
  const branch: Branch<BranchTag.Text> =
    current ??
    initBranch({
      key,
      tag: BranchTag.Text,
      type: BranchTag.Text,
      text: template,
      parent,
    });

  if (!current) {
    branch.pendingActions.push(createAction(ActionType.Render, branch));
  } else {
    // we check if text are different
    if (!areEqual(current.text, template)) {
      current.pendingActions.push(createAction(ActionType.UpdateText, current, template));

      current.text = template;
    }
  }

  return { branch, unprocessedChildren: [] };
};

export default handleTextComponent;
