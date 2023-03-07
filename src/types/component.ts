import { StringWithAutoComplete } from "@riadh-adrani/utils";
import { Callback } from "./common";

export type IAttribute = string | number | boolean | undefined | Record<string, unknown> | null;

export type IEventTarget<T extends Element> = EventTarget & T;

export type IEventHandler = (ev: Event) => void;

export type Namespace =
  | "http://www.w3.org/2000/svg"
  | "http://www.w3.org/1999/xhtml"
  | "http://www.w3.org/1998/Math/MathML";

export type Tag = StringWithAutoComplete<keyof HTMLElementTagNameMap>;

export type PrimitiveComponentTemplate = string | number | null | undefined | boolean;

export interface IComponentTemplate {
  tag: Tag;
  attributes: Record<string, IAttribute>;
  events: Record<string, Callback>;
  ns: Namespace;
  children: Array<PrimitiveComponentTemplate | IComponentTemplate>;
  symbol: symbol;
}

export enum IComponentType {
  Standard = "#standard",
  Text = "#text",
  Fragment = "#fragment",
}

export const IComponentSymbolId = "ruvy-component";

export const IComponentSymbol = Symbol.for(IComponentSymbolId);

export interface IComponent<T = Node> extends Omit<IComponentTemplate, "children"> {
  id: string;
  children: Array<IComponent>;
  domNode?: T;
  parent?: IComponent;
  type: IComponentType;
}

export interface ITextComponent extends IComponent<Text> {
  data: string;
  type: IComponentType.Text;
}

export interface IUpdateAction {
  reason: string;
  callback: Callback;
}

export interface IComponentUpdateActions {
  id: string;
  actions: Array<IUpdateAction>;
  children: Array<IComponentUpdateActions>;
}
