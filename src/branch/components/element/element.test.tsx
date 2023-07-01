/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import elementComponentHandler, { diffElementProps, handleElementComponent } from './element.js';
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

describe('handleElementComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should create a new element branch', () => {
    const parent = initBranch();
    const jsx = <div></div>;
    const div = handleElementComponent(
      jsx as unknown as BranchTemplate<string>,
      undefined,
      parent,
      0
    ).branch;

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
    const div = handleElementComponent(
      jsx as unknown as BranchTemplate<string>,
      undefined,
      parent,
      0
    ).branch;

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

  it('should add update props action', () => {
    const { branch } = handleElementComponent(<div />, undefined, initBranch(), 0);

    handleElementComponent(<div class="div" />, branch, initBranch(), 0);

    expect(branch.pendingActions.some(it => it.type === ActionType.UpdateProps)).toBe(true);
  });

  it('should not add an update props action when not needed', () => {
    const { branch } = handleElementComponent(<div />, undefined, initBranch(), 0);

    handleElementComponent(<div />, branch, initBranch(), 0);

    expect(branch.pendingActions.some(it => it.type === ActionType.UpdateProps)).toBe(false);
  });
});
