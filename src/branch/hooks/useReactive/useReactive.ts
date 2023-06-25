import { createReactive, isObject } from '@riadh-adrani/utils';
import { HookDispatcher, HookType } from '../../types.js';
import { Core } from '../../../core/index.js';
import { Any } from '../../../types/index.js';
import { dispatchHook } from '../index.js';

/**
 * create a scoped state that could be updated by setting its value directly.
 * @param value initial object.
 * @returns a reactive version of the object provided.
 */
export const useReactive = <T extends object>(value: T): T => {
  return dispatchHook<T>(HookType.Reactive, value);
};

export const dispatchUseReactive: HookDispatcher<object, Any> = (key, data, current) => {
  if (!current.hooks[key]) {
    if (!isObject(data)) {
      throw '[Ruvy] useReactive accepts only object values.';
    }

    const object = createReactive(data, () => Core.notifyStateUpdated());

    current.hooks[key] = {
      data: object,
      initialData: object,
      key,
      type: HookType.Reactive,
    };
  }

  return current.hooks[key].data;
};
