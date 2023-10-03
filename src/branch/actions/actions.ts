import { cast, forEachKey, isFunction } from '@riadh-adrani/obj-utils';
import { Callback } from '@riadh-adrani/type-utils';
import {
  ActionType,
  Branch,
  BranchAction,
  BranchStatus,
  BranchTag,
  Effect,
  PropDiff,
  UseRefData,
} from '../types.js';
import { PortalBranchType } from '../components/portal/portal.js';
import {
  assignRef,
  batchedEvent,
  createEvent,
  getClosestChildrenHostBranches,
  getEventName,
  getHostBranchIndexFromHostParent,
  getHtmlElementEventListeners,
  getHtmlElementProps,
  getNamespace,
  getParentHostBranch,
  isHostBranch,
  isValidEventKey,
} from '../utils/index.js';
import {
  DomAttribute,
  changeChildPosition,
  createElement,
  createTextNode,
  injectNode,
  removeAttribute,
  removeEvent,
  removeNode,
  setAttribute,
  setEvent,
  setTextNodeData,
} from '@riadh-adrani/dom-utils';
import { DOMEventHandler } from '../../index.js';
import { getCurrent } from '../../core/core.js';
import { msg } from '../../helpers/alert.js';

/**
 * create an branch action
 * @param type action type
 * @param branch target branch
 * @param data additional data, optional
 */
const createAction = <T = unknown>(type: ActionType, branch: Branch, data?: T): BranchAction => {
  let callback: Callback = () => 0;

  switch (type) {
    case ActionType.Render: {
      callback = createRenderAction(branch as Branch<string>);
      break;
    }
    case ActionType.RenderInnerHTML: {
      callback = createRenderInnerHTMLAction(branch, data as string);
      break;
    }
    case ActionType.Unmount: {
      callback = createUnmountAction(branch as Branch<string>);
      break;
    }
    case ActionType.UpdateProps: {
      callback = createElPropsUpdateAction(branch as Branch<string>, data as Array<PropDiff>);
      break;
    }
    case ActionType.UpdateText: {
      callback = createTextUpdateAction(branch as Branch<string>, data as string);
      break;
    }
    case ActionType.RemoveBranch: {
      callback = createRemoveBranchAction(branch);
      break;
    }
    case ActionType.Reorder: {
      callback = createReorderHostElement(branch);
      break;
    }
    case ActionType.UpdatePortalChildren: {
      callback = createMovePortalChildren(branch as Branch<PortalBranchType>);
      break;
    }
    case ActionType.Mounted: {
      callback = createMountedCallbackAction(branch as Branch<string>, data as Callback);
      break;
    }
    case ActionType.Cleanup:
    case ActionType.Effect: {
      callback = cast<Effect>(data);
      break;
    }
    default: {
      throw msg(`unknown action type "${type}"`);
    }
  }

  if (!callback) {
    callback = () => 0;

    console.warn(
      `Unexpected Input: The creation of an action of type ${type} failed to produce a callback.`
    );
  }

  const action: BranchAction = {
    callback,
    requestTime: Date.now(),
    type,
    debug: branch,
    branch,
  };

  getCurrent().queueAction(action);

  return action;
};

export default createAction;

export const createMountedCallbackAction = (
  branch: Branch<string>,
  callback: (branch: Branch<string>) => void
) => {
  return () => callback(branch);
};

export const createMovePortalChildren = (branch: Branch<PortalBranchType>): Callback => {
  return () => {
    const container = branch.instance as Element;

    // get all direct children branches
    const children = branch.children.map(child => getClosestChildrenHostBranches(child)).flat();

    children.forEach(it => container.appendChild(it.instance as Node));
  };
};

/**
 * removes a branch from parent
 * @param branch target
 */
export const createRemoveBranchAction = (branch: Branch): Callback => {
  return () => {
    const parent = branch.parent;

    if (!parent) {
      throw 'Unable to remove branch: Branch has no parent.';
    }

    parent.children = parent.children.filter(child => child.key !== branch.key);
  };
};

/**
 * creates a rendering action for an element-ish branch
 * @param branch target
 */
export const createRenderAction = (branch: Branch<string>): Callback => {
  return () => {
    // check if branch tag is Text or Element
    if (!isHostBranch(branch)) {
      throw 'Cannot render a non-host branch.';
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

      const eventsWithNoDuplicate: Record<string, DOMEventHandler> = {};

      forEachKey((key, callback) => {
        const cb = batchedEvent(createEvent(key, callback as Callback));

        const newKey = getEventName(key);

        eventsWithNoDuplicate[newKey] = cb;
      }, events);

      // transform events to make them batch updates
      render = createElement(branch.type, { namespace: ns, attributes });

      forEachKey((key, callback) => {
        setEvent(key, callback, render as HTMLElement);
      }, eventsWithNoDuplicate);
    }

    branch.instance = render;
    branch.status = BranchStatus.Mounted;

    const host = getParentHostBranch(branch);

    const { index } = getHostBranchIndexFromHostParent(branch);

    // inject it directly.
    injectNode(render as Element, host.instance as Element, index);

    branch.status = BranchStatus.Mounted;

    assignRef(branch, branch.props);

    // attach branch to dom node
    (render as unknown as Record<string, unknown>)['__ruvy__node__'] = branch;
  };
};

/**
 * create an action to automatically reorder a branch
 * @param branch target
 */
export const createReorderHostElement = (branch: Branch): Callback => {
  return () => {
    const { instance } = branch;

    if (!instance) {
      return;
    }

    const { index } = getHostBranchIndexFromHostParent(branch);

    try {
      changeChildPosition(instance as Element, index);
    } catch (error) {
      // parent destoyed
    }
  };
};

/**
 * create an unmount action callback
 * @param branch target
 */
export const createUnmountAction =
  (branch: Branch<string>): Callback =>
  () => {
    // check if branch tag is Text or Element
    if (!isHostBranch(branch)) {
      throw 'Cannot unmount a non-host branch.';
    }

    try {
      removeNode(branch.instance as Element);
    } catch (error) {
      // node does not exist
    }

    branch.status = BranchStatus.Unmounted;

    // remove reference
    if (branch.props.ref) {
      (branch.props.ref as UseRefData).value = undefined;
    }
  };

/**
 * create an action that will update an branch's instance props
 * @param branch target
 * @param diffs delta list
 */
export const createElPropsUpdateAction = (
  branch: Branch<string>,
  diffs: Array<PropDiff>
): Callback => {
  return () => {
    diffs.forEach(diff => {
      const { op, prop, value } = diff;

      const instance = branch.instance as Element;

      // event
      if (isValidEventKey(prop) && isFunction(value)) {
        const callback = value as Callback;

        const name = getEventName(prop);

        if (op === 'remove') {
          removeEvent(name, instance);
        } else {
          const ev = createEvent(prop, callback);

          setEvent(name, ev, instance);
        }

        return;
      }

      // attribute
      if (op === 'remove') {
        removeAttribute(prop, instance);
      } else {
        setAttribute(prop, value as DomAttribute, instance);
      }
    });
  };
};

/**
 * create an action to update a text node data.
 * @param branch targer
 * @param data text
 */
export const createTextUpdateAction = (branch: Branch, data: string): Callback => {
  return () => setTextNodeData(cast<Text>(branch.instance), data);
};

export const createRenderInnerHTMLAction = (branch: Branch, data: string): Callback => {
  return () => {
    if (!branch.instance) {
      throw '[Ruvy] Unexpected State : cannot set innerHTML of a non-mounted or unmounted branch';
    }

    (branch.instance as HTMLElement).innerHTML = data;
  };
};
