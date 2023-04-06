import { Arrayable, Callback, StringWithAutoComplete } from "@riadh-adrani/utils";
import { CallbackWithArgs } from "./common.js";
import { DomAttribute, DomEvent } from "@riadh-adrani/dom-utils";

export enum Namespace {
  svg = "http://www.w3.org/2000/svg",
  math = "http://www.w3.org/1998/Math/MathML",
  html = "http://www.w3.org/1999/xhtml",
}

export enum ComponentNodeType {
  Standard = "#standard",
  Text = "#text",
}

export const ComponentSymbol = Symbol.for("ruvy-component");

export enum ComponentUpdateActionType {}

export type ComponentType = StringWithAutoComplete<keyof HTMLElementTagNameMap> | Callback;

export interface ComponentTemplate {
  elementType: ComponentType;
  props: Record<string, unknown>;
  children: Array<unknown>;
  symbol: symbol;
}

export type EventWrapper = CallbackWithArgs<[Event]>;

export interface ComponentModifiers {
  events?: {
    wrapper?: EventWrapper;
  };
}

export interface ComputedComponent<T = Node> extends Omit<ComponentTemplate, "props"> {
  currentProps: Record<string, unknown>;
  attributes: Record<string, Arrayable<DomAttribute>>;
  events: Record<string, Arrayable<DomEvent>>;
  ns: Namespace;
  nodeType: ComponentNodeType;
  instance?: T;
  parent: ComputedComponent<Element>;
}

export interface ComponentUpdateActionItem {
  type: ComponentUpdateActionType;
  callback: Callback;
}

export interface ComponentUpdateActions {
  id: string;
  items: Array<ComponentUpdateActionItem>;
  children: Array<ComponentUpdateActions>;
}
