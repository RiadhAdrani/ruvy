import { BranchSymbol, BranchTag, BranchTemplate } from "../types/index.js";

/**
 * @deprecated
 */
export const createJsxElement = (
  type: unknown,
  props: Record<string, unknown>,
  ...children: Array<unknown>
): BranchTemplate => {
  return { children, props, type, symbol: BranchSymbol, key: (props.key as string) ?? undefined };
};

/**
 * @deprecated
 */
export const createJsxFragment = (_: unknown, ...children: Array<unknown>): BranchTemplate => {
  return { children, props: {}, symbol: BranchSymbol, type: BranchTag.Fragment };
};
