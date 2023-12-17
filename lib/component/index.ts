import { isClassProp, resolveClassProps } from '@riadh-adrani/domer';
import { areEqual, hasProperty } from '@riadh-adrani/obj-utils';
import {
  Component,
  ComponentHandler,
  ComponentHandlerResult,
  ComponentStatus,
  ComponentSymbol,
  ComponentTag,
  ComponentTasks,
  ComponentWithChildren,
  ComputedChildrenMap,
  ElementComponent,
  ElementTemplate,
  ExecutionContext,
  Fragment,
  FunctionTemplate,
  HostComponent,
  JsxTemplate,
  Key,
  MicroTask,
  MicroTaskType,
  NodeComponent,
  NonRootComponent,
  Outlet,
  Portal,
  PropComparison,
  Props,
  RefValue,
  RootComponent,
  SwitchControllerComponent,
  Template,
} from '@/types.js';
import {
  createElementPropsUpdateTask,
  createInnerHTMLTask,
  createRefElementTask,
  createRenderTask,
  createSetMountedTask,
  createUnrefElementTask,
} from './task.js';
import { RuvyError } from '@/helpers/helpers.js';
import { createFragmentTemplate } from './jsx.js';

export const RuvyAttributes = [
  'if',
  'else',
  'else-if',
  'switch',
  'case',
  'case:default',
  'innerHTML',
  'tag',
  'ns',
  'children',
  'key',
  'ref',
];

export const handleComponent = (
  template: Template,
  current: Component | undefined,
  parent: ComponentWithChildren,
  index: number,
  ctx: ExecutionContext
): ComponentHandlerResult<Component> => {
  const tag = getTagFromTemplate(template);

  const key = computeKey(template, index);

  // we get the key when processing children

  let res: ComponentHandlerResult<NonRootComponent>;

  // TODO: if they do not have the same type or tag or namespace, we unmount and render the new template

  if (tag === ComponentTag.Element) {
    res = handleElement(template as ElementTemplate, current as ElementComponent, parent, key, ctx);
  } else if (tag === ComponentTag.Context) {
    // TODO: handleContext
  } else if (tag === ComponentTag.Fragment) {
    // TODO: handleContext
  } else if (tag === ComponentTag.Function) {
    // TODO: handleContext
  } else if (tag === ComponentTag.JsxFragment) {
    // TODO: handleContext
  } else if (tag === ComponentTag.Null) {
    // TODO: handleContext
  } else if (tag === ComponentTag.Outlet) {
    // TODO: handleContext
  } else if (tag === ComponentTag.Portal) {
    // TODO: handleContext
  } else if (tag === ComponentTag.Text) {
    // TODO: handleContext
  } else {
    throw new RuvyError('unknown template tag type');
  }

  const switchControl = isSwitchController(res!.component as SwitchControllerComponent);

  let switchFulfilled = switchControl === false;

  let ifSequence: { sequence: Array<'if' | 'else-if' | 'else'>; fulfilled: boolean } | false =
    false;

  const childrenMap = computeChildrenMap(current);

  const childrenKeys = new Set<Key>([]);

  for (let i = 0; i < res!.children.length; i++) {
    const child = res!.children[i];

    let nullify = false;

    // ? switch directive
    if (switchControl) {
      // we are inside a switch control

      // check if switch is already fullfilled
      if (switchFulfilled) {
        nullify = true;
      } else {
        // check if there is a "case" prop
        const caseValue = getPropFromTemplate(child, 'case');

        if (caseValue) {
          const doMatch = caseValue.value === switchControl.value;

          nullify = !doMatch;
          switchFulfilled = doMatch;
        } else {
          // we should check if we are at the last element
          const isLast = i === res!.children.length - 1;

          if (!isLast) {
            throw new RuvyError('missing "case" prop within a switch control component.');
          }

          // we are at the last element and we don't have a "case" prop
          // check for "case:default"
          const caseValue = getPropFromTemplate(child, 'case:default');

          // if we don't have a value, we throw
          if (!caseValue) {
            throw new RuvyError(
              'missing "case" or "case:default" prop in the last element of a switch control component.'
            );
          }

          // nullify is false, we don't need to set it
        }
      }
    }

    const key = computeKey(child, i);

    if (childrenKeys.has(key)) {
      throw new RuvyError(
        `duplicate key "${key}" detected. make sure to assign unique keys for each child. if key is not defined, the framework will use the component index as a key instead.`
      );
    }

    let template = nullify ? null : child;

    // ? if directives
    const ifValue = getPropFromTemplate(child, 'if');
    const elseIfValue = getPropFromTemplate(child, 'else-if');
    const elseValue = getPropFromTemplate(child, 'else');

    // cannot have a switch "case" and an "else" or "else-if" directives
    if ((switchControl && elseIfValue) || (switchControl && elseValue)) {
      throw new RuvyError(
        'cannot have an "else" or "else-if" directive within a "switch" control component'
      );
    }

    // cannot have multiple if directives
    const ifDirectiveCount = (ifValue ? 1 : 0) + (elseIfValue ? 1 : 0) + (elseValue ? 1 : 0);

    if (ifDirectiveCount > 1) {
      throw new RuvyError(
        'cannot have more than one conditional directive : "if" | "else" | "else-if"'
      );
    }

    // we have an if directive
    if (ifValue) {
      // start an if sequence
      const fulfilled = Boolean(ifValue.value);

      ifSequence = { fulfilled, sequence: ['if'] };
    }
    // check for else-if
    else if (elseIfValue) {
      // check if we have a sequence

      if (!ifSequence) {
        throw new RuvyError(
          'cannot use "else-if" outside a conditional sequence, which should start with "if"'
        );
      }
      // if fullfilled we nullify
      else if (ifSequence.fulfilled) {
        nullify = true;
      } else {
        // check the last value of the sequence
        const last = ifSequence.sequence.at(-1);

        if (last === 'else') {
          throw new RuvyError('cannot use "else-if" after a component with "else" directive');
        }

        // check if it can be fulfilled
        if (elseIfValue.value) {
          ifSequence.fulfilled = true;
        } else {
          nullify = true;
        }
      }
    } else if (elseValue) {
      if (!ifSequence) {
        throw new RuvyError(
          'cannot use "else" outside a conditional sequence, which should start with "if"'
        );
      }
      // check if fulfilled
      if (ifSequence.fulfilled) {
        nullify = true;
      } else {
        // this the last element of the conditional sequence
        // we fulfill by not nullifying, and reset the sequence
        ifSequence = false;
      }
    }
    // no condition sequence, reset
    else if (ifSequence) {
      ifSequence = false;
    }

    // re-evaluate the template
    template = nullify ? null : template;

    const childTag = getTagFromTemplate(template);

    // check if we have an element template, which needs some props processing
    if (childTag === ComponentTag.Element) {
      processElementTemplateProps(template as ElementTemplate, res!.ctx);
    }

    let childRes: ComponentHandlerResult<Component>;

    // try and find the corresponding component
    const old = childrenMap[key];

    if (!current || !old || childTag !== old.component.tag) {
      // TODO: new render and push it to the correct index
      // TODO: unmount old component if existing
    } else {
      // TODO: handle component with same tag
    }

    // if (childRes) {
    //  // TODO: push tasks
    // }
  }
};

/**
      ███████╗██╗     ███████╗███╗   ███╗███████╗███╗   ██╗████████╗
      ██╔════╝██║     ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
      █████╗  ██║     █████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
      ██╔══╝  ██║     ██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   
      ███████╗███████╗███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   
      ╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝                                                             
 */

/**
 * handle element component processing
 */
export const handleElement: ComponentHandler<ElementTemplate, ElementComponent> = (
  template,
  current,
  parent,
  key,
  ctx
) => {
  const { type, props } = template;

  let children = template.children as Array<Template>;

  const component: ElementComponent = current ?? {
    children: [],
    key,
    parent,
    props,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Element,
    type,
    unmountedChildren: [],
  };

  const tasks = initComponentTasks();

  const innerHTML = props.innerHTML;

  if (!current) {
    const renderTask = createRenderTask(component);

    pushMicroTask(renderTask, tasks);

    if (typeof innerHTML === 'string') {
      const renderInnerHTML = createInnerHTMLTask(component, innerHTML);

      // skip children rendering
      children = [];

      pushMicroTask(renderInnerHTML, tasks);
    }

    const ref = props.ref;

    if (ref && isRefValue(ref)) {
      const refTask = createRefElementTask(component, ref as RefValue);
      pushMicroTask(refTask, tasks);
    }

    //  mounted
    const setMountedTask = createSetMountedTask(component);
    pushMicroTask(setMountedTask, tasks);
  } else {
    if (typeof innerHTML === 'string') {
      if (innerHTML !== component.props['innerHTML']) {
        const renderInnerHTML = createInnerHTMLTask(component, innerHTML);

        pushMicroTask(renderInnerHTML, tasks);

        const unmountChildrenTasks = unmountComponentChildren(component);

        for (const queue of Object.keys(unmountChildrenTasks) as Array<MicroTaskType>) {
          tasks[queue].unshift(...unmountChildrenTasks[queue]);
        }

        children = [];
      }

      // ? if innerHTML is the same, we do not unmount children, because obviously no children were processed
    }

    // perform diffing of props
    const cmp = compareElementProps(component.props, props);

    // if there is a difference, we schedule a micro-task
    if (cmp.length > 0) {
      const updateProps = createElementPropsUpdateTask(component, cmp);

      pushMicroTask(updateProps, tasks);
    }

    // check if there is a new reference
    const oldRef = current.props.ref;
    const newRef = props.ref;

    // does not point to the same object
    if (newRef !== oldRef) {
      if (isRefValue(oldRef)) {
        const unrefTask = createUnrefElementTask(component, oldRef as RefValue);

        pushMicroTask(unrefTask, tasks);
      }

      if (isRefValue(newRef)) {
        const refTask = createRefElementTask(component, newRef as RefValue);

        pushMicroTask(refTask, tasks);
      }
    }

    // override props
    component.props = props;
  }

  return { children, component, tasks, ctx };
};

export const compareElementProps = (current: Props, newest: Props): Array<PropComparison> => {
  return Object.keys({ ...current, ...newest }).reduce((acc, key) => {
    if (RuvyAttributes.includes(key)) {
      return acc;
    }

    // new is missing this attr, we remove it
    if (!hasProperty(newest, key)) {
      acc.push({ key, operation: 'remove' });
    }
    // current is missing the attr, we add it
    else if (!hasProperty(current, key)) {
      acc.push({ key, operation: 'create', value: newest[key] });
    }
    // attribute exists in both, we update if not equal
    else if (!areEqual(current[key], newest[key])) {
      acc.push({ key, operation: 'update', value: newest[key] });
    }

    return acc;
  }, [] as Array<PropComparison>);
};

export const filterDomProps = (props: Props): Record<string, unknown> => {
  return Object.keys(props).reduce((acc, prop) => {
    if (![...RuvyAttributes, 'tag'].includes(prop)) {
      acc[prop] = props[prop];
    }

    return acc;
  }, {} as Record<string, unknown>);
};

/**
      ██████╗  ██████╗  ██████╗ ████████╗
      ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
      ██████╔╝██║   ██║██║   ██║   ██║   
      ██╔══██╗██║   ██║██║   ██║   ██║   
      ██║  ██║╚██████╔╝╚██████╔╝   ██║   
      ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝                                
 */

/**
 * creates root component
 */
export const createRoot = (instance: Element): RootComponent => {
  return {
    children: [],
    instance,
    tag: ComponentTag.Root,
  };
};

/**
      ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗ ███████╗
      ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗██╔════╝
      ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝███████╗
      ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║
      ██║  ██║███████╗███████╗██║     ███████╗██║  ██║███████║
      ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝                                                       
 */

/**
 * create an empty record of tasks
 */
export const initComponentTasks = (): ComponentTasks => ({
  [MicroTaskType.SetComponentMounted]: [],
  [MicroTaskType.RemoveComponent]: [],
  [MicroTaskType.RenderElement]: [],
  [MicroTaskType.RenderInnerHTML]: [],
  [MicroTaskType.RenderText]: [],
  [MicroTaskType.ReorderElements]: [],
  [MicroTaskType.RunEffect]: [],
  [MicroTaskType.RunEffectCleanup]: [],
  [MicroTaskType.UnmountComponent]: [],
  [MicroTaskType.UpdatePortalChildren]: [],
  [MicroTaskType.UpdateProps]: [],
  [MicroTaskType.UpdateText]: [],
  [MicroTaskType.UnmountedComponent]: [],
  [MicroTaskType.RefElement]: [],
  [MicroTaskType.UnrefEelement]: [],
});

/**
 * checks if the given component is a switch controller
 * and the return the switch value within an object,
 * otherwise, `false`.
 */
export const isSwitchController = (
  component: SwitchControllerComponent
): { value: unknown } | false => {
  if (!component.props || !hasProperty(component.props, 'switch')) return false;

  const value = component.props['switch'];

  return { value };
};

export const isHost = (component: Component): boolean =>
  [ComponentTag.Element, ComponentTag.Portal, ComponentTag.Root].includes(component.tag);

export const getParentNode = (component: Component): HostComponent => {
  if (component.tag === ComponentTag.Root) {
    throw new RuvyError('unable to locate the parent node.');
  }

  if (isHost(component.parent)) return component.parent as HostComponent;

  return getParentNode(component.parent);
};

export const getNodeIndex = (
  component: NodeComponent,
  parent?: HostComponent
): { index: number; found: boolean } => {
  let index = 0;
  let wasFound = false;

  const host = parent ?? getParentNode(component);

  for (const child of host.children) {
    if (wasFound) break;

    if (child === component) {
      wasFound = true;
      break;
    }

    if (isHost(child)) {
      index++;
      continue;
    } else {
      const { found, index: i } = getNodeIndex(component, child as HostComponent);

      index += i;

      if (found) {
        wasFound = true;
        break;
      }
    }
  }

  return { index, found: wasFound };
};

export const isRefValue = (v: unknown): boolean => {
  return hasProperty(v, 'value');
};

export const pushMicroTask = (task: MicroTask, target: ComponentTasks) => {
  target[task.type].push(task);
};

export const unmountComponentChildren = (component: Component): ComponentTasks => {
  const tasks = initComponentTasks();

  if (ComponentTag.Null === component.tag || ComponentTag.Text === component.tag) {
    return tasks;
  }

  for (const child of component.children) {
    // TODO: unmount for each type of component
  }

  return tasks;
};

export const isJsxTemplate = (template: Template): boolean => {
  return (
    template !== null &&
    typeof template === 'object' &&
    !Array.isArray(template) &&
    hasProperty(template, 'type') &&
    hasProperty(template, 'props') &&
    hasProperty(template, 'children') &&
    hasProperty(template, 'symbol') &&
    (template as FunctionTemplate).symbol === ComponentSymbol &&
    typeof (template as FunctionTemplate).props === 'object' &&
    Array.isArray((template as FunctionTemplate).children)
  );
};

export const getTagFromTemplate = (template: Template): ComponentTag => {
  if (isJsxTemplate(template)) {
    const temp = template as JsxTemplate;

    if (temp.type === Portal) return ComponentTag.Portal;

    if (temp.type === ComponentTag.Context) return ComponentTag.Context;

    if (temp.type === Outlet) return ComponentTag.Outlet;

    if (temp.type === Fragment) return ComponentTag.Fragment;

    if (temp.type === createFragmentTemplate) return ComponentTag.JsxFragment;

    if (typeof temp.type === 'function') return ComponentTag.Function;

    if (typeof temp.type === 'string') return ComponentTag.Element;
  }

  if (template === false || template === null) return ComponentTag.Null;

  return ComponentTag.Text;
};

export const computeKey = (template: Template, index: number): Key => {
  return isJsxTemplate(template) ? (template as JsxTemplate).key ?? index : index;
};

export const getPropFromTemplate = <T = unknown>(
  template: Template,
  prop: string
): { value: T } | false => {
  if (!isJsxTemplate(template)) return false;

  const { props } = template as JsxTemplate;

  if (!hasProperty(props, prop)) return false;

  return { value: props[prop] as T };
};

export const computeChildrenMap = (component: Component | undefined): ComputedChildrenMap => {
  if (!component) return {};

  if (ComponentTag.Text === component.tag) return {};
  if (ComponentTag.Null === component.tag) return {};

  return component.children.reduce((acc, component, index) => {
    const key = component.key;

    acc[key] = {
      component,
      index,
    };

    return acc;
  }, {} as ComputedChildrenMap);
};

export const processElementTemplateProps = (template: ElementTemplate, ctx: ExecutionContext) => {
  const classProps: Array<{ value: unknown; key: string }> = [];

  const props = Object.keys(template.props).reduce((acc, key) => {
    const value = props[key];

    if (isClassProp(key)) {
      classProps.push({ key, value });

      return acc;
    }

    if (template.type.toLowerCase() === 'a') {
      const href = getPropFromTemplate(template, 'href');

      if (href) {
        // TODO: process href and compute url and
      }
    }

    return acc;
  }, {} as Props);

  if (classProps.length < 0) {
    const className = resolveClassProps(classProps);

    props.class = className;
  }

  if (ctx.ns) {
    props.ns = ctx.ns;
  }

  template.props = props;
};
