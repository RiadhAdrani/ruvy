import { merge } from "@riadh-adrani/utils";
import {
  ComponentNodeType,
  ComponentSymbol,
  ComputedComponent,
  ComputedTextComponent,
  Namespace,
} from "../../types/_component.js";

/**
 * @untested
 * @deprecated
 */
export const initComputedComponent = <T>(
  component?: Partial<ComputedComponent<T>>
): ComputedComponent<T> => {
  const empty: ComputedComponent<T> = {
    attributes: {},
    children: [],
    elementType: "div",
    events: {},
    key: 0,
    memoizedHooks: {},
    memoizedProps: {},
    nodeType: ComponentNodeType.Standard,
    ns: Namespace.html,
    symbol: ComponentSymbol,
    parent: undefined,
    instance: undefined,
  };

  return merge<Partial<ComputedComponent<T>>, ComputedComponent<T>>(empty, { ...component });
};

/**
 * @untested
 * @deprecated
 */
export const createTextComponent = (
  data: unknown,
  parent?: ComputedComponent<unknown>,
  key?: string | number
): ComputedTextComponent => {
  return {
    attributes: {},
    children: [],
    elementType: ComponentNodeType.Text,
    data: `${data}`,
    events: {},
    key: key ?? 0,
    memoizedHooks: {},
    memoizedProps: {},
    nodeType: ComponentNodeType.Text,
    ns: Namespace.html,
    symbol: ComponentSymbol,
    instance: undefined,
    parent,
  };
};
