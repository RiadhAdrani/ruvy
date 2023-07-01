/** @jsx createJsxElement */

import { createFragmentTemplate, createJsxElement } from '../create/index.js';

import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { initBranch } from '../utils/index.js';
import createRenderAction from './render.js';
import { Branch, BranchStatus, BranchTag, BranchTemplate } from '../types.js';
import { handleComponent } from '../index.js';

createFragmentTemplate;
createJsxElement;

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
