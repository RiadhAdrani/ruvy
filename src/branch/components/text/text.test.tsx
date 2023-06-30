/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { ActionType, BranchStatus, BranchTag } from '../../types.js';
import text from './text.js';
import { omit } from '@riadh-adrani/utils';

createJsxElement;

describe('new.text', () => {
  it('should create a text branch', () => {
    const parent = initBranch();
    const div = text.create('test', parent, 0);

    expect(omit(div, 'pendingActions')).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: {},
      status: BranchStatus.Mounting,
      tag: BranchTag.Text,
      type: BranchTag.Text,
      parent,
      text: 'test',
      unmountedChildren: [],
    });

    expect(div.pendingActions.length).toBe(1);
    expect(div.pendingActions[0].type).toBe(ActionType.Render);
  });
});

describe('diff.text', () => {
  it('should return empty array', () => {
    const branch = initBranch<string>({ type: BranchTag.Text, text: 'hello' });

    const res = text.diff('', branch);

    expect(res).toStrictEqual([]);
  });

  it('should update text value', () => {
    const branch = initBranch<string>({ type: BranchTag.Text, text: 'hello' });

    text.diff('world', branch);

    expect(branch.text).toStrictEqual('world');
  });

  it('should create a text update action', () => {
    const branch = initBranch<string>({ type: BranchTag.Text, text: 'hello' });

    text.diff('world', branch);

    expect(branch.pendingActions.length).toStrictEqual(1);
    expect(branch.pendingActions[0].type).toStrictEqual(ActionType.UpdateText);
  });
});
