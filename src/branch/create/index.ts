import { BranchSymbol, BranchTag, BranchTemplate } from '../types.js';
import { getCorrectElementTag, getTag } from '../utils/index.js';

/**
 * creates a component template.
 * @param type component type
 * @param props component props
 * @param children component children
 */
export const createTemplate = <T = unknown>(
  type: T,
  props: Record<string, unknown>,
  children: Array<unknown>,
): BranchTemplate<T> => {
  // flatten children
  children = children.flat();

  const template: BranchTemplate<T> = {
    type,
    props: { ...props, children },
    children,
    symbol: BranchSymbol,
    key: (props?.key as string) ?? undefined,
  };

  if (getTag(template) === BranchTag.Element) {
    // check if there is a 'dom:tag' property
    template.type = getCorrectElementTag(template as BranchTemplate<string>) as T;
  }

  return template;
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
