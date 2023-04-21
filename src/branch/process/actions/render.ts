import { Callback } from "@riadh-adrani/utils";
import { Branch, BranchStatus, BranchTag } from "../../types/index.js";
import {
  createElement,
  createTextNode,
  injectNode,
  replaceNodeWith,
} from "@riadh-adrani/dom-utils";
import {
  getChildHostBranch,
  getHostBranchIndexFromHostParent,
  getHtmlElementEventListeners,
  getHtmlElementProps,
  getNamespace,
  getParentHostBranch,
  isHostBranch,
} from "../../utils/index.js";

/**
 * creates a rendering action for an element-ish branch
 * @param branch target
 */
const createRenderAction = (branch: Branch<string>): Callback => {
  return () => {
    // check if branch tag is Text or Element
    if (!isHostBranch(branch)) {
      throw `Cannot render a non-host branch.`;
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
    branch.status = BranchStatus.Mounted;

    let host = getParentHostBranch(branch);

    const existingHostBranch = branch.old ? getChildHostBranch(branch.old) : undefined;

    if (existingHostBranch) {
      replaceNodeWith(existingHostBranch.instance as Element, render as Element);
    } else {
      const { index } = getHostBranchIndexFromHostParent(branch);

      // inject it directly.
      injectNode(render as Element, host.instance as Element, index);
    }
  };
};

export default createRenderAction;
