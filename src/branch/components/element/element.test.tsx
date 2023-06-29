/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import elementComponentHandler, { diffElementProps } from './element.js';
import { initBranch } from '../../utils/index.js';
import { ActionType, BranchStatus, BranchTag, BranchTemplate } from '../../types.js';
import { omit } from '@riadh-adrani/utils';

createJsxElement;

describe('element.create', () => {
  it('should create a new element branch', () => {
    const parent = initBranch();
    const jsx = <div></div>;
    const div = elementComponentHandler.create(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(omit(div, 'pendingActions')).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: 'div',
      parent,
      unmountedChildren: [],
    });

    expect(div.pendingActions.length).toBe(1);

    const { type } = div.pendingActions[0];
    expect(type).toBe(ActionType.Render);
  });

  it('should create a div with props', () => {
    const parent = initBranch();
    const jsx = <div class="test"></div>;
    const div = elementComponentHandler.create(jsx as unknown as BranchTemplate<string>, parent, 0);

    expect(omit(div, 'pendingActions')).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [], class: 'test' },
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: 'div',
      parent,
      unmountedChildren: [],
    });
  });
});

describe('element.diff', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should not create an op when values are the same', () => {
    const oldBranch = initBranch({ props: { class: 'test' } });
    const newBranch = initBranch({ props: { class: 'test' } });

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([]);
  });

  it('should create a remove op', () => {
    const oldBranch = initBranch({ props: { class: 'test' } });
    const newBranch = initBranch();

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([{ op: 'remove', priority: 1, prop: 'class', value: 'test' }]);
  });

  it('should create an update op', () => {
    const oldBranch = initBranch({ props: { class: 'test' } });
    const newBranch = initBranch({ props: { class: 'test-2' } });

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([{ op: 'update', priority: 1, prop: 'class', value: 'test-2' }]);
  });

  it('should create a set op', () => {
    const oldBranch = initBranch();
    const newBranch = initBranch({ props: { class: 'test' } });

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([{ op: 'set', priority: 1, prop: 'class', value: 'test' }]);
  });
});
