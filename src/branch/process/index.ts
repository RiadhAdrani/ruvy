import { isUndefined } from '@riadh-adrani/utils';
import { Branch } from '../types.js';
import createNewBranch from './new/index.js';
import diffBranches from './diff/index.js';
import { getCorrectKey } from '../utils/index.js';

export { commit, collectActions } from './common/index.js';

/**
 * process a template with its corresponding branch if it exist
 * @param template new template
 * @param current existing branch
 * @param parent parent branch
 * @param index index in parent
 */
const process = (
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  index: number
): Branch => {
  const $key = getCorrectKey(template, index);

  const out = isUndefined(current)
    ? createNewBranch(template, parent, $key)
    : diffBranches(template, current as Branch, parent, index);

  // check if output children have duplicate keys
  const keys = out.children.map(item => item.key);
  const unique = new Set(keys);

  if (unique.size !== keys.length) {
    console.error(`Duplicate key detected`);
  }

  return out;
};

export default process;
