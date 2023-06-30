import { haveSameTagAndType } from '../../utils/index.js';
import {
  ActionType,
  Branch,
  BranchKey,
  BranchTag,
  BranchTemplate,
  BranchTemplateFragment,
  BranchTemplateFunction,
} from '../../types.js';
import {
  getClosestChildrenHostBranches,
  getCorrectKey,
  getBranchWithKey,
  preprocessChildren,
} from '../../utils/index.js';
import createAction from '../../actions/index.js';
import { unmountBranch } from '../../utils/index.js';
import process from '../index.js';
import createNewBranch from '../new/index.js';
import { PortalBranchType } from '../new/portal.js';
import contextComponentHandler from '../../components/context/context.js';
import elementComponentHandler from '../../components/element/element.js';
import fragmentComponentHandler from '../../components/fragment/fragment.js';
import callableComponentHandler from '../../components/callable/callable.js';
import outlet from './outlet.js';
import portal from './portal.js';
import text from './text.js';

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
const diffBranches = (
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
        children = text(current as Branch<string>, `${template}`);
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
        children = outlet(current);
        break;
      }
      case BranchTag.Context: {
        children = contextComponentHandler.diff(template as BranchTemplate, current);
        break;
      }
      case BranchTag.Portal: {
        children = portal(current, template as BranchTemplate<PortalBranchType>);
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

export default diffBranches;
