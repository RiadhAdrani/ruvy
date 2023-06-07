import { areEqual, cast } from '@riadh-adrani/utils';
import { HookData, HookDispatcher, HookType, UseMemoData, UseMemoParams } from '../../types.js';
import { dispatchHook } from '../index.js';

/**
 * perform memoization of a computation and update it when `deps` changes.
 * @param callback computation
 * @param deps dependencies
 */
export const useMemo = <T = unknown>(callback: () => T, deps?: unknown): T => {
  return dispatchHook<T, UseMemoParams>(HookType.Memo, {
    callback,
    deps: deps ?? undefined,
  });
};

/**
 * perform memoization of a callback and update it when `deps` changes.
 * @param callback function
 * @param deps dependencies
 */
export const useCallback = <T>(callback: T, deps?: unknown): T => {
  return useMemo(() => callback, deps);
};

/**
 * dispatch setMemo hook.
 * @param key hook key, should be auto-created by `dispatchHook` method.
 * @param data data to be stored.
 * @param current current value.
 */
export const dispatchUseMemo: HookDispatcher<UseMemoParams<unknown>, unknown> = (
  key,
  data,
  current
) => {
  const { callback, deps } = data;

  if (!current.hooks[key]) {
    const value = callback();

    const memoized: HookData<UseMemoData> = {
      data: { value, deps },
      initialData: { value, deps },
      key,
      type: HookType.Memo,
    };

    current.hooks[key] = memoized;
  } else {
    const hook = cast<UseMemoData>(current.hooks[key].data);

    // check if deps changed
    const didChange = !areEqual(deps, hook.deps);

    // if changed we perform callback and update the value and deps
    if (didChange) {
      const value = callback();

      hook.value = value;
      hook.deps = deps;
    }
  }

  return cast<UseMemoData<unknown>>(current.hooks[key].data).value;
};
