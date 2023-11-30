import '../../../core/core.js';

import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { createContext } from '../../hooks/useContext/useContext.js';
import { BranchStatus, BranchSymbol, BranchTag, BranchTemplate } from '../../index.js';
import { handleContextComponent } from './context.js';
import { omit } from '@riadh-adrani/obj-utils';
import { handleCallableComponent } from '../callable/callable.js';

describe('handleContextComponent', () => {
  const TestContext = createContext<{ value?: number }>({});
  const OtherContext = createContext('other');

  it('should update context value if changed', () => {
    const parent = initBranch();
    const out = handleCallableComponent(<TestContext.Provider value={{}} />, undefined, parent, 0);
    const ctx = handleContextComponent(
      out.unprocessedChildren[0] as BranchTemplate,
      undefined,
      out.branch,
      0,
    ).branch;

    const outUpdate = handleCallableComponent(
      <TestContext.Provider value={{ value: 5 }} />,
      out.branch,
      parent,
      0,
    );
    handleContextComponent(outUpdate.unprocessedChildren[0] as BranchTemplate, ctx, out.branch, 0)
      .branch;

    handleContextComponent(
      outUpdate.unprocessedChildren[0] as BranchTemplate,
      outUpdate.branch,
      parent,
      0,
    );

    expect(ctx.props.value).toStrictEqual({ value: 5 });
  });

  it('should update context object if changed', () => {
    const parent = initBranch();
    const out = handleCallableComponent(<TestContext.Provider value={{}} />, undefined, parent, 0);
    const ctx = handleContextComponent(
      out.unprocessedChildren[0] as BranchTemplate,
      undefined,
      out.branch,
      0,
    ).branch;

    const outUpdate = handleCallableComponent(
      <OtherContext.Provider value={'other'} />,
      out.branch,
      parent,
      0,
    );
    handleContextComponent(outUpdate.unprocessedChildren[0] as BranchTemplate, ctx, out.branch, 0)
      .branch;

    handleContextComponent(
      outUpdate.unprocessedChildren[0] as BranchTemplate,
      outUpdate.branch,
      parent,
      0,
    );

    expect(ctx.props.value).toStrictEqual('other');
  });

  it('should create a new element branch', () => {
    const parent = initBranch();
    const out = handleCallableComponent(<TestContext.Provider value={{}} />, undefined, parent, 0);

    const ctx = handleContextComponent(
      out.unprocessedChildren[0] as BranchTemplate,
      undefined,
      out.branch,
      0,
    );

    const div = ctx.branch;

    expect(omit(div, 'pendingActions')).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [], value: {}, object: TestContext, initial: {} },
      status: BranchStatus.Mounted,
      tag: BranchTag.Context,
      type: BranchTag.Context,
      parent: out.branch,
      unmountedChildren: [],
    });
  });

  it('should accept and pass children', () => {
    const parent = initBranch();
    const out = handleCallableComponent(
      <TestContext.Provider value={{}}>
        child <div></div>
      </TestContext.Provider>,
      undefined,
      parent,
      0,
    );

    expect(out.unprocessedChildren[0]).toStrictEqual<BranchTemplate<BranchTag.Context>>({
      children: ['child ', <div />],
      props: { children: ['child ', <div />], initial: {}, object: TestContext, value: {} },
      symbol: BranchSymbol,
      type: BranchTag.Context,
      key: undefined,
    });
  });
});
