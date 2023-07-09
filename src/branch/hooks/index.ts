import { Callback, hasProperty } from '@riadh-adrani/utils';
import Context from '../../context/Context.js';
import {
  Branch,
  BranchStatus,
  ContextObject,
  HookType,
  UseEffectParams,
  UseMemoParams,
} from '../types.js';
import { dispatchUseState, useState } from './useState/useState.js';
import {
  dispatchUseEffect,
  useEffect,
  collectEffects,
  unmountEffects,
} from './useEffect/useEffect.js';
import { dispatchUseMemo, useMemo, useCallback } from './useMemo/useMemo.js';
import { dispatchUseRef, useRef } from './useRef/useRef.js';
import { useId } from './useId/useId.js';
import { dispatchUseContext, useContext, createContext } from './useContext/useContext.js';
import { dispatchUseReactive, useReactive } from './useReactive/useReactive.js';
import { dispatchUsePromise, usePromise } from './usePromise/usePromise.js';

export {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useId,
  useContext,
  createContext,
  useReactive,
  usePromise,
};

export {
  collectEffects,
  unmountEffects,
  dispatchUseEffect,
  dispatchUseMemo,
  dispatchUseRef,
  dispatchUseState,
};

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

export const dispatchHook = <R = unknown, T = unknown>(type: HookType, data: T): R => {
  const branch = ctx.get();

  if (branch === undefined) {
    throw '[Ruvy] Unexpected Hook Call : cannot use hooks outside of a functional component context.';
  }

  index = index + 1;

  const key = createHookKey(type, index);

  // check if branch is unmounting or unmounted
  if ([BranchStatus.Unmounted, BranchStatus.Unmounting].includes(branch.status)) {
    throw `[Ruvy] Unexpected State: Cannot dispatch hooks on an unmounted branch.`;
  }

  if (branch.status === BranchStatus.Mounted && !hasProperty(branch.hooks, key)) {
    throw `[Ruvy] Unexpected State: Unable to find hook with key (${key})`;
  }

  let output: unknown = undefined;

  switch (type) {
    case HookType.State: {
      output = dispatchUseState(key, data, branch);
      break;
    }
    case HookType.Effect: {
      output = dispatchUseEffect(key, data as UseEffectParams, branch);
      break;
    }
    case HookType.Memo: {
      output = dispatchUseMemo(key, data as UseMemoParams, branch);
      break;
    }
    case HookType.Ref: {
      output = dispatchUseRef(key, data, branch);
      break;
    }
    case HookType.Context: {
      output = dispatchUseContext(key, data as ContextObject, branch);
      break;
    }
    case HookType.Reactive: {
      output = dispatchUseReactive(key, data as object, branch);
      break;
    }
    case HookType.Promise: {
      output = dispatchUsePromise(key, data as Callback<Promise<T>>, branch);
      break;
    }
    default: {
      throw `[Ruvy] Unexpected State: unknown hook (${type}).`;
    }
  }

  return output as R;
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
