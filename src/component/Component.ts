import {
  areEqual,
  copyKeys,
  forEachKey,
  hasProperty,
  isArray,
  isBlank,
  isDefined,
  isNumber,
  isPrimitiveType,
  isString,
  omit,
} from "@riadh-adrani/utils";
import {
  Callback,
  IComponentTemplate,
  IAttribute,
  IComponent,
  IComponentSymbol,
  IComponentType,
  IComponentUpdateActions,
  IEventHandler,
  ITextComponent,
  Namespace,
  Tag,
  IUpdateAction,
  IComponentTemplateModifiers,
} from "../types";
import Events from "./Events";
import {
  createElement,
  createTextNode,
  DomAttribute,
  DomChild,
  DomEventHandler,
  injectNode,
  isElementInDocument,
  removeAttribute,
  removeEvent,
  removeNode,
  setAttribute,
  setEvent,
  setTextNodeData,
} from "@riadh-adrani/dom-utils";

export const createComponent = (
  tag: Tag,
  props: Record<string, unknown>,
  modifiers?: IComponentTemplateModifiers
): IComponentTemplate => {
  const out: IComponentTemplate = {} as unknown as IComponentTemplate;

  if (isBlank(tag)) {
    throw `Component tag (${tag}) is not valid`;
  }

  out.tag = tag;

  if (isString(out.ns) && !isBlank(out.ns)) {
    out.ns = props.ns as Namespace;
  } else {
    out.ns = "http://www.w3.org/1999/xhtml";
  }

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
        out.children = (value as Array<IComponentTemplate>).filter(
          (child) => !(isString(child) && isBlank(child as unknown as string))
        );
      } else {
        out.children = [value as IComponentTemplate];
      }

      return;
    }

    if (Events.isValid(key, value)) {
      const eventWrapper =
        modifiers?.eventWrapper ??
        ((fn: Callback) => {
          fn();
        });

      const callback = ((e: unknown) => {
        eventWrapper(() => (value as (e: unknown) => void)(e));
      }) as Callback;

      out.events[key] = callback as Callback;

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
  return isComponent(obj) && (obj as IComponentTemplate).tag === IComponentType.Fragment;
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
  template: IComponentTemplate,
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
      out.children.push(processComponent(child as IComponentTemplate, index, out));

      i = i + 1;

      return;
    }
  });

  return out;
};

export const renderComponent = <T extends Node>(component: IComponent): T => {
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

  return el as T;
};

export const isRendered = (component: IComponent): boolean => {
  return isDefined(component.domNode);
};

export const isMounted = (component: IComponent): boolean => {
  return isRendered(component) && isElementInDocument(component.domNode);
};

export const diffComponents = (
  current: IComponent,
  updated: IComponent
): IComponentUpdateActions => {
  if (!isMounted(current)) {
    throw "Unexpected State: cannot update a non-rendered component";
  }

  const updateActions: IComponentUpdateActions = { actions: [], id: current.id, children: [] };

  const { attributes, children, events, ns, tag, type } = updated;

  if (current.tag !== tag || current.ns !== ns) {
    const currentNode = current.domNode as Element;

    const callback = () => {
      const domNode = renderComponent(current);
      currentNode.replaceWith(domNode);
    };
    const reason = `replace-of-tags-ns:(${current.tag}|${current.ns}) => (${updated.tag}|${updated.ns})`;

    updateActions.actions.push({ reason, callback });

    copyKeys(updated, current, "parent", "domNode");
  } else if (current.type === updated.type && type === IComponentType.Text) {
    const newText = (updated as ITextComponent).data;
    const oldText = (current as ITextComponent).data;

    if (!areEqual(newText, oldText)) {
      const updateTextAction = () => {
        setTextNodeData(current.domNode as Text, newText);
      };

      copyKeys(updated, current, "parent", "domNode");

      updateActions.actions.push({ reason: "update-text-data", callback: updateTextAction });
    }
  } else {
    {
      // ? Attributes
      const oldAttrs = current.attributes;
      const newAttrs = attributes;
      const combined: Record<string, IAttribute> = { ...oldAttrs, ...newAttrs };

      forEachKey((key, value) => {
        let action: IUpdateAction | undefined;

        if (hasProperty(newAttrs, key)) {
          if (hasProperty(oldAttrs, key)) {
            if (!areEqual(newAttrs[key], oldAttrs[key])) {
              action = {
                reason: `update-attribute-${key}`,
                callback: () => {
                  setAttribute(key, value as DomAttribute, current.domNode as Element);
                },
              };
            }
          } else {
            action = {
              reason: `add-attribute-${key}`,
              callback: () => {
                setAttribute(key, value as DomAttribute, current.domNode as Element);
              },
            };
          }
        } else {
          action = {
            reason: `remove-attribute-${key}`,
            callback: () => {
              removeAttribute(key, current.domNode as Element);
            },
          };
        }

        if (action) {
          updateActions.actions.push(action);
        }
      }, combined);
    }

    {
      // ? Events
      const oldEv = current.events;
      const newEv = events;
      const combined: Record<string, IEventHandler> = { ...oldEv, ...newEv };

      forEachKey((key, value) => {
        let action: IUpdateAction | undefined;

        if (hasProperty(newEv, key)) {
          action = {
            reason: `set-event-${key}`,
            callback: () => {
              setEvent(key, value, current.domNode as Element);
            },
          };
        } else {
          action = {
            reason: `remove-event-${key}`,
            callback: () => {
              removeEvent(key.toLowerCase(), current.domNode as Element);
            },
          };
        }

        if (action) {
          updateActions.actions.push(action);
        }
      }, combined);
    }

    {
      // ? Children
      const oldCh = current.children;
      const newCh = children;

      let to: number = newCh.length;

      if (oldCh.length > newCh.length) {
        to = newCh.length;

        while (oldCh.length > newCh.length) {
          const removed = oldCh.pop()!;

          const removeExcessiveChild = () => {
            removeNode(removed.domNode as HTMLElement);
          };

          updateActions.actions.push({
            reason: `remove-excess-child-${removed.id}`,
            callback: removeExcessiveChild,
          });
        }
      } else if (oldCh.length < newCh.length) {
        to = oldCh.length;

        for (let i = oldCh.length; i < newCh.length; i++) {
          const added = newCh[i];

          oldCh.push(added);

          const addMissingChild = () => {
            const rendered = renderComponent(added);

            injectNode(rendered as DomChild, current.domNode as HTMLElement);
          };

          updateActions.actions.push({
            reason: `add-new-child-${added.id}`,
            callback: addMissingChild,
          });
        }
      }

      for (let i = 0; i < to; i++) {
        const oc = oldCh[i];
        const uc = newCh[i];

        const childUpdateAction = diffComponents(oc, uc);

        updateActions.children.push(childUpdateAction);
      }
    }

    copyKeys(updated, current, "parent", "domNode", "children");
  }

  return updateActions;
};

export const executeUpdateCallbacks = (action: IComponentUpdateActions) => {
  action.actions.forEach((action) => action.callback());

  action.children.forEach((child) => executeUpdateCallbacks(child));
};
