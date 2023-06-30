/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { createContext, createContextComponent } from '../../hooks/useContext/useContext.js';
import { BranchStatus, BranchTag } from '../../index.js';
import { process } from '../components.js';
import contextComponentHandler from './context.js';
import { omit } from '@riadh-adrani/utils';

createJsxElement;

describe('context.diff', () => {
  const TestContext = createContext<{ value?: number }>({});
  const OtherContext = createContext('other');

  it('should update context value if changed', () => {
    const parent = initBranch();
    const jsx = <TestContext.Provider value={{}} />;
    const out = process(jsx, undefined, parent, 0);

    const ctx = out.children[0];

    contextComponentHandler.diff(
      createContextComponent<{ value?: number }>({
        initial: {},
        object: TestContext,
        value: { value: 5 },
        children: [],
      }),
      ctx
    );

    expect(ctx.props.value).toStrictEqual({ value: 5 });
  });

  it('should update context object if changed', () => {
    const parent = initBranch();
    const jsx = <TestContext.Provider value={{}} />;
    const out = process(jsx, undefined, parent, 0);

    const ctx = out.children[0];

    contextComponentHandler.diff(
      createContextComponent<string>({
        initial: 'other',
        object: OtherContext,
        value: 'other',
        children: [],
      }),
      ctx
    );

    expect(ctx.props.value).toStrictEqual('other');
    expect(ctx.props.object).toStrictEqual(OtherContext);
  });
});

describe('context.create', () => {
  const TestContext = createContext<{ value?: 0 }>({});

  it('should create a new element branch', () => {
    const parent = initBranch();
    const jsx = <TestContext.Provider value={{}} />;
    const out = process(jsx, undefined, parent, 0);

    const div = out.children[0];

    expect(omit(div, 'pendingActions')).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      props: { children: [], value: {}, object: TestContext, initial: {} },
      status: BranchStatus.Mounting,
      tag: BranchTag.Context,
      type: BranchTag.Context,
      parent: out,
      unmountedChildren: [],
    });
  });

  it('should accept and process children', () => {
    const parent = initBranch();
    const jsx = (
      <TestContext.Provider value={{}}>
        child <div></div>
      </TestContext.Provider>
    );
    const out = process(jsx, undefined, parent, 0);
    const div = out.children[0];

    expect(div.children.map(item => item.type)).toStrictEqual([BranchTag.Text, 'div']);
  });
});
