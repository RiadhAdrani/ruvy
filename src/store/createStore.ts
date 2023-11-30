import { areEqual, copy, hasProperty } from '@riadh-adrani/obj-utils';
import { StateGetter } from './types.js';
import { Core } from '../core/core.js';

const globalStore: Record<string, unknown> = {};

/**
 * get a copy of the global store.
 */
export const getStoreCopy = () => {
  return copy(globalStore);
};

/**
 * remove all keys from the global store.
 */
export const reset = () => {
  Object.keys(globalStore).forEach(key => {
    delete globalStore[key];
  });
};

/**
 * create a new store with a unique name.
 * @param key globally unique store name
 * @param initialValue initial value
 */
export const createStore = <T>(
  key: string,
  initialValue: T,
): [StateGetter<T>, (value: T) => void] => {
  // check if key exists
  if (hasProperty(globalStore, key)) {
    throw `[Ruvy] Conflict: store with name "${key}" already exists.`;
  }

  globalStore[key] = initialValue;

  const getter: StateGetter<T> = () => globalStore[key] as T;

  const setter: (value: T) => void = value => {
    const current = globalStore[key];

    if (!areEqual(value, current)) {
      globalStore[key] = value;

      Core.notifyStateUpdated();
    }
  };

  return [getter, setter];
};
