import { BranchTemplateFragment } from '../../types.js';

/**
 * diff fragment branches
 * @param template fragment template
 */
const fragment = (template: BranchTemplateFragment): Array<unknown> => {
  const { children } = template;

  return children;
};

export default fragment;
