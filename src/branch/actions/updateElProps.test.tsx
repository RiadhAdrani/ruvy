/** @jsx createJsxElement */

import { createJsxElement } from '../create/index.js';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { diffElementProps } from '../components/element/element.js';
import root from '../components/root/root.js';
import createRenderAction from './render.js';
import createElPropsUpdateAction from './updateElProps.js';
import { cast } from '@riadh-adrani/utils';
import { handleComponent } from '../index.js';

createJsxElement;

describe('updateElProps', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should update attribute', () => {
    const parent = root(document.body, null);

    const div = handleComponent<string>(<div class="test" />, undefined, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe(`<div class="test"></div>`);

    const div2 = handleComponent(<div class="test-2" />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe(`<div class="test-2"></div>`);
  });

  it('should add attribute', () => {
    const parent = root(document.body, null);

    const div = handleComponent<string>(<div />, undefined, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe('<div></div>');

    const div2 = handleComponent<string>(<div class="test" />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe(`<div class="test"></div>`);
  });

  it('should remove an attribute', () => {
    const parent = root(document.body, null);

    const div = handleComponent<string>(<div class="test" />, undefined, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe(`<div class="test"></div>`);

    const div2 = handleComponent<string>(<div />, undefined, parent, 0);
    const diffs = diffElementProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe('<div></div>');
  });

  it('should add event', () => {
    const parent = root(document.body, null);

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
    const parent = root(document.body, null);

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
    const parent = root(document.body, null);

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
