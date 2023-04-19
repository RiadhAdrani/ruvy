import { cast, forEachKey, isFunction, merge } from "@riadh-adrani/utils";
import {
  Branch,
  BranchKey,
  BranchStatus,
  BranchTag,
  BranchTemplate,
  Namespace,
} from "../types/index.js";
import { DomAttribute, DomEventHandler, isOnEventName } from "@riadh-adrani/dom-utils";
import { isValidTemplate } from "../check/index.js";

export const initBranch = <T = unknown>(data?: Partial<Branch>): Branch<T> => {
  const initial: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Pending,
    tag: BranchTag.Null,
    type: BranchTag.Null,
  };

  return merge(initial, data ?? {});
};

export const Namespaces = Object.keys(Namespace).map(
  (key) => (Namespace as Record<string, string>)[key]
) as Array<Namespace>;

/**
 * retrieve namespace from `ns` prop.
 * @param branch branch
 */
export const getNamespace = (branch: Branch): Namespace => {
  return Namespaces.includes(branch.props.ns as Namespace)
    ? (branch.props.ns as Namespace)
    : Namespace.HTML;
};

/**
 * Ignored props, which should not be rendered into the DOM.
 */
export const IgnoredProps = ["ns", "children", "key"];

/**
 * create an object of html attributes from the branch props.
 * @param branch branch
 */
export const getHtmlElementProps = (branch: Branch): Record<string, DomAttribute> => {
  const props: Record<string, DomAttribute> = {};

  forEachKey((key, value) => {
    if (IgnoredProps.includes(key) || isOnEventName(key)) {
      return;
    }

    props[key] = value as DomAttribute;
  }, branch.props);

  return props;
};

/**
 * create an object of event listeners from the branch props.
 * @param branch branch
 */
export const getHtmlElementEventListeners = (branch: Branch): Record<string, DomEventHandler> => {
  const events: Record<string, DomEventHandler> = {};

  forEachKey((key, value) => {
    if (isOnEventName(key) && isFunction(value)) {
      events[key] = value as DomEventHandler;
    }
  }, branch.props);

  return events;
};

/**
 * checks if a branch is a host element.
 * @param branch branch
 */
export const isHostBranch = (branch: Branch): boolean => {
  return [BranchTag.Element, BranchTag.Root].includes(branch.tag);
};

/**
 * retrieve the closest host element.
 * @param branch current
 */
export const getElementHost = (branch: Branch): Element => {
  if (branch.parent) {
    if (isHostBranch(branch.parent)) {
      return branch.parent.instance as Element;
    }

    return getElementHost(branch.parent);
  } else {
    throw "Unable to locate the hosting branch.";
  }
};

/**
 * compute the correct key from a template or return the index otherwise.
 * @param template child
 * @param index index in parent
 */
export const getCorrectKey = (template: unknown, index: number): BranchKey => {
  return isValidTemplate(template) ? cast<BranchTemplate>(template).key ?? index : index;
};
