/** @jsx createJsxElement */

import { describe, expect, it } from 'vitest';
import { createJsxElement } from '../../create/index.js';
import { initBranch } from '../../utils/index.js';
import portal, { Portal } from './portal.js';
import { pick } from '@riadh-adrani/utils';
import { BranchTag } from '../../../branch/types.js';

createJsxElement;

describe('new.portal', () => {
  it('should create a new portal branch', () => {
    const parent = initBranch();
    const myPortal = <Portal container={document.body}>Hello</Portal>;

    const branch = portal(myPortal, parent, 0);

    expect(pick(branch, 'tag', 'type', 'parent', 'key', 'props', 'instance')).toStrictEqual({
      tag: BranchTag.Portal,
      type: Portal,
      parent,
      key: 0,
      props: {
        children: ['Hello'],
        container: document.body,
      },
      instance: document.body,
    });
  });
});
