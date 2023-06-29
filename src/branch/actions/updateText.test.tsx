/** @jsx createJsxElement */

import { createJsxElement } from '../create/index.js';
import { beforeEach, describe, expect, it } from 'vitest';
import element from '../components/element/element.js';
import root from '../process/new/root.js';
import { collectActions, commit } from '../utils/index.js';
import createTextUpdateAction from './updateText.js';

createJsxElement;

describe('updateElProps', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should update text', () => {
    const parent = root(document.body, null);

    const div = element.create(<div>Hello</div>, parent, 0);
    commit(collectActions(div));

    expect(document.body.innerHTML).toBe('<div>Hello</div>');

    createTextUpdateAction(div.children[0], 'World')();
    expect(document.body.innerHTML).toBe('<div>World</div>');
  });

  it('should not update text', () => {
    const parent = root(document.body, null);

    const div = element.create(<div>Hello</div>, parent, 0);
    commit(collectActions(div));

    expect(document.body.innerHTML).toBe('<div>Hello</div>');

    createTextUpdateAction(div.children[0], 'Hello')();
    expect(document.body.innerHTML).toBe('<div>Hello</div>');
  });
});