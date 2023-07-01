import { isUndefined } from '@riadh-adrani/utils';
import { Branch, ComponentFunctionHandler, FragmentType } from '../types.js';
import { collectPendingEffect, getCorrectKey, getTag } from '../utils/index.js';
import { haveSameTagAndType } from '../utils/index.js';
import {
  ActionType,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateFragment,
  BranchTemplateFunction,
} from '../types.js';
import {
  getClosestChildrenHostBranches,
  getBranchWithKey,
  preprocessChildren,
} from '../utils/index.js';
import createAction from '../actions/index.js';
import { unmountBranch } from '../utils/index.js';
import contextComponentHandler, { handleContextComponent } from '../components/context/context.js';
import elementComponentHandler, { handleElementComponent } from '../components/element/element.js';
import fragmentComponentHandler, {
  handleFragmentComponent,
} from '../components/fragment/fragment.js';
import callableComponentHandler, { handleCallable } from '../components/callable/callable.js';
import outletComponentHandler, { handleOutletComponent } from '../components/outlet/outlet.js';
import portalComponentHandler, {
  handlePortalComponent,
  type PortalBranchType,
} from '../components/portal/portal.js';
import textComponentHandler, { handleTextComponent } from '../components/text/text.js';
import { createFragmentTemplate } from '../index.js';
import emptyComponentHandler, { handleEmptyComponent } from './empty/empty.js';

export const handleTemplate = (
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  index: number
): Branch => {
  const $key = getCorrectKey(template, index);

  const out = isUndefined(current)
    ? createNewBranch(template, parent, $key)
    : diffBranches(template, current as Branch, parent, index);

  // check if output children have duplicate keys
  const keys = out.children.map(item => item.key);
  const unique = new Set(keys);

  if (unique.size !== keys.length) {
    throw '[Ruvy] unexpected duplicate key';
  }

  return out;
};

/**
 * process a template with its corresponding branch if it exist
 * @param template new template
 * @param current existing branch
 * @param parent parent branch
 * @param index index in parent
 */
export const process = (
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  index: number
): Branch => {
  const $key = getCorrectKey(template, index);

  const out = isUndefined(current)
    ? createNewBranch(template, parent, $key)
    : diffBranches(template, current as Branch, parent, index);

  // check if output children have duplicate keys
  const keys = out.children.map(item => item.key);
  const unique = new Set(keys);

  if (unique.size !== keys.length) {
    throw '[Ruvy] unexpected duplicate key';
  }

  return out;
};

/**
 * process children for a new branch
 * @param children
 * @param parent
 * @returns
 */
export const createNewBranchChildren = (
  children: Array<unknown>,
  parent: Branch
): Array<Branch> => {
  return preprocessChildren(children).map((child, index) =>
    process(child, undefined, parent, index)
  );
};

/**
 * TODO: move to utils
 * change the index of an element in an array from `fromIndex` to `toIndex`
 * @param array target array
 * @param fromIndex element index
 * @param toIndex new element index
 */
function moveElement<T>(array: Array<T>, fromIndex: number, toIndex: number) {
  const arrayCopy = [...array];
  const element = arrayCopy.splice(fromIndex, 1)[0];

  arrayCopy.splice(toIndex, 0, element);

  return arrayCopy;
}

/**
 * unmount children's excess.
 * @param current parent branch
 * @param newChildrenKeys new children keys
 */
export const removeChildrenExcess = (current: Branch, newChildrenKeys: Array<BranchKey>): void => {
  current.unmountedChildren = current.children.filter(
    child => !newChildrenKeys.includes(child.key)
  );

  current.unmountedChildren.forEach(unmountBranch);

  current.children = current.children.filter(child => newChildrenKeys.includes(child.key));
};

/**
 * Perform diffing of the new children with the old ones.
 * @param current parent branch
 * @param children children templates
 */
export const diffNewChildren = (current: Branch, children: Array<unknown>) => {
  const oldKeys = current.children.map(child => child.key);

  children.forEach((child, index) => {
    const key = getCorrectKey(child, index);

    const exists = oldKeys.includes(key);

    if (exists) {
      diffBranches(child, getBranchWithKey(current, key) as Branch, current, index);
    } else {
      current.children.push(createNewBranch(child, current, key));
    }
  });
};

export const arrangeChildren = (current: Branch, children: Array<unknown>) => {
  const newChildrenKeys = children.map((child, index) => getCorrectKey(child, index));

  // rearrange current.children
  newChildrenKeys.forEach((key, newIndex) => {
    const oldIndex = current.children.findIndex(child => child.key === key);

    if (oldIndex !== newIndex) {
      // we need to change the index locally

      const branch = current.children[oldIndex];

      if (!branch) {
        throw `[Ruvy] Branch with key (${key}) not found to be rearranged.`;
      }

      current.children = moveElement(current.children, oldIndex, newIndex);

      // we need to get Host element(s) and rearrange them
      const hosts = getClosestChildrenHostBranches(branch);

      hosts.forEach(host => {
        current.pendingActions.push(createAction(ActionType.Reorder, host));
      });
    }
  });
};

/**
 * perform diffing of different types: `unmount` current branch and `mount` the template instead.
 * @param template new template
 * @param current current branch
 * @param parent parent
 * @param index index of template in template parent
 */
export const diffTypes = (
  template: unknown,
  current: Branch,
  parent: Branch,
  index: number
): void => {
  // we move current to old,
  const old = current;

  // collect unmount effects,
  unmountBranch(old);

  // compute the new one and merge it
  const newBranch = process(template, undefined, parent, index);
  newBranch.old = old;

  // replace current with newly computed one.
  // bruh : current = newBranch;

  const i = (current.parent as Branch).children.findIndex(child => child === old);
  (current.parent as Branch).children[i] = newBranch;
};

/**
 * diff a branch an a template
 * @param template new template
 * @param current current branch
 * @param parent parent
 * @param index index in parent
 */
export const diffBranches = (
  template: unknown,
  current: Branch,
  parent: Branch,
  index: number
): Branch => {
  // perform old branches cleanup
  current.old = undefined;
  current.unmountedChildren = [];

  if (haveSameTagAndType(current, template)) {
    // we perform diffing
    const tag = current.tag;

    let children: Array<unknown> = [];

    switch (tag) {
      case BranchTag.Element: {
        children = elementComponentHandler.diff(
          template as BranchTemplate<string>,
          current as Branch<string>
        );
        break;
      }
      case BranchTag.Text: {
        children = textComponentHandler.diff(`${template}`, current as Branch<string>);
        break;
      }
      case BranchTag.Fragment: {
        children = fragmentComponentHandler.diff(template as BranchTemplateFragment, current);
        break;
      }
      case BranchTag.Function: {
        children = callableComponentHandler.diff(template as BranchTemplateFunction, current);
        break;
      }
      case BranchTag.Outlet: {
        children = outletComponentHandler.diff(template as BranchTemplateFunction, current);
        break;
      }
      case BranchTag.Context: {
        children = contextComponentHandler.diff(template as BranchTemplate, current);
        break;
      }
      case BranchTag.Portal: {
        children = portalComponentHandler.diff(
          template as BranchTemplate<PortalBranchType>,
          current
        );
        break;
      }
      default:
        break;
    }

    children = preprocessChildren(children);

    const newChildrenKeys = children.map((child, index) => getCorrectKey(child, index));

    removeChildrenExcess(current, newChildrenKeys);

    diffNewChildren(current, children);

    arrangeChildren(current, children);
  } else {
    diffTypes(template, current, parent, index);
  }

  return current;
};

/**
 * create a brand new branch from a given template
 * @param template jsx, string, number...
 * @param parent parent branch
 * @param key branch key
 * @returns
 */
export const createNewBranch = (template: unknown, parent: Branch, key: BranchKey): Branch => {
  const tag = getTag(template);

  switch (tag) {
    case BranchTag.Function: {
      return callableComponentHandler.create(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Element: {
      return elementComponentHandler.create(template as BranchTemplate<string>, parent, key);
    }
    case BranchTag.Fragment: {
      return fragmentComponentHandler.create(
        template as BranchTemplate<typeof createFragmentTemplate>,
        parent,
        key
      );
    }
    case BranchTag.Text: {
      return textComponentHandler.create(`${template}`, parent, key);
    }
    case BranchTag.Outlet: {
      return outletComponentHandler.create(template as BranchTemplateFunction, parent, key);
    }
    case BranchTag.Context: {
      return contextComponentHandler.create(template as BranchTemplate, parent, key);
    }
    case BranchTag.Null: {
      return emptyComponentHandler.create(null, parent, key);
    }
    case BranchTag.Portal: {
      return portalComponentHandler.create(
        template as BranchTemplate<PortalBranchType>,
        parent,
        key
      );
    }
    default: {
      throw '[Ruvy] Invalid template tag: this error should not happen !!!';
    }
  }
};

export const handleComponent = (
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  index: number
): Branch => {
  const key = getCorrectKey(template, index);
  const tag = getTag(template);

  let res: ReturnType<ComponentFunctionHandler>;

  if (current && !haveSameTagAndType(current, template)) {
    // we move current to old,
    const old = current;

    // collect unmount effects,
    unmountBranch(old);

    // compute the new one and merge it
    const newBranch = handleComponent(template, undefined, parent, index);
    newBranch.old = old;

    // replace current with newly computed one.
    // bruh : current = newBranch;
    const i = (current.parent as Branch).children.findIndex(child => child === old);
    (current.parent as Branch).children[i] = newBranch;

    return newBranch;
  }

  switch (tag) {
    case BranchTag.Function: {
      res = handleCallable(template as BranchTemplateFunction, current, parent, key);
      break;
    }
    case BranchTag.Element: {
      res = handleElementComponent(
        template as BranchTemplate<string>,
        current as Branch<string>,
        parent,
        key
      );
      break;
    }
    case BranchTag.Fragment: {
      res = handleFragmentComponent(
        template as BranchTemplateFragment,
        current as Branch<FragmentType>,
        parent,
        key
      );
      break;
    }
    case BranchTag.Text: {
      res = handleTextComponent(template as string, current as Branch<BranchTag.Text>, parent, key);
      break;
    }
    case BranchTag.Outlet: {
      res = handleOutletComponent(template as BranchTemplateFunction, current, parent, key);
      break;
    }
    case BranchTag.Context: {
      res = handleContextComponent(template as BranchTemplate, current, parent, key);
      break;
    }
    case BranchTag.Null: {
      res = handleEmptyComponent(
        template as BranchTemplate,
        current as Branch<BranchTag.Null>,
        parent,
        key
      );
      break;
    }
    case BranchTag.Portal: {
      res = handlePortalComponent(
        template as BranchTemplate<PortalBranchType>,
        current as Branch<PortalBranchType>,
        parent,
        key
      );
      break;
    }
    default: {
      throw '[Ruvy] Invalid template tag: this error should not happen !!!';
    }
  }

  const { branch, unprocessedChildren } = res;

  // collect pending effects
  branch.pendingActions.push(...collectPendingEffect(branch));

  // process children
  const children = preprocessChildren(unprocessedChildren);

  if (!current) {
    branch.children = children.map((child, index) =>
      handleComponent(child, undefined, branch, index)
    );
  } else {
    // perform old branches cleanup
    current.old = undefined;
    current.unmountedChildren = [];

    const newChildrenKeys = children.map((child, index) => getCorrectKey(child, index));

    removeChildrenExcess(current, newChildrenKeys);

    diffNewChildren(current, children);

    arrangeChildren(current, children);
  }

  // check if output children have duplicate keys
  const keys = branch.children.map(item => item.key);
  const unique = new Set(keys);

  if (unique.size !== keys.length) {
    throw '[Ruvy] unexpected duplicate key';
  }

  return branch;
};

export { default as handleCallable } from './callable/callable.js';
export { default as handleContext } from './context/context.js';
export { default as handleElement } from './element/element.js';
export { default as handleEmpty } from './empty/empty.js';
export { default as handleFragment } from './fragment/fragment.js';
export { default as handleOutlet } from './outlet/outlet.js';

export { default as handlePortal, Portal } from './portal/portal.js';

export { default as handleText } from './text/text.js';

export { default as createRoot } from './root/root.js';

export default process;
