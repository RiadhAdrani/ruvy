/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { Branch, BranchStatus, BranchTag } from '../../types.js';
import { handleEmptyComponent } from './empty.js';

createJsxElement;

describe('handleEmptyComponent', () => {
  const parent = initBranch();

  it('should return empty children and an empty branch', () => {
    const { branch, unprocessedChildren } = handleEmptyComponent(null, undefined, parent, 0);

    expect(branch).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      props: {},
      status: BranchStatus.Mounted,
      tag: BranchTag.Null,
      type: BranchTag.Null,
      parent,
      unmountedChildren: [],
    });

    expect(unprocessedChildren).toStrictEqual([]);
  });

  it('should return empty children and the current empty branch', () => {
    const current = initBranch<BranchTag.Null>({ tag: BranchTag.Null, type: BranchTag.Null });

    const { branch, unprocessedChildren } = handleEmptyComponent(null, current, parent, 0);

    expect(branch).toStrictEqual(current);
    expect(unprocessedChildren).toStrictEqual([]);
  });
});
