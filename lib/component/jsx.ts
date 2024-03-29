import { ComponentSymbol } from '../types.js';

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
): JSX.Element => {
  // flatten children
  children = children.flat();

  const template = {
    type,
    props: { ...props, children },
    children,
    symbol: ComponentSymbol,
    key: (props?.key as string) ?? undefined,
  };

  return template as JSX.Element;
};

/**
 * creates a fragment template.
 * @param children fragment children
 */
export const createFragmentTemplate = (children: Array<unknown>) => {
  return children;
};

window.createJsxElement = createJsxElement;
window.createJsxFragmentElement = createFragmentTemplate;
