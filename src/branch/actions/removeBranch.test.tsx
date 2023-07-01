/** @jsx createJsxElement */

import { createJsxElement } from '../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import root from '../components/root/root.js';
import createRemoveBranchAction from './removeBranch.js';
import { handleComponent } from '../index.js';

createJsxElement;

describe('createRemoveBranchAction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should remove branch', () => {
    const parent = root(document.body, null);

    const div = handleComponent(<div>Hello</div>, undefined, parent, 0);

    createRemoveBranchAction(div.children[0])();

    expect(div.children).toStrictEqual([]);
  });
});
