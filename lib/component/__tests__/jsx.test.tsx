import { describe, expect, it } from 'vitest';
import { createFragmentTemplate, createJsxElement } from '../jsx.js';
import { ComponentSymbol } from '@/types.js';

describe('createJsxElement', () => {
  it('should add symbol', () => {
    const el = createJsxElement('div', {});

    expect(el.symbol).toBe(ComponentSymbol);
  });

  it('should add children to props', () => {
    const el = createJsxElement('div', {});

    expect(el.props.children).toStrictEqual([]);
  });

  it('should set key from props', () => {
    const el = createJsxElement('div', { key: 1 });

    expect(el.key).toStrictEqual(1);
  });

  it('should set key to undefined if non-existing', () => {
    const el = createJsxElement('div', {});

    expect(el.key).toStrictEqual(undefined);
  });
});

describe('createFragmentTemplate', () => {
  it('should return children as they are', () => {
    const el = createFragmentTemplate([1, 2, 3]);

    expect(el).toStrictEqual([1, 2, 3]);
  });
});
