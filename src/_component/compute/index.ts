import { cast, forEachKey, isBlank, isFunction, isString } from "@riadh-adrani/utils";
import { ComponentNodeType, ComponentTemplate, ComputedComponent } from "../../types/_component.js";
import { createTextComponent, initComputedComponent } from "../create/index.js";
import { isComponentTemplate, isTemplateChild } from "../is/index.js";
import { useHooksContext } from "../hooks/index.js";
import { CallbackWithArgs } from "../../types/common.js";
import { DomAttribute, DomEvent, isOnEventName } from "@riadh-adrani/dom-utils";
import { Core } from "../../core/Core.js";

/**
 * @untested
 * @deprecated
 */
export const computeComponent = <T>(
  template: unknown,
  parent?: ComputedComponent<T>,
  key?: string | number
): ComputedComponent<T> | undefined => {
  // if not valid, we return undefined
  if (!isTemplateChild(template)) {
    return undefined;
  }

  // if is not a component template, we return a text node
  if (!isComponentTemplate(template)) {
    return createTextComponent(template, parent, key) as unknown as ComputedComponent<T>;
  }

  // we have a valid component template
  const { children, elementType, props } = template as ComponentTemplate;

  const computed = initComputedComponent<T>({ elementType, parent, key, memoizedProps: props });

  // if a function we execute it inside the hooks context
  if (isFunction(elementType)) {
    const callback = cast<CallbackWithArgs<[typeof props], ComputedComponent<T>>>(elementType);

    const res = useHooksContext(() => callback(props), computed);

    // TODO : create a component with the callback as elementType
    return;
  }
  // else we process its elementType, attribute, events and children
  else if (isString(elementType)) {
    const tag = elementType as string;

    if (isBlank(tag)) {
      throw `Component tag (${tag}) is not valid`;
    }

    forEachKey((key, value) => {
      if (key === "tag") {
        computed.elementType = value as string;
        return;
      }

      if (key === "ns") {
        computed.elementType = value as ComponentNodeType;
        return;
      }

      if (isFunction(value) && isOnEventName(key)) {
        const callback = cast<CallbackWithArgs<[unknown]>>(value);

        const eventCallback = (e: unknown) =>
          Core.singleton.batchContext.use(
            () => callback(e),
            true,
            () => {
              if (Core.singleton.shouldUpdate) {
                Core.singleton.executeRoutine();
              }
            }
          );

        computed.events[key] = eventCallback as unknown as DomEvent;
        return;
      }

      computed.attributes[key] = value as DomAttribute;
    }, props);
  } else {
    throw "invalid element type";
  }

  // TODO : merge props children and slot children ?
  const $children = children;

  const computedChildren = $children.map((child, index) =>
    computeComponent<T>(child, computed, index)
  );

  computed.children = computedChildren as Array<ComputedComponent<Node>>;

  return computed as ComputedComponent<T>;
};
