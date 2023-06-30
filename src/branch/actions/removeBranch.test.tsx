/** @jsx createJsxElement */

import { createJsxElement } from '../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import element from '../components/element/element.js';
import root from '../components/root/root.js';
import createRemoveBranchAction from './removeBranch.js';
import { BranchTemplate } from '../types.js';

createJsxElement;

describe('createRemoveBranchAction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should remove branch', () => {
    const parent = root(document.body, null);

    const div = element.create((<div>Hello</div>) as BranchTemplate<string>, parent, 0);

    createRemoveBranchAction(div.children[0])();

    expect(div.children).toStrictEqual([]);
  });
});
