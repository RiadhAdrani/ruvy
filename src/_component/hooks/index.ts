import { Callback, areEqual, cast } from "@riadh-adrani/utils";
import { Core } from "../../core/Core.js";
import { ComputedComponent, HookType, MemoizedHook } from "../../types/_component.js";
import { StateArray } from "../../types/store.js";
import { getComponentParentPath } from "../utils/index.js";
import Context from "../../context/Context.js";

let hookIndex = 0;

const context = new Context<ComputedComponent<unknown>>();

export const createHookKey = (
  type: HookType,
  index: number,
  component: ComputedComponent<unknown>
): string => {
  const path = getComponentParentPath(component)
    .map((key) => `[${key}]`)
    .join("-");

  return `[${type}]-[${index}]-${path}`;
};

export const resetHooksIndex = () => {
  hookIndex = 0;
};

export const dispatchHook = <T = unknown>(type: HookType, initialValue: T): StateArray<T> => {
  // get component
  const component = cast<ComputedComponent<T>>(context.get());

  if (!component) {
    throw "Cannot dispatch hook outside a functional component.";
  }

  const index = hookIndex;

  const key = createHookKey(type, index, component);
  const current: MemoizedHook | undefined = component.memoizedHooks[key];

  let stateArray = [] as unknown as StateArray<T>;

  // if no current, we create a new state in the store
  if (!current) {
    if (index === 0) {
      component.memoizedHooks[key] = { index, initialValue, key, type };

      stateArray = Core.singleton.store.setItem(type, key, initialValue);
    } else {
      throw `Number of hooks changed between renders`;
    }
  }

  // if current, we compare initial value with the current one
  // if different, we throw
  if (current) {
    if (!areEqual(initialValue, current.initialValue)) {
      current.initialValue = initialValue;

      stateArray = Core.singleton.store.setItem(type, key, initialValue);
    } else {
      // otherwise we use the memoized hook
      stateArray = Core.singleton.store.getItem(type, key);
    }
  }

  hookIndex = hookIndex + 1;

  return stateArray;
};

export const useHooksContext = <T>(
  callback: Callback<T>,
  component: ComputedComponent<unknown>
) => {
  return context.use(callback, component);
};
