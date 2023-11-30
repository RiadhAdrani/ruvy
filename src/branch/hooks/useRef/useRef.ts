import { HookData, HookDispatcher, HookType, UseRefData } from '../../types.js';
import { dispatchHook } from '../index.js';

/**
 * stores a reference to a variable
 * @param value variable
 */
export const useRef = <T = unknown>(value?: T): UseRefData<T | undefined> => {
  return dispatchHook<UseRefData<T>, T | undefined>(HookType.Ref, value ?? undefined);
};

export const dispatchUseRef: HookDispatcher<unknown, UseRefData<unknown>> = (
  key,
  value,
  current
) => {
  if (!current.hooks[key]) {
    const ref: HookData<UseRefData<unknown>> = {
      data: { value },
      initialData: { value },
      key,
      type: HookType.Ref,
    };

    current.hooks[key] = ref;
  }

  return current.hooks[key].data as UseRefData<unknown>;
};
