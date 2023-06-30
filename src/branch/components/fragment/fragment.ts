import { createNewBranchChildren } from '../../process/index.js';
import {
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplateFragment,
  ComponentHandler,
} from '../../types.js';
import { collectPendingEffect, initBranch } from '../../utils/index.js';
import { useHooksContext } from '../../hooks/index.js';

/**
 * create a new fragment branch from a template.
 * @param template fragment template
 * @param parent parent branch
 * @param key key
 */
const create = (template: BranchTemplateFragment, parent: Branch, key: BranchKey): Branch => {
  const { type, children, props } = template;

  const branch: Branch = initBranch({ key, props, type, parent, tag: BranchTag.Fragment });

  const fragmentChildren = useHooksContext(() => type(children), branch);

  branch.pendingActions.push(...collectPendingEffect(branch));

  branch.children = createNewBranchChildren(fragmentChildren, branch);

  return branch;
};

/**
 * diff fragment branches
 * @param template fragment template
 */
const diff = (template: BranchTemplateFragment): Array<unknown> => {
  const { children } = template;

  return children;
};

const fragmentComponentHandler: ComponentHandler<unknown, BranchTemplateFragment> = {
  create,
  diff,
};

export default fragmentComponentHandler;
