import { areEqual, cast, forEachKey } from '@riadh-adrani/utils';
import { EffectCallback } from '../../../store/types.js';
import {
  ActionType,
  Branch,
  BranchAction,
  HookData,
  HookDispatcher,
  HookType,
  UseEffectData,
  UseEffectParams,
} from '../../types.js';
import { dispatchHook } from '../index.js';

/**
 * schedule a callback effect to run once, or every time `deps` changes.
 * @param callback effect
 * @param deps dependencies
 */
export const useEffect = (callback: EffectCallback, deps?: unknown) => {
  dispatchHook<void, UseEffectParams>(HookType.Effect, { callback, deps: deps ?? undefined });
};

/**
 * dispatch set Effect hook.
 * @param key hook key
 * @param params effect params
 * @param current branch
 */
export const dispatchUseEffect: HookDispatcher<UseEffectParams, void> = (key, data, current) => {
  const { callback, deps } = data;

  const createEffect = (cb: EffectCallback) => {
    return () => {
      const hook = cast<HookData<UseEffectData>>(current.hooks[key]);

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

    const data: UseEffectData = { callback, deps, pendingEffect };

    current.hooks[key] = { data, initialData: data, key, type: HookType.Effect };
  } else {
    // we compare deps, if different we schedule a cleanup and a new effect call

    const oldDeps = cast<HookData<UseEffectData>>(current.hooks[key]).data.deps;

    const shouldCallEffect = !areEqual(deps, oldDeps);

    if (shouldCallEffect) {
      const hook = cast<HookData<UseEffectData>>(current.hooks[key]);

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
export const collectEffects = (branch: Branch): Array<Omit<BranchAction, 'requestTime'>> => {
  const effects: Array<Omit<BranchAction, 'requestTime'>> = [];

  forEachKey((_, hook) => {
    if (hook.type === HookType.Effect) {
      const { data } = cast<HookData<UseEffectData>>(hook);

      if (data.pendingCleanUp) {
        effects.push({
          callback: data.pendingCleanUp,
          type: ActionType.Cleanup,
        });
      }

      if (data.pendingEffect) {
        effects.push({
          callback: data.pendingEffect,
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
      const { data } = cast<HookData<UseEffectData>>(hook);

      data.pendingEffect = undefined;

      if (data.cleanUp) {
        data.pendingCleanUp = data.cleanUp;
      }
    }
  }, branch.hooks);
