/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement, createTemplate } from '../../create/index.js';
import { describe, expect, it, vitest } from 'vitest';
import { initBranch } from '../../utils/index.js';
import callable, { handleCallable } from './callable.js';
import { Branch, BranchStatus, BranchTag, HookType } from '../../../branch/types.js';
import { cast, omit } from '@riadh-adrani/utils';
import { useState } from '../../index.js';

createFragmentTemplate;
createJsxElement;

describe('dcallable.diff', () => {
  it('should return function result', () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    const res = callable.diff(<Component />, branch);

    expect(res).toStrictEqual([<div />]);
  });

  it('should execute function with current context', () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    callable.diff(<Component />, branch);

    expect(Component).toHaveBeenCalledOnce();
  });
});

describe('callable.create', () => {
  it('should create a branch from a function', () => {
    const fn = vitest.fn();

    const branch = callable.create(createTemplate(fn, { text: 1 }, []), {} as unknown as Branch, 0);

    expect(omit(branch, 'children')).toStrictEqual({
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { text: 1, children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Function,
      type: fn,
      parent: cast<Branch>({}),
      unmountedChildren: [],
    });
  });

  it('should create a branch with a hook', () => {
    const fn = () => {
      useState('text');

      return undefined;
    };

    const branch = callable.create(createTemplate(fn, {}, []), {} as unknown as Branch, 0);

    expect(omit(branch, 'children')).toStrictEqual({
      hooks: {
        [`${HookType.State}@0`]: {
          data: 'text',
          initialData: 'text',
          key: `${HookType.State}@0`,
          type: HookType.State,
        },
      },
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Function,
      type: fn,
      parent: cast<Branch>({}),
      unmountedChildren: [],
    });
  });
});

describe('handleCallable', () => {
  it('should create a branch from a function', () => {
    const fn = vitest.fn();

    const parent = initBranch();

    const branch = handleCallable(createTemplate(fn, { text: 1 }, []), undefined, parent, 0);

    expect(omit(branch.branch, 'children')).toStrictEqual({
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { text: 1, children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Function,
      type: fn,
      parent: parent,
      unmountedChildren: [],
    });
  });

  it('should create a branch with a hook', () => {
    const fn = () => {
      useState('text');

      return undefined;
    };

    const parent = initBranch();

    const branch = handleCallable(createTemplate(fn, {}, []), undefined, parent, 0);

    expect(omit(branch.branch, 'children')).toStrictEqual({
      hooks: {
        [`${HookType.State}@0`]: {
          data: 'text',
          initialData: 'text',
          key: `${HookType.State}@0`,
          type: HookType.State,
        },
      },
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Function,
      type: fn,
      parent: parent,
      unmountedChildren: [],
    });
  });

  it('should return function result', () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    const res = handleCallable(<Component />, branch, initBranch(), 0);

    expect(res.unprocessedChildren).toStrictEqual([<div />]);
  });

  it('should execute function with current context', () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    handleCallable(<Component />, branch, initBranch(), 0);

    expect(Component).toHaveBeenCalledOnce();
  });
});
