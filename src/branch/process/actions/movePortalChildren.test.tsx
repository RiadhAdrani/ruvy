/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { createElement } from '@riadh-adrani/dom-utils';
import { Portal, PortalBranchType } from '../new/portal.js';
import { initBranch } from '../../../branch/utils/index.js';
import createMovePortalChildren from './movePortalChildren.js';
import { Branch, BranchTag } from '../../../branch/types.js';

createJsxElement;

describe('createMovePortalChildren', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('should move instances', () => {
    const children = createElement('button', { children: 'Hello' });

    const el = createElement('div', {
      children,
    });
    document.body.appendChild(el);

    const branch = initBranch({
      type: Portal,
      instance: document.body,
      tag: BranchTag.Element,
      children: [initBranch({ type: 'button', tag: BranchTag.Element, instance: children })],
    });

    expect(document.body.innerHTML).toBe('<div><button>Hello</button></div>');

    createMovePortalChildren(branch as Branch<PortalBranchType>)();

    expect(document.body.innerHTML).toBe('<div></div><button>Hello</button>');
  });
});
