import { BranchSymbol, BranchTag, BranchTemplate } from "../types/index.js";

/**
 * creates a component template.
 * @param type component type
 * @param props component props
 * @param children component children
 */
export const createTemplate = <T = unknown>(
  type: T,
  props: Record<string, unknown>,
  children: Array<unknown>
): BranchTemplate<T> => {
  return { type, props, children, symbol: BranchSymbol, key: (props.key as string) ?? undefined };
};

/**
 * creates a fragment template.
 * @param children fragment children
 */
export const createFragmentTemplate = (children: Array<unknown>): BranchTemplate => {
  return createTemplate(BranchTag.Fragment, {}, children);
};

/**
 * creates a jsx element.
 * @param children children
 * @param props element props
 * @param type element type
 */
export const createJsxElement = (
  type: unknown,
  props: Record<string, unknown>,
  ...children: Array<unknown>
): BranchTemplate => {
  return createTemplate(type, props ?? {}, children);
};
