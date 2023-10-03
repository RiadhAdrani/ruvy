/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { ActionType, BranchStatus, BranchTag } from '../../types.js';
import { handleTextComponent } from './text.js';
import { omit } from '@riadh-adrani/obj-utils';
import { getCurrent } from '../../../core/core.js';

createJsxElement;

describe('handleTextComponent', () => {
  beforeEach(() => {
    getCurrent().resetActions();
  });

  const parent = initBranch();

  it('should create a text branch', () => {
    const { branch, unprocessedChildren } = handleTextComponent('test', undefined, parent, 0);

    expect(omit(branch, 'pendingActions')).toStrictEqual({
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

    expect(getCurrent().pendingActions[ActionType.Render]?.length).toBe(1);
    expect(unprocessedChildren).toStrictEqual([]);
  });

  it('should update text value and create an action', () => {
    const branch = initBranch<BranchTag.Text>({ type: BranchTag.Text, text: 'hello' });

    handleTextComponent('world', branch, parent, 0);

    expect(branch.text).toStrictEqual('world');
    expect(getCurrent().pendingActions[ActionType.UpdateText]?.length).toBe(1);
  });
});
