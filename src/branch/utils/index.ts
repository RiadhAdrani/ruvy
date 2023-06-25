import {
  Arrayable,
  cast,
  forEachKey,
  hasProperty,
  isArray,
  isBlank,
  isFunction,
  merge,
} from '@riadh-adrani/utils';
import {
  Branch,
  BranchKey,
  BranchProps,
  BranchStatus,
  BranchTag,
  BranchTemplate,
  Namespace,
  UseRefData,
} from '../types.js';
import { DomAttribute, DomEvent, DomEventHandler, isOnEventName } from '@riadh-adrani/dom-utils';
import { isValidTemplate } from '../check/index.js';
import { Outlet } from '../index.js';
import { Any, CallbackWithArgs } from 'src/index.js';
import { Core } from '../../core/Core.js';

/**
 * checks if the given object is a template that contains the `if` directive
 * @param o object
 */
export const hasIfDirective = (o: unknown): boolean => {
  return isValidTemplate(o) && hasProperty((o as Any).props, 'if');
};

/**
 * checks if a template with if directive should be computed.
 * @param template template object
 */
export const shouldTemplateWithIfDirectiveBeComputed = (template: BranchTemplate): boolean => {
  if (!hasIfDirective(template)) {
    throw `[Ruvy] the provided template does not contain an if directive`;
  }

  return template.props.if !== false;
};

/**
 * initialize a branch with the provided data.
 * @param data optional branch data
 */
export const initBranch = <T = unknown>(data?: Partial<Branch<T>>): Branch<T> => {
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

  return merge(initial, (data ?? {}) as Branch<T>) as Branch<T>;
};

/**
 * Webs Namespaces
 */
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
export const IgnoredProps = ['ns', 'children', 'key', 'ref', 'if'];

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
  return [BranchTag.Element, BranchTag.Root, BranchTag.Text, BranchTag.Portal].includes(branch.tag);
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
    throw '[Ruvy] Unable to locate the hosting branch.';
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
export const getClosestChildrenHostBranches = (branch: Branch): Array<Branch> => {
  const out: Array<Branch> = [];

  if (isHostBranch(branch)) {
    return [branch];
  }

  branch.children.forEach(child => out.push(...getClosestChildrenHostBranches(child)));

  return out;
};

export const assignRef = (branch: Branch, props: Record<string, unknown>): void => {
  if (hasProperty(props, 'ref')) {
    (props['ref'] as UseRefData<Node | undefined>).value = branch.instance;
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
  current = isArray(current) ? (current as Array<string>).join(' ') : current;

  return `${current} ${className}`;
};

const CLASS_PREFIX = 'class:';

export const batchedEvent = (
  callback: CallbackWithArgs<[DomEvent], void>
): CallbackWithArgs<[DomEvent], void> => {
  if (!isFunction(callback)) {
    return callback;
  }

  return (ev: DomEvent) => Core.batch(() => callback(ev));
};

/**
 * preprocess props
 * @param initial initial props
 */
export const preprocessProps = (initial: BranchProps): BranchProps => {
  const props: BranchProps = {};

  forEachKey((key, value) => {
    /**
     * append attributes with prefix `class:` and a value of true
     * to the existing class attribute or create one.
     */
    if (key.startsWith(CLASS_PREFIX)) {
      if (value === true) {
        const newClassName = key.substring(CLASS_PREFIX.length);

        // check if it is not empty
        if (!isBlank(newClassName)) {
          if (hasProperty(props, 'class')) {
            props.class = combineClasses(props.class as Arrayable<string>, newClassName);
          } else if (hasProperty(initial, 'class')) {
            initial.class = combineClasses(initial.class as Arrayable<string>, newClassName);
          } else {
            props.class = newClassName;
          }
        }
      }
    } else if (isOnEventName(key)) {
      props[key] = batchedEvent(value as CallbackWithArgs);
    } else {
      props[key] = value;
    }
  }, initial);

  return props;
};

/**
 * recursively find the closest parent with the checker function
 * @param branch current branch
 * @param checker callback returning a boolean
 */
export const findParentWith = (
  branch: Branch,
  checker: (branch: Branch) => boolean
): Branch | undefined => {
  if (!branch.parent) {
    return undefined;
  }

  if (checker(branch.parent)) {
    return branch.parent;
  }

  return findParentWith(branch.parent, checker);
};

/**
 * perform post processing for a given branch.
 *
 * - auto assign `Namespace.SVG` namespace to `svg` element and its children automatically.
 *
 * @param branch target.
 */
export const postprocessProps = (branch: Branch): void => {
  // ? SVG
  // if branch type is svg, we change the namespace to SVG
  // if not, we search for the closest svg namespaced parent
  if (branch.type === 'svg' || findParentWith(branch, it => it.props.ns === Namespace.SVG)) {
    branch.props.ns = Namespace.SVG;
  }
};

/**
 * perform template preprocessing
 *
 * - nullify the template if it has an `if` prop set to `false`.
 *
 * @param template template object
 */
export const preprocessTemplate = (template: unknown): unknown => {
  // ? checks if the given template has an if directive and it should not be computed
  if (
    hasIfDirective(template) &&
    !shouldTemplateWithIfDirectiveBeComputed(template as BranchTemplate)
  ) {
    return null;
  }

  return template;
};
