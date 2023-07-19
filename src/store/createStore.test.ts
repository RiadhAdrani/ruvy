import { describe, it, expect, afterEach } from 'vitest';
import { createStore, getStoreCopy, reset } from './createStore.js';

describe('createStore', () => {
  afterEach(() => {
    reset();
  });

  it('should create a new store', () => {
    createStore('test', 0);

    expect(getStoreCopy()).toStrictEqual({ test: 0 });
  });

  it('should throw when trying to create a store with an existing name', () => {
    createStore('test', 0);

    expect(() => createStore('test', 0)).toThrow();
  });

  it('should get store value', () => {
    const [get] = createStore('test', 0);

    expect(get()).toStrictEqual(0);
  });

  it('should set store value', () => {
    const [get, set] = createStore('test', 0);

    set(1);

    expect(get()).toStrictEqual(1);
  });

  it('reset stores', () => {
    createStore('test', 0);
    createStore('test2', 0);

    reset();

    expect(getStoreCopy()).toStrictEqual({});
  });
});
