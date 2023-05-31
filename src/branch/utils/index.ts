import {
  Arrayable,
  cast,
  forEachKey,
  hasProperty,
  isArray,
  isBlank,
  isFunction,
  merge,
} from "@riadh-adrani/utils";
import {
  Branch,
  BranchKey,
  BranchProps,
  BranchStatus,
  BranchTag,
  BranchTemplate,
  Namespace,
  UseRefData,
} from "../types.js";
import { DomAttribute, DomEventHandler, isOnEventName } from "@riadh-adrani/dom-utils";
import { isValidTemplate } from "../check/index.js";
import { Outlet } from "../index.js";

export const initBranch = <T = unknown>(data?: Partial<Branch>): Branch<T> => {
  const initial: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounting,
    tag: BranchTag.Null,
    type: BranchTag.Null,
    unmountedChildren: [],
  };

  return merge(initial, data ?? {});
};

export const Namespaces = Object.keys(Namespace).map(
  key => (Namespace as Record<string, string>)[key]
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
export const IgnoredProps = ["ns", "children", "key", "ref"];

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
  return [BranchTag.Element, BranchTag.Root, BranchTag.Text].includes(branch.tag);
};

/**
 * retrieve the closest host element.
 * @param branch current
 */
export const getParentHostBranch = (branch: Branch): Branch => {
  if (branch.parent) {
    if (isHostBranch(branch.parent)) {
      return branch.parent;
    }

    return getParentHostBranch(branch.parent);
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

/**
 * retrieve a branch with a key from a parent
 * @param parent parent branch
 * @param key key
 */
export const getBranchWithKey = <T = unknown>(
  parent: Branch,
  key: BranchKey
): Branch<T> | undefined => {
  return cast<Array<Branch<T>>>(parent.children).find(child => child.key === key);
};

/**
 * get index in dom according to the closest host parent.
 * @param branch target
 */
export const getHostBranchIndexFromHostParent = (
  branch: Branch,
  parent?: Branch
): { index: number; found: boolean } => {
  let idx = 0;
  let wasFound = false;

  const parentHost = parent ?? getParentHostBranch(branch);

  for (const child of parentHost.children) {
    if (wasFound) {
      break;
    }

    if (child === branch) {
      wasFound = true;
      break;
    }

    if (isHostBranch(child)) {
      idx = idx + 1;
      continue;
    } else {
      const { found, index } = getHostBranchIndexFromHostParent(branch, child);

      idx = idx + index;

      if (found) {
        wasFound = true;
        break;
      }
    }
  }

  return { index: idx, found: wasFound };
};

/**
 * retrieve closest host branches of a branch.
 * @param branch starting branch
 */
export const getClosestHostBranches = (branch: Branch): Array<Branch> => {
  const out: Array<Branch> = [];

  if (isHostBranch(branch)) {
    return [branch];
  }

  branch.children.forEach(child => out.push(...getClosestHostBranches(child)));

  return out;
};

export const assignRef = (branch: Branch, props: Record<string, unknown>): void => {
  if (hasProperty(props, "ref")) {
    (props["ref"] as UseRefData<Node | undefined>).value = branch.instance;
  }
};

/**
 * calculate the depth (+1) of an outlet branch
 * @param branch target
 */
export const getOutletDepth = (branch: Branch): number => {
  let depth = 0;

  if (branch.type === Outlet) {
    depth += 1;
  }

  if (branch.parent) {
    depth += getOutletDepth(branch.parent);
  }

  return depth;
};

/**
 * append a new class to the existing one.
 * @param current class name or array of class names
 * @param className new class name
 */
export const combineClasses = (current: Arrayable<string>, className: string): string => {
  current = isArray(current) ? (current as Array<string>).join(" ") : current;

  return `${current} ${className}`;
};

/**
 * preprocess props
 * @param initial initial props
 */
export const preprocessProps = (initial: BranchProps): BranchProps => {
  const props: BranchProps = {};

  const prefix = "class:";

  forEachKey((key, value) => {
    // class:*
    if (key.startsWith(prefix)) {
      if (value === true) {
        const newClassName = key.substring(prefix.length);

        // check if it is not empty
        if (!isBlank(newClassName)) {
          if (hasProperty(props, "class")) {
            props.class = combineClasses(props.class as Arrayable<string>, newClassName);
          } else if (hasProperty(initial, "class")) {
            initial.class = combineClasses(initial.class as Arrayable<string>, newClassName);
          } else {
            props.class = newClassName;
          }
        }
      }
    } else {
      props[key] = value;
    }
  }, initial);

  return props;
};
