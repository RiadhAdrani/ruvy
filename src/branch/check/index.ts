import {
  cast,
  hasProperty,
  isArray,
  isBlank,
  isBoolean,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "@riadh-adrani/utils";
import { Branch, BranchSymbol, BranchTag, BranchTemplate } from "../types.js";
import { createFragmentTemplate } from "../create/index.js";
import { getCorrectKey } from "../utils/index.js";
import { Outlet } from "../index.js";

/**
 * checks if the given is a valid component template
 * @param o object
 */
export const isValidTemplate = (o: unknown): boolean => {
  if (!isObject(o) || isNull(o) || isUndefined(o)) {
    return false;
  }

  const temp = cast<Record<string, unknown>>(o);

  if (
    !hasProperty(temp, "type") ||
    !isDefined(temp.type) ||
    (!isFunction(temp.type) && isBlank(temp.type as string))
  ) {
    return false;
  }

  if (!isObject(temp.props) || isArray(temp.props)) {
    return false;
  }

  if (!isArray(temp.children)) {
    return false;
  }

  if (temp.symbol !== BranchSymbol) {
    return false;
  }

  return true;
};

/**
 * checks if the given object is valid as a text node.
 * @param o object
 */
export const isValidTextChild = (o: unknown): boolean => {
  return (isString(o) || isNumber(o) || (isObject(o) && !isNull(o))) && !isValidTemplate(o);
};

/**
 * checks if the given object is as a component child.
 * @param o object
 */
export const isValidChild = (o: unknown): boolean => {
  return isValidTemplate(o) || isValidTextChild(o);
};

/**
 * checks if a child is nullish
 * @param o
 */
export const isNullishChild = (o: unknown): boolean => {
  return isNull(o) || isUndefined(o) || isBoolean(o);
};

/**
 * compute tag from a template/object.
 * @param o object
 */
export const getTag = (o: unknown): BranchTag => {
  if (isValidTemplate(o)) {
    const type = cast<BranchTemplate>(o).type;

    if (type === Outlet) {
      return BranchTag.Outlet;
    }

    if (type === createFragmentTemplate) {
      return BranchTag.Fragment;
    }

    if (isFunction(type)) {
      return BranchTag.Function;
    }

    if (isString(type)) {
      return BranchTag.Element;
    }
  }

  if (isNullishChild(o)) {
    return BranchTag.Null;
  }

  if (isValidChild(o)) {
    return BranchTag.Text;
  }

  return BranchTag.Null;
};

/**
 * checks if a branch and a template have the same type and tag.
 * @param branch branch object
 * @param template template object
 */
export const haveSameTagAndType = (branch: Branch, template: unknown): boolean => {
  if (getTag(template) === branch.tag) {
    if (isValidTemplate(template)) {
      return branch.type === cast<BranchTemplate>(template).type;
    }

    return true;
  }

  return false;
};

/**
 * checks if there is a duplicate key in an array of children
 * @param children array
 */
export const haveDuplicateKey = (children: Array<unknown>): boolean => {
  const keys = children.map((child, index) => getCorrectKey(child, index));

  const set = new Set(keys);

  return keys.length !== set.size;
};
