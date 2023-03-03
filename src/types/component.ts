import { StringWithAutoComplete } from "@riadh-adrani/utils";

export type IAttribute = string | number | boolean | undefined | Record<string, unknown> | null;

export type IEventTarget<T extends Element> = EventTarget & T;

export type IEventHandler = (ev: Event) => void;

export type Namespace =
  | "http://www.w3.org/2000/svg"
  | "http://www.w3.org/1999/xhtml"
  | "http://www.w3.org/1998/Math/MathML";

export type Tag = StringWithAutoComplete<keyof HTMLElementTagNameMap>;

export type PrimitiveComponentTemplate = string | number | null | undefined | boolean;

export interface ComponentTemplate {
  tag: Tag;
  attributes: Record<string, IAttribute>;
  events: Record<string, IEventHandler>;
  ns: Namespace;
  children: Array<PrimitiveComponentTemplate | ComponentTemplate>;
}

export enum IComponentType {
  Standard = "#standard",
  Text = "#text",
  Fragment = "#fragment",
}

export interface IComponent<T = Node> extends Omit<ComponentTemplate, "children"> {
  id: string;
  children: Array<IComponent>;
  domNode?: T;
  parent?: IComponent;
  type: IComponentType;
}
