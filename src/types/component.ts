import { StringWithAutoComplete } from "@riadh-adrani/utility-js";

export type IAttribute = string | number | boolean | undefined | Record<string, unknown> | null

export type IEventTarget<T extends Element> = EventTarget & T;

export type IEventHandler = (ev: Event) => void

export type Namespace = "http://www.w3.org/2000/svg" | "http://www.w3.org/1999/xhtml" | "http://www.w3.org/1998/Math/MathML"

export type Tag = StringWithAutoComplete<keyof HTMLElementTagNameMap>

export type PrimitiveRawComponent = string | number | null | undefined | boolean

export interface RawComponentTemplate extends Record<string, unknown> {
  tag: Tag
}

export interface ComponentTemplate extends RawComponentTemplate {
  attributes: Record<string, IAttribute>,
  events: Record<string, IEventHandler>,
  ns: Namespace,
  children: Array<ComponentTemplateChild>,
}

export type FunctionalComponent = () => ComponentTemplate

export type ComponentTemplateChild = PrimitiveRawComponent | CreateComponentTemplate;

export type RawComponent = PrimitiveRawComponent | RawComponentTemplate

export type IComponentContext = {}

export type CreateComponentTemplate = (options: IComponentContext) => RawComponent