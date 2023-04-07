import { Arrayable, Callback, StringWithAutoComplete } from "@riadh-adrani/utils";
import { CallbackWithArgs } from "./common.js";
import { DomAttribute, DomEvent } from "@riadh-adrani/dom-utils";
import { StateArray } from "./store.js";

export enum Namespace {
  svg = "http://www.w3.org/2000/svg",
  math = "http://www.w3.org/1998/Math/MathML",
  html = "http://www.w3.org/1999/xhtml",
}

export enum ComponentNodeType {
  Standard = "#standard",
  Text = "#text",
}

export enum HookType {
  state = "useState",
  effect = "useEffect",
}

export const ComponentSymbol = Symbol.for("ruvy-component");

export enum ComponentUpdateActionType {}

export type ComponentTag = StringWithAutoComplete<keyof HTMLElementTagNameMap>;

export type ComponentType = ComponentTag | Callback;

export interface ComponentTemplate {
  elementType: ComponentType;
  props: Record<string, unknown>;
  children: Array<unknown>;
  symbol: symbol;
}

export type EventWrapper = CallbackWithArgs<[Event]>;

export interface ComponentModifiers {
  eventWrapper: EventWrapper;
  contextWrapper: CallbackWithArgs<[ComputedComponent, ComputedComponent | undefined]>;
}

export interface MemoizedHook {
  type: HookType;
  key: string;
  index: number;
  initialValue: unknown;
}

export type HookDispatcher = () => StateArray<unknown>;

export interface ComputedComponent<T = Node> extends Omit<ComponentTemplate, "props" | "children"> {
  attributes: Record<string, Arrayable<DomAttribute>>;
  events: Record<string, DomEvent>;
  ns: Namespace;
  nodeType: ComponentNodeType;
  instance?: T;
  parent?: ComputedComponent<unknown>;
  key: string | number;
  children: Array<ComputedComponent | undefined>;
  memoizedHooks: Record<string, MemoizedHook>;
  memoizedProps: Record<string, unknown>;
}

export interface ComputedTextComponent extends ComputedComponent<Text> {
  data: string;
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
