import {
  forEachKey,
  hasProperty,
  isArray,
  isBlank,
  isNumber,
  isPrimitiveType,
  omit,
} from "@riadh-adrani/utils";
import {
  ComponentTemplate,
  IAttribute,
  IComponent,
  IComponentSymbol,
  IComponentType,
  IEventHandler,
  ITextComponent,
  Namespace,
  Tag,
} from "../types";
import Events from "./Events";
import {
  createElement,
  createTextNode,
  DomAttribute,
  DomEventHandler,
} from "@riadh-adrani/dom-control-js";

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

  out.symbol = IComponentSymbol;

  return out;
};

export const isComponent = (obj: unknown): boolean => {
  return (
    hasProperty(obj, "symbol") &&
    hasProperty(obj, "tag") &&
    (obj as Record<string, unknown>)["symbol"] === IComponentSymbol
  );
};

export const isFragment = (obj: unknown): boolean => {
  return isComponent(obj) && (obj as ComponentTemplate).tag === IComponentType.Fragment;
};

export const createId = (index?: number, parent?: IComponent): string => {
  return isNumber(index) && parent ? `${parent.id}-${index}` : "0";
};

export const createTextComponent = (
  data: string,
  index: number,
  parent: IComponent
): ITextComponent => {
  return {
    attributes: {},
    children: [],
    data,
    events: {},
    id: createId(index, parent),
    ns: "http://www.w3.org/1999/xhtml",
    tag: IComponentType.Text,
    type: IComponentType.Text,
    domNode: undefined,
    parent,
    symbol: IComponentSymbol,
  };
};

export const processComponent = (
  template: ComponentTemplate,
  index?: number,
  parent?: IComponent
): IComponent => {
  const { children } = template;

  const out: IComponent = omit(template, "children") as IComponent;

  if (out.tag === IComponentType.Fragment) {
    throw "Unexpected type: Should not process fragment component. this error could happen when the root element is a fragment.";
  }

  out.id = createId(index, parent);
  out.domNode = undefined;
  out.type = IComponentType.Standard;
  out.parent = parent;
  out.children = [];

  let i = 0;

  children.forEach((child, index) => {
    if (isPrimitiveType(child)) {
      out.children.push(createTextComponent(`${child}`, index, out));

      i = i + 1;

      return;
    }

    if (isFragment(child)) {
      (child as IComponent).children.forEach((fc) => {
        const processedFragmentChild = isPrimitiveType(fc)
          ? createTextComponent(`${fc}`, i, out)
          : processComponent(fc, i, out);

        out.children.push(processedFragmentChild);

        i = i + 1;
      });

      return;
    }

    if (isComponent(child)) {
      out.children.push(processComponent(child as ComponentTemplate, index, out));

      i = i + 1;

      return;
    }
  });

  return out;
};

export const renderComponent = (component: IComponent): Node => {
  if (component.type === IComponentType.Fragment) {
    throw "Unexpected Type: cannot render a fragment component.";
  }

  let el: Node;

  if (component.type === IComponentType.Text) {
    el = createTextNode((component as ITextComponent).data);
  } else {
    el = createElement(component.tag, {
      attributes: component.attributes as unknown as Record<string, DomAttribute>,
      events: component.events as unknown as Record<string, DomEventHandler>,
      namespace: component.ns,
    });

    component.children.forEach((child) => {
      el.appendChild(renderComponent(child));
    });
  }

  component.domNode = el;

  return el;
};
