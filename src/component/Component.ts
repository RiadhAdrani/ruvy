import { isArray, isBlank, isString, isNumber, isFunction } from "@riadh-adrani/utility-js";
import {
  ComponentTemplate,
  ComponentTemplateChild,
  CreateComponentTemplate,
  IAttribute,
  IEventHandler,
  Namespace,
  RawComponentTemplate,
} from "../types";
import Event from "./Event";

export const createComponent = (callback: CreateComponentTemplate): CreateComponentTemplate => {
  return callback;
};

export const isValidRawComponent = (child: unknown): boolean => {
  if (isString(child) && !isBlank(child as string)) {
    return true;
  }

  if (typeof child === "boolean") {
    return true;
  }

  if (isNumber(child)) {
    return true;
  }

  if (isFunction(child)) {
    return true;
  }

  return false;
};

export const transformComponentTemplate = (template: RawComponentTemplate): ComponentTemplate => {
  if (isBlank(template.tag)) {
    throw `Component tag (${template.tag}) is not valid.`;
  }

  let tag = template.tag;
  let ns: Namespace = "http://www.w3.org/1999/xhtml";

  let children: Array<ComponentTemplateChild> = [];
  const events: Record<string, IEventHandler> = {};
  const attributes: Record<string, IAttribute> = {};

  Object.keys(template).forEach((key) => {
    const value = template[key];

    // ? override tag
    if (key === "tag") {
      return;
    }

    // ? define namespace
    if (key == "ns" && !isBlank(value as string)) {
      ns = value as Namespace;
      return;
    }

    // ? add events
    if (Event.isValid(key, value)) {
      events[key] = value as IEventHandler;
      return;
    }

    // ? add children
    if (key === "children") {
      if (isArray(value)) {
        children = (value as Array<ComponentTemplateChild>).filter((child) =>
          isValidRawComponent(child)
        );
      } else {
        if (isValidRawComponent(value)) {
          children = [value as ComponentTemplateChild];
        }
      }

      return;
    }

    // ? if non of the above matches, we assume it is an attribute
    attributes[key] = value as IAttribute;
  });

  return { tag, children, ns, events, attributes };
};
