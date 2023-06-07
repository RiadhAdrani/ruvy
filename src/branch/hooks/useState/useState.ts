import { areEqual } from '@riadh-adrani/utils';
import { StateArray } from '../../../store/types.js';
import { HookDispatcher, HookType } from '../../types.js';
import { Core } from '../../../core/Core.js';
import { dispatchHook } from '../index.js';

/**
 * create a scoped state.
 * @param initValue initial value
 * @returns [`value`,`setter`,`getter`]
 */
export const useState = <T>(initValue: T): StateArray<T> => {
  return dispatchHook<StateArray<T>>(HookType.State, initValue);
};

/**
 * dispatch set state hook.
 * @param key hook key, should be auto-created by `dispatchHook` method.
 * @param data data to be stored.
 * @param current current value.
 */
export const dispatchUseState: HookDispatcher<unknown, StateArray<unknown>> = (
  key,
  data,
  current
) => {
  if (!current.hooks[key]) {
    current.hooks[key] = {
      data,
      initialData: data,
      key,
      type: HookType.State,
    };
  }

  const value = current.hooks[key].data;

  const setter = (value: unknown) => {
    if (!areEqual(value, current.hooks[key].data)) {
      current.hooks[key].data = value;

      Core.singleton.onStateUpdate();
    }
  };

  const getter = () => current.hooks[key].data;

  return [value, setter, getter];
};
