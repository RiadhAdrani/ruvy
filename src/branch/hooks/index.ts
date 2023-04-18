import { Callback, areEqual } from "@riadh-adrani/utils";
import Context from "../../context/Context.js";
import { StateArray } from "../../types/store.js";
import { Branch, HookType } from "../types/index.js";

let index = -1;

export const ctx = new Context<Branch>();

/**
 * create a hook key with the given type and index
 * @param type hook type
 * @param index hook index
 */
export const createHookKey = (type: HookType, index: number): string => {
  return `${type}@${index}`;
};

export const setState = <T>(initValue: T): StateArray<T> => {
  return dispatchHook<StateArray<T>>(HookType.State, initValue);
};

/**
 * @deprecated
 */
export const dispatchHook = <R = unknown, T = unknown>(type: HookType, data: T): R => {
  const branch = ctx.get();

  if (branch === undefined) {
    throw "cannot use hooks outside of a functional component context.";
  }

  index = index + 1;

  const key = createHookKey(type, index);

  let output: unknown = undefined;

  switch (type) {
    case HookType.State: {
      output = dispatchSetState(key, data, branch);
      break;
    }
    default: {
      throw `unknown hook (${type}).`;
    }
  }

  return output as R;
};

/**
 * dispatch set state hook.
 * @param key hook key, should be auto-created by `dispatchHook` method.
 * @param data data to be stored.
 * @param current current value.
 */
export const dispatchSetState = <T = unknown>(
  key: string,
  data: T,
  current: Branch
): StateArray<T> => {
  if (!current.hooks[key]) {
    current.hooks[key] = {
      data,
      initialData: data,
      key,
      type: HookType.State,
    };
  }

  const value = current.hooks[key].data as T;

  const setter = (value: T) => {
    if (!areEqual(value, current.hooks[key].data)) {
      current.hooks[key].data = value;
      // TODO : notify of update if changed
    }
  };

  const getter = () => current.hooks[key].data as T;

  return [value, setter, getter];
};

/**
 * execute a callback within a branch context.
 * @param callback action
 * @param branch current branch
 */
export const useHooksContext = <R>(callback: Callback<R>, branch: Branch): R => {
  return ctx.use(callback, branch, () => {
    index = -1;
  });
};
