import { areEqual, isNull, isObject } from '@riadh-adrani/obj-utils';
import { HookDispatcher, HookType } from '../../types.js';
import { Core } from '../../../core/index.js';
import { Any } from '../../../types/index.js';
import { dispatchHook } from '../index.js';

function reactive<T extends object>(obj: T): T {
  return new Proxy(obj, {
    get(target, key) {
      const value = (target as Record<string, unknown>)[key as string];
      if (isObject(value) && !isNull(value)) {
        return reactive(value as object);
      }
      return value;
    },
    set(target, key, value) {
      const old = (target as Record<string, unknown>)[key as string];

      // check if new value is really different
      // if changed, execute update
      if (!areEqual(old, value)) {
        (target as Record<string, unknown>)[key as string] = value;

        Core.notifyStateUpdated();
      }

      return true;
    },
  });
}

/**
 * create a scoped state that could be updated by setting its value directly.
 * @param value initial object.
 * @returns a reactive version of the object provided.
 * @experimental not fully functional
 */
export const useReactive = <T extends object>(value: T): T => {
  return dispatchHook<T>(HookType.Reactive, value);
};

export const dispatchUseReactive: HookDispatcher<object, Any> = (key, data, current) => {
  if (!current.hooks[key]) {
    if (!isObject(data)) {
      throw '[Ruvy] useReactive accepts only object values.';
    }

    const object = reactive(data);

    current.hooks[key] = {
      data: object,
      initialData: object,
      key,
      type: HookType.Reactive,
    };
  }

  return current.hooks[key].data;
};
