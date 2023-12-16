import {
  Branch,
  BranchTemplateFragment,
  ComponentFunctionHandler,
  FragmentType,
  JsxFragmentType,
} from '../types.js';
import { getCorrectKey, getTag, moveElement } from '../utils/index.js';
import { haveSameTagAndType } from '../utils/index.js';
import {
  ActionType,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateJsxFragment,
  BranchTemplateFunction,
} from '../types.js';
import {
  getClosestChildrenHostBranches,
  getBranchWithKey,
  preprocessChildren,
} from '../utils/index.js';
import createAction from '../actions/actions.js';
import { unmountBranch } from '../utils/index.js';
import { handleContextComponent } from './context/context.js';
import { handleElementComponent } from './element/element.js';
import { handleFragmentComponent, handleJsxFragmentComponent } from './fragment/fragment.js';
import { handleCallableComponent } from './callable/callable.js';
import { handleOutletComponent } from './outlet/outlet.js';
import { handlePortalComponent, type PortalBranchType } from './portal/portal.js';
import { handleTextComponent } from './text/text.js';
import { handleEmptyComponent } from './empty/empty.js';

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
      handleComponent(child, getBranchWithKey(current, key) as Branch, current, index);
    } else {
      current.children.push(handleComponent(child, undefined, current, index));
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

      hosts.forEach(host => createAction(ActionType.Reorder, host));
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
export const handleComponentsWithDifferentTypes = (
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
  const newBranch = handleComponent(template, undefined, parent, index);
  newBranch.old = old;

  // replace current with newly computed one.
  // bruh : current = newBranch;

  const i = (current.parent as Branch).children.findIndex(child => child === old);
  (current.parent as Branch).children[i] = newBranch;
};

export const handleComponent = <T = unknown>(
  template: unknown,
  current: Branch | undefined,
  parent: Branch,
  index: number
): Branch<T> => {
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

    return newBranch as Branch<T>;
  }

  switch (tag) {
    case BranchTag.Function: {
      res = handleCallableComponent(template as BranchTemplateFunction, current, parent, key);
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
    case BranchTag.JsxFragment: {
      res = handleJsxFragmentComponent(
        template as BranchTemplateJsxFragment,
        current as Branch<JsxFragmentType>,
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

  // process children
  const children = preprocessChildren(unprocessedChildren, branch);

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

  return branch as Branch<T>;
};

export { default as createRoot } from './root/root.js';
export { Portal } from './portal/portal.js';

export default handleComponent;
