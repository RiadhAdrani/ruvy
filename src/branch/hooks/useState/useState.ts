import { areEqual, isFunction } from '@riadh-adrani/obj-utils';
import {
  SetStateCallback,
  StateArray,
  StateGetter,
  StateInitializer,
} from '../../../store/types.js';
import { HookDispatcher, HookType } from '../../types.js';
import { Core } from '../../../core/core.js';
import { dispatchHook } from '../index.js';

/**
 * create a scoped state.
 * @param initValue initial value, or a callback that returns the initial value.
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
    let value: unknown;

    if (isFunction(data)) {
      // accept state initializer
      const initializer = data as StateInitializer<unknown>;

      value = initializer();
    } else {
      value = data;
    }

    current.hooks[key] = {
      data: value,
      initialData: value,
      key,
      type: HookType.State,
    };
  }

  const value = current.hooks[key].data;

  const setter: StateArray<unknown>[1] = valueOrCallback => {
    let value: unknown;

    if (isFunction(valueOrCallback)) {
      const callback = valueOrCallback as SetStateCallback<unknown>;
      const currentValue = current.hooks[key].data;

      value = callback(currentValue);
    } else {
      value = valueOrCallback;
    }

    if (!areEqual(value, current.hooks[key].data)) {
      current.hooks[key].data = value;

      Core.notifyStateUpdated();
    }
  };

  const getter: StateGetter<unknown> = () => current.hooks[key].data;

  return [value, setter, getter];
};
