import {
  cast,
  isArray,
  isBlank,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isTrue,
  isUndefined,
} from "@riadh-adrani/utils";
import { ComponentSymbol } from "../../types/_component.js";

export const isComponentTemplate = (object: unknown): boolean => {
  if (!isObject(object) || isNull(object) || isUndefined(object)) {
    return false;
  }

  const $object = cast<Record<string, unknown>>(object);

  const elementType = $object.elementType;
  const validElementType =
    isDefined(elementType) && (isFunction(elementType) || !isBlank(elementType as string));

  const props = $object.props;
  const validProps = isObject(props) && !isArray(props);

  const children = $object.children;
  const validChildren = isArray(children);

  const symbol = $object.symbol;
  const validSymbol = symbol === ComponentSymbol;

  return isObject(object) && validChildren && validElementType && validProps && validSymbol;
};

export const isTemplateChild = (object: unknown): boolean => {
  return (
    isComponentTemplate(object) ||
    isString(object) ||
    isNumber(object) ||
    isTrue(object === true) ||
    (!isNull(object) && isObject(object))
  );
};
