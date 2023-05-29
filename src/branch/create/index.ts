import { BranchSymbol, BranchTemplate } from "../types.js";

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
  children = children.flat();

  return {
    type,
    props: { ...props, children },
    children,
    symbol: BranchSymbol,
    key: (props?.key as string) ?? undefined,
  };
};

/**
 * creates a fragment template.
 * @param children fragment children
 */
export const createFragmentTemplate = (children: Array<unknown>): Array<unknown> => {
  return children;
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
