/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { expect, describe, it, vitest } from 'vitest';
import createFn from './function.js';
import { createTemplate } from '../../create/index.js';
import { Branch, BranchStatus, BranchTag, HookType } from '../../types.js';
import { cast, omit } from '@riadh-adrani/utils';
import { useState } from '../../hooks/index.js';

createJsxElement;

describe('new.function', () => {
  it('should create a branch from a function', () => {
    const fn = vitest.fn();

    const branch = createFn(createTemplate(fn, { text: 1 }, []), {} as unknown as Branch, 0);

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

    const branch = createFn(createTemplate(fn, {}, []), {} as unknown as Branch, 0);

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
