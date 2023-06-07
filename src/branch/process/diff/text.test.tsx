/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { ActionType, BranchTag } from '../../types.js';
import text from './text.js';

createFragmentTemplate;
createJsxElement;

describe('diff.text', () => {
  it('should return empty array', () => {
    const branch = initBranch<string>({ type: BranchTag.Text, text: 'hello' });

    const res = text(branch, '');

    expect(res).toStrictEqual([]);
  });

  it('should update text value', () => {
    const branch = initBranch<string>({ type: BranchTag.Text, text: 'hello' });

    text(branch, 'world');

    expect(branch.text).toStrictEqual('world');
  });

  it('should create a text update action', () => {
    const branch = initBranch<string>({ type: BranchTag.Text, text: 'hello' });

    text(branch, 'world');

    expect(branch.pendingActions.length).toStrictEqual(1);
    expect(branch.pendingActions[0].type).toStrictEqual(ActionType.UpdateText);
  });
});
