/** @jsx createJsxElement */

import { createJsxElement } from '../create/index.js';

import { beforeEach, describe, expect, it } from 'vitest';
import { initBranch } from '../utils/index.js';
import createRenderAction from './render.js';
import { Branch, BranchStatus, BranchTag } from '../types.js';
import createUnmountAction from './unmount.js';
import { removeNode } from '@riadh-adrani/dom-utils';
import { handleComponent } from '../index.js';

createJsxElement;

describe('createUnmountAction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

  it('should throw when branch is non-host', () => {
    const branch = initBranch() as Branch<string>;

    expect(createUnmountAction(branch)).toThrow(`Cannot unmount a non-host branch.`);
  });

  it('should unmount branch instance', () => {
    const branch = handleComponent<string>('text', undefined, root, 0);

    // mount branch
    createRenderAction(branch)();
    expect(document.body.outerHTML).toBe('<body>text</body>');

    createUnmountAction(branch)();

    expect(branch.status).toBe(BranchStatus.Unmounted);
    expect(document.body.outerHTML).toBe('<body></body>');
  });

  it('should unmount branch even if instance is not in body', () => {
    const branch = handleComponent<string>('text', undefined, root, 0);

    // mount branch
    createRenderAction(branch)();
    expect(document.body.outerHTML).toBe('<body>text</body>');

    // simulate user modifying the element
    removeNode(branch.instance as Element);
    branch.instance = undefined;

    createUnmountAction(branch)();

    expect(branch.status).toBe(BranchStatus.Unmounted);
    expect(document.body.outerHTML).toBe('<body></body>');
  });
});
