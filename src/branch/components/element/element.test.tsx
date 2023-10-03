/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { diffElementProps, handleElementComponent } from './element.js';
import { initBranch } from '../../utils/index.js';
import { ActionType, Branch, BranchStatus, BranchTag, BranchTemplate } from '../../types.js';
import { omit } from '@riadh-adrani/obj-utils';
import { getCurrent } from '../../../core/core.js';
import { createRoot } from '../components.js';

createJsxElement;

describe('handleElementComponent', () => {
  let root: Branch;

  beforeEach(() => {
    document.body.innerHTML = '';

    getCurrent().resetActions();

    root = createRoot(document.body, null);
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

    const pending = getCurrent().pendingActions[ActionType.Render];

    expect(pending?.length).toBe(1);
  });

  it('should skip children processing when innerHTML is defined', () => {
    const parent = initBranch();

    const out = handleElementComponent(<div dom:innerHTML="test" />, undefined, parent, 0);

    expect(out.skipChildrenProcessing).toBe(true);
  }),
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

    const pending = getCurrent().pendingActions[ActionType.UpdateProps];

    expect(pending?.length).toBe(1);
  });

  it('should not add an update props action when not needed', () => {
    createRoot(document.body, <div />);

    getCurrent().commitActions();

    handleElementComponent(<div />, root.children[0] as Branch<string>, initBranch(), 0);

    const pending = getCurrent().pendingActions[ActionType.UpdateProps];

    expect(pending?.length).toBe(undefined);
  });

  it('should create an innerHTML action', () => {
    handleElementComponent(<div dom:innerHTML="test" />, undefined, initBranch(), 0);

    const pending = getCurrent().pendingActions[ActionType.RenderInnerHTML];

    expect(pending?.length).toBe(1);
  });

  it('should not create an innerHTML action when attribute did not change', () => {
    const root = createRoot(document.body, <div dom:innerHTML="test" />);

    getCurrent().commitActions();

    handleElementComponent(
      <div dom:innerHTML="test" />,
      root.children[0] as Branch<string>,
      initBranch(),
      0
    );

    const pending = getCurrent().pendingActions[ActionType.RenderInnerHTML];

    expect(pending?.length).toBe(undefined);
  });
});
