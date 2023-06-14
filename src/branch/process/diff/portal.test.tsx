/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createFragmentTemplate, createJsxElement } from '../../create/index.js';

import { ActionType, BranchTag } from '../../../branch/types.js';
import { initBranch } from '../../../branch/utils/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { Portal } from '../index.js';
import portal from './portal.js';
import { createElement } from '@riadh-adrani/dom-utils';

createFragmentTemplate;
createJsxElement;

describe('diff.portal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return template children to be processed', () => {
    const container = document.body;

    const current = initBranch({
      type: Portal,
      tag: BranchTag.Portal,
      props: { children: [], container },
      instance: container,
    });

    expect(portal(current, <Portal container={container}>Hello</Portal>)).toStrictEqual(['Hello']);
  });

  it('should update container and instance', () => {
    const container = createElement('div');

    const current = initBranch({
      type: Portal,
      tag: BranchTag.Portal,
      props: { children: [], container: document.body },
      instance: document.body,
    });

    portal(current, <Portal container={container} />);

    expect(current.instance).toStrictEqual(container);
    expect(current.props.container).toStrictEqual(container);
  });

  it('should create an action', () => {
    const container = createElement('div');

    const current = initBranch({
      type: Portal,
      tag: BranchTag.Portal,
      props: { children: [], container: document.body },
      instance: document.body,
    });

    portal(current, <Portal container={container} />);

    expect(current.pendingActions[0].type).toStrictEqual(ActionType.UpdatePortalChildren);
  });
});
