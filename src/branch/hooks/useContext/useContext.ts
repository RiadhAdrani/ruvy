import { areEqual } from '@riadh-adrani/utils';
import { createTemplate } from '../../create/index.js';
import {
  Branch,
  BranchTag,
  ContextComponentProps,
  ContextObject,
  HookDispatcher,
  HookType,
} from '../../types.js';
import { Any } from '../../../types/index.js';
import { dispatchHook } from '../index.js';
import { findParentWith } from '../../utils/index.js';

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
    createContextComponent<T>({
      value,
      children,
      initial: initial as unknown as T,
      object: object as unknown as ContextObject<T>,
    });

  object.Provider = Provider;

  return object;
};

export const createContextComponent = <T>({
  value,
  children,
  object,
  initial,
}: ContextComponentProps<T> & { object: ContextObject<T>; initial: T }) => {
  return createTemplate<BranchTag.Context>(
    BranchTag.Context,
    { value, initial, object },
    children ?? []
  );
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
  const contextBranch = getClosestContextBranch(current, data);

  // throw if not found
  if (!contextBranch) {
    throw 'Unexpected State: useContext used outside of Context';
  }

  return contextBranch.props.value;
};

/**
 * retrieve the closest parent with the given context object
 * @param branch parent branch
 * @param object context object
 * @returns
 */
export const getClosestContextBranch = (
  branch: Branch,
  object: ContextObject
): Branch | undefined => {
  return findParentWith(
    branch,
    it => it.type === BranchTag.Context && areEqual(it.props.object, object)
  );
};
