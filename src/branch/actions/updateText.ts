import { Callback, cast } from '@riadh-adrani/utils';
import { setTextNodeData } from '@riadh-adrani/dom-utils';
import { Branch } from '../types.js';

/**
 * create an action to update a text node data.
 * @param branch targer
 * @param data text
 */
const createTextUpdateAction = (branch: Branch, data: string): Callback => {
  return () => setTextNodeData(cast<Text>(branch.instance), data);
};

export default createTextUpdateAction;
