import { Branch, BranchTemplateFunction } from '../../types.js';
import { useHooksContext } from '../../hooks/index.js';
import { collectPendingEffect } from '../common/index.js';

/**
 * diff function branch from a template.
 * @param template function template
 * @param parent parent branch
 */
const fn = (current: Branch, template: BranchTemplateFunction): Array<unknown> => {
  const { props, type } = template;

  const child = useHooksContext(() => type(props), current);

  current.pendingActions.push(...collectPendingEffect(current));

  return [child];
};

export default fn;
