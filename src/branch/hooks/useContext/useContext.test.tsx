import '../../../core/core.js';

import { describe, expect, it } from 'vitest';
import { createContext, useContext } from './useContext.js';
import { BranchSymbol, BranchTag, BranchTemplate } from '../../types.js';
import { handleComponent } from '../../index.js';
import { initBranch } from '../../utils/index.js';

describe('useContext', () => {
  const TestContext = createContext<{ hello?: string }>({});

  it('should create a context object', () => {
    expect(TestContext.Provider).toBeDefined();
  });

  it('should create a context provider component with value, children', () => {
    expect(<TestContext.Provider value={{}} />).toStrictEqual<BranchTemplate>({
      children: [],
      props: { value: {}, children: [] },
      key: undefined,
      symbol: BranchSymbol,
      type: TestContext.Provider,
    });
  });

  it('should create a context component with value, children and object', () => {
    const parent = initBranch({});

    const branch = handleComponent(<TestContext.Provider value={{}} />, undefined, parent, 0);

    const ctx = branch.children[0];

    expect(ctx.tag).toBe(BranchTag.Context);
    expect(ctx.type).toBe(BranchTag.Context);
    expect(ctx.props).toStrictEqual({
      value: {},
      object: TestContext,
      initial: {},
      children: [],
    });
  });

  it('should dispatch context', () => {
    const parent = initBranch({});

    let obj: object | undefined = undefined;

    const Child = () => {
      obj = useContext(TestContext);

      return <div />;
    };

    handleComponent(
      <TestContext.Provider value={{}}>
        <Child />
      </TestContext.Provider>,
      undefined,
      parent,
      0
    );

    expect(obj).toStrictEqual({});
  });

  it('should throw when context is not found', () => {
    const parent = initBranch({});

    const Child = () => {
      useContext(TestContext);

      return <div />;
    };

    const callback = () => handleComponent(<Child />, undefined, parent, 0);

    expect(callback).toThrow('Unexpected State: useContext used outside of Context');
  });

  it('should get nearest context', () => {
    const parent = initBranch({});

    let obj: object | undefined = undefined;

    const Child = () => {
      obj = useContext(TestContext);

      return <div />;
    };

    handleComponent(
      <TestContext.Provider value={{}}>
        <TestContext.Provider value={{ hello: 'world' }}>
          <Child />
        </TestContext.Provider>
      </TestContext.Provider>,
      undefined,
      parent,
      0
    );

    expect(obj).toStrictEqual({ hello: 'world' });
  });
});
