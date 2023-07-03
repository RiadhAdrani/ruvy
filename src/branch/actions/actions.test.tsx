/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

import { createJsxElement, createFragmentTemplate } from '../create/index.js';

import { afterAll, beforeEach, describe, expect, it, vitest } from 'vitest';
import { createElement, removeNode } from '@riadh-adrani/dom-utils';
import { Portal, PortalBranchType } from '../components/portal/portal.js';
import { collectActions, commit, initBranch } from '../utils/index.js';
import { Branch, BranchStatus, BranchTag, BranchTemplate } from '../types.js';
import { createRoot, handleComponent } from '../index.js';
import {
  createRemoveBranchAction,
  createMovePortalChildren,
  createRenderAction,
  createReorderHostElement,
  createUnmountAction,
  createElPropsUpdateAction,
  createTextUpdateAction,
} from './actions.js';
import { diffElementProps } from '../components/element/element.js';
import { cast } from '@riadh-adrani/utils';

createJsxElement;
createFragmentTemplate;

describe('createMovePortalChildren', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('should move instances', () => {
    const children = createElement('button', { children: 'Hello' });

    const el = createElement('div', {
      children,
    });
    document.body.appendChild(el);

    const branch = initBranch({
      type: Portal,
      instance: document.body,
      tag: BranchTag.Element,
      children: [initBranch({ type: 'button', tag: BranchTag.Element, instance: children })],
    });

    expect(document.body.innerHTML).toBe('<div><button>Hello</button></div>');

    createMovePortalChildren(branch as Branch<PortalBranchType>)();

    expect(document.body.innerHTML).toBe('<div></div><button>Hello</button>');
  });
});

describe('createRemoveBranchAction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should remove branch', () => {
    const parent = createRoot(document.body, null);

    const div = handleComponent(<div>Hello</div>, undefined, parent, 0);

    createRemoveBranchAction(div.children[0])();

    expect(div.children).toStrictEqual([]);
  });
});

describe('createRenderAction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

  it('should throw when branch is non-element', () => {
    const branch = initBranch() as Branch<string>;

    expect(createRenderAction(branch)).toThrow('Cannot render a non-host branch.');
  });

  it('should inject text in the root', () => {
    const branch = handleComponent('text', undefined, root, 0);

    createRenderAction(branch as Branch<string>)();

    expect(document.body.outerHTML).toBe('<body>text</body>');

    expect(branch.instance).toBeDefined();
    expect(branch.status).toBe(BranchStatus.Mounted);
  });

  it('should inject div in the root', () => {
    const branch = handleComponent((<div />) as BranchTemplate<string>, undefined, root, 0);

    createRenderAction(branch as Branch<string>)();

    expect(document.body.outerHTML).toBe('<body><div></div></body>');

    expect(branch.instance).toBeDefined();
    expect(branch.status).toBe(BranchStatus.Mounted);
  });

  it('should inject div with props', () => {
    const branch = handleComponent(
      (<div class="test" id="test" />) as BranchTemplate<string>,
      undefined,
      root,
      0
    );

    createRenderAction(branch as Branch<string>)();

    expect(document.body.outerHTML).toBe(`<body><div class="test" id="test"></div></body>`);
  });

  it('should inject div with events', () => {
    const onClick = vitest.fn();

    const branch = handleComponent(<div onClick={onClick} />, undefined, root, 0);

    createRenderAction(branch as Branch<string>)();

    expect(document.body.outerHTML).toBe('<body><div></div></body>');

    const instance = branch.instance as HTMLDivElement;
    instance.click();

    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('createReorderHostElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should reorder branch instance', () => {
    const parent = createRoot(document.body, null);

    const div = (
      <div>
        <input />
        <input />
        <button />
      </div>
    );

    const branch = handleComponent(div, undefined, parent, 0);
    commit(collectActions(branch));

    expect(document.body.innerHTML).toBe('<div><input><input><button></button></div>');

    const child1 = branch.children[0];
    const child2 = branch.children[1];
    const child3 = branch.children[2];

    branch.children = [child3, child1, child2];

    createReorderHostElement(child3)();
    expect(document.body.innerHTML).toBe('<div><button></button><input><input></div>');
  });

  it('should reorder branch instance even when nested', () => {
    const parent = createRoot(document.body, null);

    const div = (
      <div>
        <input />
        <input />
        <>
          <button />
        </>
      </div>
    );

    const branch = handleComponent(div, undefined, parent, 0);
    commit(collectActions(branch));

    expect(document.body.innerHTML).toBe('<div><input><input><button></button></div>');

    const child1 = branch.children[0];
    const child2 = branch.children[1];
    const child3 = branch.children[2];

    branch.children = [child3, child1, child2];

    createReorderHostElement(child3.children[0])();
    expect(document.body.innerHTML).toBe('<div><button></button><input><input></div>');
  });
});

describe('createUnmountAction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

  it('should throw when branch is non-host', () => {
    const branch = initBranch() as Branch<string>;

    expect(createUnmountAction(branch)).toThrow(`Cannot unmount a non-host branch.`);
  });

  it('should unmount branch instance', () => {
    const branch = handleComponent<string>('text', undefined, root, 0);

    // mount branch
    createRenderAction(branch)();
    expect(document.body.outerHTML).toBe('<body>text</body>');

    createUnmountAction(branch)();

    expect(branch.status).toBe(BranchStatus.Unmounted);
    expect(document.body.outerHTML).toBe('<body></body>');
  });

  it('should unmount branch even if instance is not in body', () => {
    const branch = handleComponent<string>('text', undefined, root, 0);

    // mount branch
    createRenderAction(branch)();
    expect(document.body.outerHTML).toBe('<body>text</body>');

    // simulate user modifying the element
    removeNode(branch.instance as Element);
    branch.instance = undefined;

    createUnmountAction(branch)();

    expect(branch.status).toBe(BranchStatus.Unmounted);
    expect(document.body.outerHTML).toBe('<body></body>');
  });
});

describe('updateElProps', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should update attribute', () => {
    const parent = createRoot(document.body, null);

    const div = handleComponent<string>(<div class="test" />, undefined, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe(`<div class="test"></div>`);

    const div2 = handleComponent(<div class="test-2" />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe(`<div class="test-2"></div>`);
  });

  it('should add attribute', () => {
    const parent = createRoot(document.body, null);

    const div = handleComponent<string>(<div />, undefined, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe('<div></div>');

    const div2 = handleComponent<string>(<div class="test" />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe(`<div class="test"></div>`);
  });

  it('should remove an attribute', () => {
    const parent = createRoot(document.body, null);

    const div = handleComponent<string>(<div class="test" />, undefined, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe(`<div class="test"></div>`);

    const div2 = handleComponent<string>(<div />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe('<div></div>');
  });

  it('should add event', () => {
    const parent = createRoot(document.body, null);

    const onClick = vitest.fn();

    const div = handleComponent<string>(<div />, undefined, parent, 0);
    createRenderAction(div)();

    const div2 = handleComponent<string>(<div onClick={onClick} />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);

    createElPropsUpdateAction(div, diffs)();

    cast<HTMLElement>(div.instance).click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should update event', () => {
    const parent = createRoot(document.body, null);

    const onClick = vitest.fn();
    const onClick2 = vitest.fn();

    const div = handleComponent<string>(<div onClick={onClick} />, undefined, parent, 0);
    createRenderAction(div)();

    const div2 = handleComponent<string>(<div onClick={onClick2} />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);

    createElPropsUpdateAction(div, diffs)();

    cast<HTMLElement>(div.instance).click();

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onClick2).toHaveBeenCalledOnce();
  });

  it('should remove event', () => {
    const parent = createRoot(document.body, null);

    const onClick = vitest.fn();

    const div = handleComponent<string>(<div onClick={onClick} />, undefined, parent, 0);
    createRenderAction(div)();

    const div2 = handleComponent<string>(<div />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);

    createElPropsUpdateAction(div, diffs)();

    cast<HTMLElement>(div.instance).click();

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});

describe('updateElProps', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should update text', () => {
    const parent = createRoot(document.body, null);

    const div = handleComponent<string>(<div>Hello</div>, undefined, parent, 0);
    commit(collectActions(div));

    expect(document.body.innerHTML).toBe('<div>Hello</div>');

    createTextUpdateAction(div.children[0], 'World')();
    expect(document.body.innerHTML).toBe('<div>World</div>');
  });

  it('should not update text', () => {
    const parent = createRoot(document.body, null);

    const div = handleComponent<string>(<div>Hello</div>, undefined, parent, 0);
    commit(collectActions(div));

    expect(document.body.innerHTML).toBe('<div>Hello</div>');

    createTextUpdateAction(div.children[0], 'Hello')();
    expect(document.body.innerHTML).toBe('<div>Hello</div>');
  });
});
