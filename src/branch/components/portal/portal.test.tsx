/** @jsx createJsxElement */

import { beforeEach, describe, expect, it } from 'vitest';
import { createJsxElement } from '../../create/index.js';
import { initBranch } from '../../utils/index.js';
import { Portal, handlePortalComponent } from './portal.js';
import { pick } from '@riadh-adrani/obj-utils';
import { ActionType, BranchTag } from '../../../branch/types.js';
import { createElement } from '@riadh-adrani/dom-utils';

createJsxElement;

describe('handlePortalComponent', () => {
  const parent = initBranch();

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should create a new portal branch', () => {
    const myPortal = <Portal container={document.body}>Hello</Portal>;

    const { branch } = handlePortalComponent(myPortal, undefined, parent, 0);

    expect(pick(branch, 'tag', 'type', 'parent', 'key', 'props', 'instance')).toStrictEqual({
      tag: BranchTag.Portal,
      type: Portal,
      parent,
      key: 0,
      props: {
        children: ['Hello'],
        container: document.body,
      },
      instance: document.body,
    });
  });

  it('should return template children to be processed', () => {
    const container = document.body;

    const { unprocessedChildren } = handlePortalComponent(
      <Portal container={container}>Hello</Portal>,
      undefined,
      parent,
      0
    );

    expect(unprocessedChildren).toStrictEqual(['Hello']);
  });

  it('should update container and instance', () => {
    const container = createElement('div');

    const { branch } = handlePortalComponent(
      <Portal container={container}>Hello</Portal>,
      undefined,
      parent,
      0
    );

    handlePortalComponent(<Portal container={document.body}>Hello</Portal>, undefined, parent, 0);

    expect(branch.instance).toStrictEqual(container);
    expect(branch.props.container).toStrictEqual(container);
  });

  it('should create an action', () => {
    const container = createElement('div');

    const { branch } = handlePortalComponent(
      <Portal container={container}>Hello</Portal>,
      undefined,
      parent,
      0
    );

    handlePortalComponent(<Portal container={document.body}>Hello</Portal>, branch, parent, 0);

    expect(branch.pendingActions[0].type).toStrictEqual(ActionType.UpdatePortalChildren);
  });
});
