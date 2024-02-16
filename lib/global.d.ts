import { JsxTemplate } from './types.ts';
import type { CommonJSXAttributes, JSXElements } from './dom.types.js';

declare global {
  function createJsxElement(
    type: unknown,
    props: Record<string, unknown>,
    ...children: Array<unknown>
  ): JSX.Element;

  function createJsxFragmentElement(children: Array<unknown>): Array<unknown>;

  namespace JSX {
    type Element = JsxTemplate;

    type IntrinsicAttributes = CommonJSXAttributes;

    type IntrinsicElements = JSXElements;
  }
}
