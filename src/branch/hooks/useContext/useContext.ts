import { areEqual } from "@riadh-adrani/utils";
import { createTemplate } from "../../create/index.js";
import {
  Branch,
  BranchTag,
  ContextComponentProps,
  ContextObject,
  HookDispatcher,
  HookType,
} from "../../types.js";
import { Any } from "../../../types/index.js";
import { dispatchHook } from "../index.js";

/**
 * create a `Context Object` with a `Provider`
 * that let's you wrap components
 * and allow the retrieval of the context value
 * via `useContext`
 * @param initial initial value
 */
export const createContext = <T = unknown>(initial: T): ContextObject<T> => {
  const object: ContextObject<T> = {
    Provider: null as Any,
  };

  const Provider = <T = unknown>({ value, children }: ContextComponentProps<T>) =>
    createTemplate<BranchTag.Context>(
      BranchTag.Context,
      { value, initial, object },
      children ?? []
    );

  object.Provider = Provider;

  return object;
};

/**
 * retrieve the closest context value with the given object.
 * @param object object returned from the `createContext` method.
 */
export const useContext = <T = unknown>(object: ContextObject<T>): T => {
  return dispatchHook<T>(HookType.Context, object);
};

/**
 * dispatch set Context hook.
 * @param key hook key
 * @param params context object
 * @param current branch
 */
export const dispatchUseContext: HookDispatcher<ContextObject<unknown>, unknown> = (
  key,
  data,
  current
) => {
  if (!current.hooks[key]) {
    current.hooks[key] = {
      data,
      initialData: data,
      key,
      type: HookType.Context,
    };
  }

  // get closest Context branch with object
  const contextBranch = getClosestContextBranch(current.parent, data);

  // throw if not found
  if (!contextBranch) {
    throw "Unexpected State: useContext used outside of Context";
  }

  return contextBranch.props.value;
};

/**
 * @deprecated
 * @param parent
 * @param object
 * @returns
 */
export const getClosestContextBranch = (
  parent: Branch | undefined,
  object: ContextObject
): Branch | undefined => {
  if (!parent) {
    return undefined;
  }

  if (parent.type === BranchTag.Context && areEqual(parent.props.object, object)) {
    return parent;
  }

  return getClosestContextBranch(parent.parent, object);
};
