import {
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplateFunction,
  ComponentHandler,
} from '../../types.js';
import { useHooksContext } from '../../hooks/index.js';
import { collectPendingEffect } from '../../utils/index.js';
import { createNewBranchChildren } from '../components.js';
import { initBranch } from '../../utils/index.js';

/**
 * create a function branch from a template.
 * @param template function template
 * @param parent parent branch
 * @param key key
 */
const create = (template: BranchTemplateFunction, parent: Branch, key: BranchKey): Branch => {
  const { props, type } = template;

  const branch: Branch = initBranch({ key, props, tag: BranchTag.Function, type, parent });

  const child = useHooksContext(() => type(props), branch);

  branch.pendingActions.push(...collectPendingEffect(branch));

  branch.children = createNewBranchChildren([child], branch);

  return branch;
};

/**
 * diff function branch from a template.
 * @param template function template
 * @param parent parent branch
 */
const diff = (template: BranchTemplateFunction, current: Branch): Array<unknown> => {
  const { props, type } = template;

  const child = useHooksContext(() => type(props), current);

  current.pendingActions.push(...collectPendingEffect(current));

  return [child];
};

const callableComponentHandler: ComponentHandler<unknown, BranchTemplateFunction> = {
  create,
  diff,
};

export default callableComponentHandler;
