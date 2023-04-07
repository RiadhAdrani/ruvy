import { cast, isFunction } from "@riadh-adrani/utils";
import {
  ComponentNodeType,
  ComponentSymbol,
  ComponentTemplate,
  ComputedComponent,
  Namespace,
} from "../types/_component.js";
import { resetHooksIndex, useHooksContext } from "./hooks/index.js";
import { CallbackWithArgs } from "../types/common.js";

export const createInitialComponent = <T>({
  parent,
  key,
  memoizedProps,
  elementType,
}: Pick<
  ComputedComponent,
  "parent" | "key" | "elementType" | "memoizedProps"
>): ComputedComponent<T> => {
  return {
    parent,
    key,
    attributes: {},
    children: [],
    memoizedProps,
    elementType,
    elementTag: "div",
    events: {},
    memoizedHooks: {},
    nodeType: ComponentNodeType.Standard,
    ns: Namespace.html,
    symbol: ComponentSymbol,
    instance: undefined,
  } as ComputedComponent<T>;
};

export const createComponentWithTag = <T>(
  templateWithTag: ComponentTemplate
): ComputedComponent<T> => {
  return templateWithTag as unknown as ComputedComponent<T>;
};

export const computeComponent = <T>(
  template: ComponentTemplate,
  parent: ComputedComponent | undefined,
  key: string | number,
  current?: ComputedComponent
): ComputedComponent<T> => {
  const { elementType, props, children } = template;

  // initialize computed component with parent and key
  let computed = createInitialComponent({
    ...template,
    memoizedProps: template.props,
    key,
    parent,
  });

  if (isFunction(elementType)) {
    // if elementType is a function, execute the component callback
    const callback = cast<CallbackWithArgs<[typeof props], ComponentTemplate>>(elementType);

    // execute this callback within a context having
    const res = useHooksContext(() => callback(props), current ?? computed);

    computed = createComponentWithTag(res);
  } else {
    // if elementType is a string, we process it normally

    computed = createComponentWithTag(template);
  }

  // reset hook index
  resetHooksIndex();

  // compute children and add them to the component
  children.forEach((child) => {
    // TODO : process child
    child;
  });

  // return parent
  return computed as ComputedComponent<T>;
};
