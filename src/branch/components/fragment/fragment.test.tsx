import '../../../core/core.js';

import { createFragmentTemplate } from '../../create/index.js';
import { describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { BranchStatus, BranchTag } from '../../types.js';
import { Fragment, handleFragmentComponent, handleJsxFragmentComponent } from './fragment.js';

describe('handleFragmentComponent', () => {
  const parent = initBranch();

  describe('JsxFragment', () => {
    it('should create a fragment branch', () => {
      const { branch } = handleJsxFragmentComponent(<></>, undefined, parent, 0);

      expect(branch).toStrictEqual({
        children: [],
        hooks: {},
        key: 0,
        props: { children: [] },
        status: BranchStatus.Mounted,
        tag: BranchTag.JsxFragment,
        type: createFragmentTemplate,
        parent,
        unmountedChildren: [],
      });
    });

    it('should return children', () => {
      const { unprocessedChildren } = handleJsxFragmentComponent(
        <>hello {0}</>,
        undefined,
        parent,
        0
      );

      expect(unprocessedChildren).toStrictEqual(['hello ', 0]);
    });

    it('should return current', () => {
      const { branch } = handleJsxFragmentComponent(<>hello {0}</>, undefined, parent, 0);

      const updated = handleJsxFragmentComponent(
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
      const { branch } = handleJsxFragmentComponent(<>hello {0}</>, undefined, parent, 0);

      const updated = handleJsxFragmentComponent(
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

  describe('Fragment', () => {
    it('should create a fragment branch', () => {
      const { branch } = handleFragmentComponent(<Fragment />, undefined, parent, 0);

      expect(branch).toStrictEqual({
        children: [],
        hooks: {},
        key: 0,
        props: { children: [] },
        status: BranchStatus.Mounted,
        tag: BranchTag.Fragment,
        type: Fragment,
        parent,
        unmountedChildren: [],
      });
    });

    it('should return children', () => {
      const { unprocessedChildren } = handleJsxFragmentComponent(
        <Fragment>hello {0}</Fragment>,
        undefined,
        parent,
        0
      );

      expect(unprocessedChildren).toStrictEqual(['hello ', 0]);
    });

    it('should return current', () => {
      const { branch } = handleJsxFragmentComponent(<>hello {0}</>, undefined, parent, 0);

      const updated = handleJsxFragmentComponent(
        <Fragment>
          <div />
        </Fragment>,
        branch,
        parent,
        0
      );

      expect(updated.branch).toStrictEqual(branch);
    });

    it('should return children', () => {
      const { branch } = handleJsxFragmentComponent(<>hello {0}</>, undefined, parent, 0);

      const updated = handleJsxFragmentComponent(
        <Fragment>
          <div />
        </Fragment>,
        branch,
        parent,
        0
      );

      expect(updated.unprocessedChildren).toStrictEqual([<div />]);
    });
  });
});
