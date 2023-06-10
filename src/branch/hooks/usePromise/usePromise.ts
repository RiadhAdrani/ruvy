import { Callback } from '@riadh-adrani/utils';
import {
  HookData,
  HookDispatcher,
  HookType,
  UsePromiseData,
  UsePromiseParams,
  UsePromiseReturn,
} from '../../types.js';
import { dispatchHook } from '../index.js';
import { Core } from '../../../core/Core.js';

/**
 * Hook which wraps an asynchronous function or a function that returns a Promise and returns
 * its state corresponding to the execution of the function.
 * @param callback async call
 */
export const usePromise = <T>(callback: Callback<Promise<T>>): UsePromiseReturn<T> => {
  return dispatchHook<UsePromiseReturn<T>>(HookType.Promise, callback);
};

export const runFetch = async <T>(hook: HookData<UsePromiseData<T>>) => {
  if (!['pending', 'refreshing'].includes(hook.data.state)) {
    return;
  }

  try {
    const res = await hook.data.callback();

    hook.data.value = res;
    hook.data.state = 'resolved';
  } catch {
    hook.data.state = 'rejected';
  }

  // notify core
  Core.notifyStateUpdated();
};

export const dispatchUsePromise: HookDispatcher<
  UsePromiseParams<unknown>,
  UsePromiseReturn<unknown>
> = (key, callback, current) => {
  if (!current.hooks[key]) {
    const data: UsePromiseData = {
      callback,
      state: 'pending',
      value: undefined,
    };

    current.hooks[key] = {
      data,
      initialData: data,
      key,
      type: HookType.Promise,
    };

    runFetch(current.hooks[key] as HookData<UsePromiseData>);
  } else {
    (current.hooks[key] as HookData<UsePromiseData>).data.callback = callback;
  }

  const hook = current.hooks[key] as HookData<UsePromiseData>;
  const data = hook.data;

  // create refresh callback
  const refresh: Callback = () => {
    data.state = 'refreshing';

    Core.notifyStateUpdated();

    runFetch(hook);
  };

  const state = data.state;
  const value = data.value;

  return [state, value, refresh];
};
