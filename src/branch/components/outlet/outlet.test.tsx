import '../../../core/core.js';

import { describe, expect, beforeEach, it } from 'vitest';
import { Core, createRouter } from '../../../core/core.js';
import { Outlet } from '../../index.js';
import { initBranch } from '../../utils/index.js';
import { handleOutletComponent } from './outlet.js';
import { BranchStatus, BranchTag } from '../../types.js';

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
    expect(branch.status).toStrictEqual(BranchStatus.Mounted);
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
