/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement } from '../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import root from './root/root.js';
import {
  arrangeChildren,
  diffNewChildren,
  handleComponentsWithDifferentTypes,
  handleComponent,
  removeChildrenExcess,
} from './components.js';
import { ActionType, Branch, BranchKey, BranchStatus, BranchTag } from '../types.js';
import { collectActions, commit, initBranch } from '../utils/index.js';

createFragmentTemplate;
createJsxElement;

describe('handleComponent', () => {
  const parent = initBranch();

  let App: Branch;

  beforeEach(() => {
    document.body.innerHTML = '';

    App = root(
      document.body,
      <div>
        <div key={0} />
        <button key={1} />
        <input key={2} />
      </div>
    );

    commit(collectActions(App));
  });

  it('should create a function branch', () => {
    const Container = () => <div></div>;
    const template = <Container />;

    const branch = handleComponent(template, undefined, parent, 0);

    expect(branch.tag).toBe(BranchTag.Function);
  });

  it('should create an element branch', () => {
    const template = <div></div>;
    const branch = handleComponent(template, undefined, parent, 0);

    expect(branch.tag).toBe(BranchTag.Element);
  });

  it('should create a fragment branch', () => {
    const template = <></>;
    const branch = handleComponent(template, undefined, parent, 0);

    expect(branch.tag).toBe(BranchTag.Fragment);
  });

  it('should create a text branch', () => {
    const template = 'test';
    const branch = handleComponent(template, undefined, parent, 0);

    expect(branch.tag).toBe(BranchTag.Text);
  });

  it.each([[undefined], [null], [true], [false]])('should create a null branch', template => {
    const branch = handleComponent(template, undefined, parent, 0);

    expect(branch.tag).toBe(BranchTag.Null);
  });

  describe('removeChildrenExcess', () => {
    it('should unmount children excess', () => {
      const current = App.children[0];

      const newKeys: Array<BranchKey> = [0, 1];

      removeChildrenExcess(current, newKeys);

      const unmountedChildren = current.unmountedChildren.map(child => child.key);
      const mountedChildren = current.children.map(child => child.key);

      expect(unmountedChildren).toStrictEqual([2]);
      expect(mountedChildren).toStrictEqual([0, 1]);
    });
  });

  describe('diffNewChildren', () => {
    it('should push new children at the end if not existing', () => {
      const branch = App.children[0];

      expect(branch.children.length).toBe(3);

      diffNewChildren(branch, [
        <main key={3} />,
        <div key={0} />,
        <button key={1} />,
        <input key={2} />,
      ]);

      expect(branch.children.length).toBe(4);
      expect(branch.children[3].type).toBe('main');
    });

    it('should not push new children or reorder if order changes', () => {
      const branch = App.children[0];

      diffNewChildren(branch, [<input key={2} />, <div key={0} />, <button key={1} />]);

      expect(branch.children.length).toBe(3);
      expect(branch.children[0].type).toBe('div');
      expect(branch.children[1].type).toBe('button');
      expect(branch.children[2].type).toBe('input');
    });
  });

  describe('arrangeChildren', () => {
    it('should rearrange children', () => {
      const branch = App.children[0];

      arrangeChildren(branch, [<input key={2} />, <div key={0} />, <button key={1} />]);

      expect(branch.pendingActions.filter(a => a.type === ActionType.Reorder).length).toBe(1);
    });

    it('should rearrange children', () => {
      const branch = App.children[0];

      arrangeChildren(branch, [<input key={2} />, <button key={1} />, <div key={0} />]);

      expect(branch.pendingActions.filter(a => a.type === ActionType.Reorder).length).toBe(2);
    });
  });

  describe('diffTypes', () => {
    it('should move branch to the old', () => {
      const template = <button></button>;

      const branch = App.children[0];

      handleComponentsWithDifferentTypes(template, branch, App, 0);

      const updated = App.children[0];

      expect(updated.old?.type).toBe('div');
      expect(updated.old?.status).toBe(BranchStatus.Unmounting);

      expect(updated.type).toBe('button');
      expect(updated.status).toBe(BranchStatus.Mounting);
    });
  });
});
