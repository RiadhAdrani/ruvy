import { Callback, ReactiveArray, cast, forEachKey, isArray, isObject } from '@riadh-adrani/utils';
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

export const createReactiveObject = <T extends object>(object: T, onValueChanged: Callback): T => {
  forEachKey((key, value) => {
    if (isObject(value)) {
      (object[key] as unknown) = createReactiveObject(value as object, onValueChanged);
    }
  }, object);

  let proxied = new Proxy<T>(object, {
    get: (current, key) => {
      return (current as Record<string | symbol, unknown>)[key];
    },
    set: (target, key, newValue) => {
      let transformed: Any = newValue;

      if (isObject(newValue)) {
        transformed = createReactiveObject(newValue, onValueChanged);
      }

      cast<Record<string | symbol, unknown>>(target)[key] = transformed;

      onValueChanged();

      return true;
    },
  });

  if (isArray(proxied)) {
    proxied = new ReactiveArray(proxied as Array<unknown>, onValueChanged) as T;
  }

  return proxied;
};

export const dispatchUseReactive: HookDispatcher<object, Any> = (key, data, current) => {
  if (!current.hooks[key]) {
    if (!isObject(data)) {
      throw '[Ruvy] useReactive accepts only object values.';
    }

    const object = createReactiveObject(data, () => Core.notifyStateUpdated());

    current.hooks[key] = {
      data: object,
      initialData: object,
      key,
      type: HookType.Reactive,
    };
  }

  return current.hooks[key].data;
};
