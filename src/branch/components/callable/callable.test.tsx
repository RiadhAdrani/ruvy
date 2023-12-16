import '../../../core/core.js';

import { createTemplate } from '../../create/index.js';
import { describe, expect, it, vitest } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { handleCallableComponent } from './callable.js';
import { BranchStatus, BranchTag, HookType } from '../../types.js';
import { omit } from '@riadh-adrani/obj-utils';
import { useState } from '../../index.js';

describe('handleCallable', () => {
  it('should create a branch from a function', () => {
    const fn = vitest.fn();

    const parent = initBranch();

    const branch = handleCallableComponent(
      createTemplate(fn, { text: 1 }, []),
      undefined,
      parent,
      0
    );

    expect(omit(branch.branch, 'children')).toStrictEqual({
      hooks: {},
      key: 0,
      props: { text: 1, children: [] },
      status: BranchStatus.Mounted,
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

    const branch = handleCallableComponent(createTemplate(fn, {}, []), undefined, parent, 0);

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
      props: { children: [] },
      status: BranchStatus.Mounted,
      tag: BranchTag.Function,
      type: fn,
      parent: parent,
      unmountedChildren: [],
    });
  });

  it('should return function result', () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    const res = handleCallableComponent(<Component />, branch, initBranch(), 0);

    expect(res.unprocessedChildren).toStrictEqual([<div />]);
  });

  it('should execute function with current context', () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    handleCallableComponent(<Component />, branch, initBranch(), 0);

    expect(Component).toHaveBeenCalledOnce();
  });
});
