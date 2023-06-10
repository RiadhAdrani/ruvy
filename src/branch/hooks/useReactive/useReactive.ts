import { Callback, ReactiveArray, cast, forEachKey, isArray, isObject } from '@riadh-adrani/utils';
import { HookDispatcher, HookType } from '../../types.js';
import { Core } from '../../../core/index.js';
import { Any } from '../../../types/index.js';
import { dispatchHook } from '../index.js';

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
    const object = createReactiveObject(data, () => Core.singleton.onStateUpdate());

    current.hooks[key] = {
      data: object,
      initialData: object,
      key,
      type: HookType.Reactive,
    };
  }

  return current.hooks[key].data;
};
