import { isUndefined } from '@riadh-adrani/utils';
import { Branch } from '../types.js';
import createNewBranch from './new/index.js';
import diffBranches from './diff/index.js';
import { getCorrectKey, preprocessChildren } from '../utils/index.js';

export { commit, collectActions } from '../utils/index.js';
export { Portal } from '../components/portal/portal.js';

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
    throw '[Ruvy] unexpected duplicate key';
  }

  return out;
};

/**
 * process children for a new branch
 * @param children
 * @param parent
 * @returns
 */
export const createNewBranchChildren = (
  children: Array<unknown>,
  parent: Branch
): Array<Branch> => {
  return preprocessChildren(children).map((child, index) =>
    process(child, undefined, parent, index)
  );
};

export default process;
