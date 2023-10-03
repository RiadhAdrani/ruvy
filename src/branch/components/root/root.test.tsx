import '../../../core/core.js';

import { describe, expect, it } from 'vitest';
import { Branch, BranchStatus, BranchTag } from '../../types.js';
import createRoot from './root.js';

describe('new.root', () => {
  it('should create a new empty branch', () => {
    const rt = createRoot(document.body, null);

    expect(rt).toStrictEqual<Branch>({
      children: [
        {
          children: [],
          hooks: {},
          key: 0,
          props: {},
          status: BranchStatus.Mounted,
          tag: BranchTag.Null,
          type: BranchTag.Null,
          parent: rt,
          unmountedChildren: [],
        },
      ],
      hooks: {},
      key: 0,
      props: {},
      status: BranchStatus.Mounted,
      tag: BranchTag.Root,
      type: BranchTag.Root,
      instance: document.body,
      unmountedChildren: [],
    });
  });
});
