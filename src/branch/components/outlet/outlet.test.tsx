/** @jsx createJsxElement */

import { describe, expect, beforeEach, it } from 'vitest';
import { createJsxElement } from '../../create/index.js';
import { Core, createRouter } from '../../../core/index.js';
import { Outlet } from '../../index.js';
import { initBranch } from '../../utils/index.js';
import outlet, { handleOutletComponent } from './outlet.js';
import { BranchTag } from '../../types.js';

createJsxElement;

describe('new.outlet', () => {
  beforeEach(() => {
    new Core();

    createRouter([{ path: '/', component: 'root element' }], {});
  });

  it('should return nothing', () => {
    new Core();

    const parent = initBranch();
    const branch = outlet.create(<Outlet />, parent, 0);

    expect(branch.type).toStrictEqual(Outlet);
    expect(branch.tag).toStrictEqual(BranchTag.Outlet);

    expect(branch.children.length).toBe(1);
    expect(branch.children[0].tag).toBe(BranchTag.Null);
  });

  it('should return root element', () => {
    const parent = initBranch();
    const branch = outlet.create(<Outlet />, parent, 0);

    expect(branch.type).toStrictEqual(Outlet);
    expect(branch.tag).toStrictEqual(BranchTag.Outlet);

    expect(branch.children.length).toBe(1);
    expect(branch.children[0].tag).toBe(BranchTag.Text);
    expect(branch.children[0].text).toBe('root element');
  });
});

describe('handleOutletComponent', () => {
  beforeEach(() => {
    new Core();

    createRouter([{ path: '/', component: 'root element' }], {});
  });

  it('should create an outlet branch', () => {
    new Core();

    const parent = initBranch();
    const { branch } = handleOutletComponent(<Outlet />, undefined, parent, 0);

    expect(branch.type).toStrictEqual(Outlet);
    expect(branch.tag).toStrictEqual(BranchTag.Outlet);
  });

  it('should return [undefined] as children', () => {
    new Core();

    const parent = initBranch();
    const { unprocessedChildren } = handleOutletComponent(<Outlet />, undefined, parent, 0);

    expect(unprocessedChildren).toStrictEqual([undefined]);
  });

  it('should return route component', () => {
    const parent = initBranch();

    const { unprocessedChildren } = handleOutletComponent(<Outlet />, undefined, parent, 0);

    expect(unprocessedChildren).toStrictEqual(['root element']);
  });
});
