import { BranchSymbol, BranchTag, BranchTemplate } from "../types/index.js";

/**
 * @deprecated creates a component template.
 * @param type component type
 * @param props component props
 * @param children component children
 */
export const createTemplate = (
  type: unknown,
  props: Record<string, unknown>,
  children: Array<unknown>
): BranchTemplate => {
  return { type, props, children, symbol: BranchSymbol, key: (props.key as string) ?? undefined };
};

/**
 * @deprecated
 */
export const createJsxElement = (
  type: unknown,
  props: Record<string, unknown>,
  ...children: Array<unknown>
): BranchTemplate => {
  return createTemplate(type, props, children);
};

/**
 * @deprecated
 */
export const createJsxFragment = (_: unknown, ...children: Array<unknown>): BranchTemplate => {
  return createTemplate(BranchTag.Fragment, {}, children);
};
