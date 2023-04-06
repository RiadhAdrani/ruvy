import { ComponentSymbol, ComponentTemplate, ComponentType } from "../../types/_component.js";

export const createJsxElement = (
  elementType: ComponentType,
  props: Record<string, unknown>,
  ...children: Array<unknown>
): ComponentTemplate => {
  children = children.flat(Infinity);

  return { children, elementType, props, symbol: ComponentSymbol };
};

export const createJsxFragmentElement = (
  _: unknown,
  ...children: Array<unknown>
): Array<unknown> => {
  return children.flat(Infinity);
};
