import {
  cast,
  hasProperty,
  isArray,
  isBlank,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "@riadh-adrani/utils";
import { Branch, BranchSymbol, BranchTag, BranchTemplate } from "../types/index.js";

export const isBranchTemplate = (o: unknown): boolean => {
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
 * @deprecated
 */
export const isBranchTemplateTextChild = (o: unknown): boolean => {
  return isString(o) || isNumber(o) || (isObject(o) && !isNull(o));
};

/**
 * @deprecated
 */
export const isBranchTemplateChild = (o: unknown): boolean => {
  return isBranchTemplate(o) || isBranchTemplateTextChild(o);
};

export const getTag = (o: unknown): BranchTag => {
  if (isBranchTemplate(o)) {
    const type = cast<BranchTemplate>(o).type;

    if (isFunction(type)) {
      return BranchTag.Function;
    }

    if (type === BranchTag.Fragment) {
      return BranchTag.Fragment;
    }

    if (isString(type)) {
      return BranchTag.Element;
    }
  }

  if (isBranchTemplateChild(o)) {
    return BranchTag.Text;
  }

  return BranchTag.Null;
};

export const haveSameTagAndType = (branch: Branch, template: unknown): boolean => {
  if (getTag(template) === branch.tag) {
    if (isBranchTemplate(template)) {
      return branch.type === cast<BranchTemplate>(template).type;
    }

    return true;
  }

  return false;
};
