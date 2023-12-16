import '../../../core/core.js';

import { beforeEach, describe, expect, it } from 'vitest';
import { initBranch } from '../../utils/index.js';
import { Portal, handlePortalComponent } from './portal.js';
import { pick } from '@riadh-adrani/obj-utils';
import { ActionType, BranchTag } from '../../types.js';
import { createElement } from '@riadh-adrani/dom-utils';
import { getCurrent } from '../../../core/core.js';

describe('handlePortalComponent', () => {
  const parent = initBranch();

  beforeEach(() => {
    getCurrent().resetActions();

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

    handlePortalComponent(<Portal container={document.body}>Hello</Portal>, branch, parent, 0);

    expect(branch.instance).toStrictEqual(document.body);
    expect(branch.props.container).toStrictEqual(document.body);
  });

  it('should create an action', () => {
    const container = createElement('div');

    const { branch } = handlePortalComponent(
      <Portal container={container}>Hello</Portal>,
      undefined,
      parent,
      0
    );

    getCurrent().commitActions();

    handlePortalComponent(<Portal container={document.body}>Hello</Portal>, branch, parent, 0);

    expect(getCurrent().pendingActions[ActionType.UpdatePortalChildren]?.length).toBe(1);
  });
});
