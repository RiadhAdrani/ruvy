import { Callback, areEqual, cast, forEachKey } from "@riadh-adrani/utils";
import Context from "../../context/Context.js";
import { EffectCallback, StateArray } from "../../types/store.js";
import {
  ActionType,
  Branch,
  BranchAction,
  HookData,
  HookType,
  SetEffectData,
  SetEffectParams,
} from "../types/index.js";
import { Core } from "../../core/Core.js";

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

/**
 * create a scoped state.
 * @param initValue initial value
 * @returns [`value`,`setter`,`getter`]
 */
export const setState = <T>(initValue: T): StateArray<T> => {
  return dispatchHook<StateArray<T>>(HookType.State, initValue);
};

/**
 * schedule a callback effect to run once, or every time `deps` changes
 * @param callback effect
 * @param deps dependency
 */
export const setEffect = (callback: EffectCallback, deps?: unknown) => {
  dispatchHook<void, SetEffectParams>(HookType.Effect, { callback, deps: deps ?? undefined });
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
    case HookType.Effect: {
      output = dispatchSetEffect(key, data as SetEffectParams, branch);
      break;
    }
    default: {
      throw `unknown hook (${type}).`;
    }
  }

  return output as R;
};

/**
 * dispatch set Effect hook.
 * @param key hook key
 * @param params effect params
 * @param current branch
 */
export const dispatchSetEffect = (key: string, params: SetEffectParams, current: Branch) => {
  const { callback, deps } = params;

  const createEffect = (cb: EffectCallback) => {
    return () => {
      const hook = cast<HookData<SetEffectData>>(current.hooks[key]);

      const cleanup = cb();

      // reset pending effect
      hook.data.pendingEffect = undefined;

      if (cleanup) {
        const cleanCallback = () => {
          cleanup();

          // reset pending cleanup
          hook.data.cleanUp = undefined;
          hook.data.pendingCleanUp = undefined;
        };

        hook.data.cleanUp = cleanCallback;
      }
    };
  };

  if (!current.hooks[key]) {
    // set up hook
    const pendingEffect = createEffect(callback);

    const data: SetEffectData = { callback, deps, pendingEffect };

    current.hooks[key] = { data, initialData: data, key, type: HookType.Effect };
  } else {
    // we compare deps, if different we schedule a cleanup and a new effect call

    const oldDeps = cast<HookData<SetEffectData>>(current.hooks[key]).data.deps;

    const shouldCallEffect = !areEqual(deps, oldDeps);

    if (shouldCallEffect) {
      const hook = cast<HookData<SetEffectData>>(current.hooks[key]);

      hook.data.callback = callback;
      hook.data.deps = deps;

      if (hook.data.cleanUp) {
        hook.data.pendingCleanUp = hook.data.cleanUp;
      }

      const pendingEffect = createEffect(callback);

      hook.data.pendingEffect = pendingEffect;
    }
  }
};

/**
 * collect any pending effects or cleanups in a branch
 * @param branch target
 */
export const collectEffects = (branch: Branch): Array<BranchAction> => {
  const effects: Array<BranchAction> = [];

  forEachKey((_, hook) => {
    if (hook.type === HookType.Effect) {
      const { data } = cast<HookData<SetEffectData>>(hook);

      if (data.pendingCleanUp) {
        effects.push({
          callback: data.pendingCleanUp,
          requestTime: Date.now(),
          type: ActionType.Cleanup,
        });
      }

      if (data.pendingEffect) {
        effects.push({
          callback: data.pendingEffect,
          requestTime: Date.now(),
          type: ActionType.Effect,
        });
      }
    }
  }, branch.hooks);

  return effects;
};

export const unmountEffects = (branch: Branch) =>
  forEachKey((_, hook) => {
    if (hook.type === HookType.Effect) {
      const { data } = cast<HookData<SetEffectData>>(hook);

      data.pendingEffect = undefined;

      if (data.cleanUp) {
        data.pendingCleanUp = data.cleanUp;
      }
    }
  }, branch.hooks);

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
      Core.singleton.executeRoutine(true);
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
