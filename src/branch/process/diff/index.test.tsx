/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement } from '../../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import root from '../new/root.js';
import { arrangeChildren, diffNewChildren, diffTypes, removeChildrenExcess } from './index.js';
import { ActionType, Branch, BranchKey, BranchStatus } from '../../types.js';
import { collectActions, commit } from '../../utils/index.js';

createFragmentTemplate;
createJsxElement;

describe('diffBranches', () => {
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

      diffTypes(template, branch, App, 0);

      const updated = App.children[0];

      expect(updated.old?.type).toBe('div');
      expect(updated.old?.status).toBe(BranchStatus.Unmounting);

      expect(updated.type).toBe('button');
      expect(updated.status).toBe(BranchStatus.Mounting);
    });
  });
});
