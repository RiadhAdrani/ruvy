/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createJsxElement, createFragmentTemplate } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { Branch, BranchStatus, BranchTag, BranchTemplateFragment } from '../../types.js';
import fragment, { handleFragmentComponent } from './fragment.js';

createFragmentTemplate;
createJsxElement;

describe('new.fragment', () => {
  it('should create a new empty branch', () => {
    const parent = initBranch();
    const jsx = (<></>) as BranchTemplateFragment;

    const branch = fragment.create(jsx, parent, 0);

    expect(branch).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Fragment,
      type: createFragmentTemplate,
      parent,
      unmountedChildren: [],
    });
  });
});

describe('diff.fragment', () => {
  it('should just return children', () => {
    const template = <>hello world</>;

    expect(fragment.diff(template as BranchTemplateFragment, initBranch())).toStrictEqual([
      'hello world',
    ]);
  });
});

describe('handleFragmentComponent', () => {
  const parent = initBranch();

  it('should create a fragment branch', () => {
    const { branch } = handleFragmentComponent(<></>, undefined, parent, 0);

    expect(branch).toStrictEqual({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Mounting,
      tag: BranchTag.Fragment,
      type: createFragmentTemplate,
      parent,
      unmountedChildren: [],
    });
  });

  it('should return children', () => {
    const { unprocessedChildren } = handleFragmentComponent(<>hello {0}</>, undefined, parent, 0);

    expect(unprocessedChildren).toStrictEqual(['hello ', 0]);
  });

  it('should return current', () => {
    const { branch } = handleFragmentComponent(<>hello {0}</>, undefined, parent, 0);

    const updated = handleFragmentComponent(
      <>
        <div />
      </>,
      branch,
      parent,
      0
    );

    expect(updated.branch).toStrictEqual(branch);
  });

  it('should return children', () => {
    const { branch } = handleFragmentComponent(<>hello {0}</>, undefined, parent, 0);

    const updated = handleFragmentComponent(
      <>
        <div />
      </>,
      branch,
      parent,
      0
    );

    expect(updated.unprocessedChildren).toStrictEqual([<div />]);
  });
});
