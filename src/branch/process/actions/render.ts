import { Callback } from "@riadh-adrani/utils";
import { Branch, BranchTag } from "../../types/index.js";
import { createElement, createTextNode, injectNode } from "@riadh-adrani/dom-utils";
import {
  getHtmlElementEventListeners,
  getHtmlElementProps,
  getNamespace,
  getElementHost,
} from "../../utils/index.js";

/**
 * @deprecated
 * @param branch
 */
const createRenderAction = (branch: Branch<string>): Callback => {
  return () => {
    // check if branch tag is Text or Element
    if (![BranchTag.Text, BranchTag.Element].includes(branch.tag)) {
      throw `Cannot render a non-element element.`;
    }

    let render: Node;

    // text or element ?
    const isText = branch.tag === BranchTag.Text;

    if (isText) {
      render = createTextNode(branch.text as string);
    } else {
      const ns = getNamespace(branch);
      const attributes = getHtmlElementProps(branch);
      const events = getHtmlElementEventListeners(branch);

      render = createElement(branch.type, { namespace: ns, attributes, events });
    }

    branch.instance = render;

    const host = getElementHost(branch);

    injectNode(render as Element, host);
  };
};

export default createRenderAction;
