/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { createContext, createContextComponent } from '../../hooks/useContext/useContext.js';
import process from '../index.js';
import context from './context.js';

createJsxElement;

describe('diff.context', () => {
  const TestContext = createContext<{ value?: number }>({});
  const OtherContext = createContext('other');

  it('should update context value if changed', () => {
    const parent = initBranch();
    const jsx = <TestContext.Provider value={{}} />;
    const out = process(jsx, undefined, parent, 0);

    const ctx = out.children[0];

    context(
      ctx,
      createContextComponent<{ value?: number }>({
        initial: {},
        object: TestContext,
        value: { value: 5 },
        children: [],
      })
    );

    expect(ctx.props.value).toStrictEqual({ value: 5 });
  });

  it('should update context object if changed', () => {
    const parent = initBranch();
    const jsx = <TestContext.Provider value={{}} />;
    const out = process(jsx, undefined, parent, 0);

    const ctx = out.children[0];

    context(
      ctx,
      createContextComponent<string>({
        initial: 'other',
        object: OtherContext,
        value: 'other',
        children: [],
      })
    );

    expect(ctx.props.value).toStrictEqual('other');
    expect(ctx.props.object).toStrictEqual(OtherContext);
  });
});
