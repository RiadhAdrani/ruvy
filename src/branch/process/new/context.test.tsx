/** @jsx createJsxElement */

import { createJsxElement } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { BranchStatus, BranchTag } from '../../types.js';
import { omit } from '@riadh-adrani/utils';
import { createContext } from '../../hooks/useContext/useContext.js';
import process from '../index.js';

createJsxElement;

describe('new.context', () => {
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
