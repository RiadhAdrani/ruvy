import { forEachKey, isArray, isBlank } from "@riadh-adrani/utils";
import { ComponentTemplate, IAttribute, IEventHandler, Namespace, Tag } from "../types";
import Events from "./Events";

export const createComponent = (tag: Tag, props: Record<string, unknown>): ComponentTemplate => {
  const out: ComponentTemplate = {} as unknown as ComponentTemplate;

  if (isBlank(tag)) {
    throw `Component tag (${tag}) is not valid`;
  }

  out.tag = tag;
  out.ns = "http://www.w3.org/1999/xhtml";
  out.children = [];
  out.attributes = {};
  out.events = {};

  forEachKey((key, value) => {
    if (key === "tag" && !isBlank(key)) {
      out.tag = value as string;
      return;
    }

    if (key === "ns") {
      out.ns = value as Namespace;
      return;
    }

    if (key === "children") {
      if (isArray(value)) {
        out.children = value as Array<ComponentTemplate>;
      } else {
        out.children = [value as ComponentTemplate];
      }

      return;
    }

    if (Events.isValid(key, value)) {
      out.events[key] = value as IEventHandler;

      return;
    }

    out.attributes[key] = value as IAttribute;
  }, props);

  return out;
};
