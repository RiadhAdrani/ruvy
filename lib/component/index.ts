import { Namespace, isClassProp, resolveClassProps } from '@riadh-adrani/domer';
import { areEqual, hasProperty } from '@riadh-adrani/obj-utils';
import {
  Component,
  ComponentHandler,
  ComponentHandlerResult,
  ComponentStatus,
  ComponentSymbol,
  ComponentTag,
  ComponentTasks,
  ParentComponent,
  ComputedChildrenMap,
  ContextComponent,
  ContextTemplate,
  ElementComponent,
  ElementTemplate,
  ExecutionContext,
  Fragment,
  FragmentComponent,
  FragmentTemplate,
  FunctionComponent,
  FunctionTemplate,
  UseState,
  HostComponent,
  JsxFragmentComponent,
  JsxFragmentTemplate,
  JsxTemplate,
  Key,
  Task,
  TaskType,
  NodeComponent,
  NonRootComponent,
  NullComponent,
  NullTemplate,
  Outlet,
  OutletComponent,
  OutletTemplate,
  Portal,
  PortalComponent,
  PortalTemplate,
  PropComparison,
  Props,
  RefValue,
  RootComponent,
  SwitchControllerComponent,
  Template,
  TextComponent,
  TextTemplate,
  UnmountComponentData,
  StateHook,
  HookType,
  CreateState,
  EffectHook,
  HookCaller,
  Effect,
  MemoHook,
  RefHook,
  ContextObject,
  CreateContextComponentProviderProps,
  ContextHook,
  JsxComponent,
  NodeTemplate,
  IfDirectiveSequence,
  IfDirectiveProcessResult,
  ValueOrFalse,
} from '@/types.js';
import {
  createEffectCleanUpTask,
  createEffectTask,
  createElementPropsUpdateTask,
  createInnerHTMLTask,
  createMovePortalChildren,
  createRefElementTask,
  createRenderTask,
  createSetMountedTask,
  createTextTask,
  createUnmountComponentTask,
  createUnrefElementTask,
  createUpdateTextTask,
  createChangeElementPosition,
} from './task.js';
import { RuvyError, generateId, moveElement } from '@/helpers/helpers.js';
import { createFragmentTemplate } from './jsx.js';
import { createDestination, getTemplateByDepth } from '@/router/router.js';
import { DestinationRequest } from '@riadh-adrani/dom-router';

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

export const handleComponent = <T extends NonRootComponent = NonRootComponent>(
  template: Template,
  current: NonRootComponent | undefined,
  parent: ParentComponent,
  index: number,
  ctx: ExecutionContext
): ComponentHandlerResult<T> => {
  const tag = getTagFromTemplate(template);

  const key = computeKey(template, index);

  const handler = handlerMap[tag];

  const res = handler(template, current, parent, key, ctx);

  if (!current) {
    const mountedTask = createSetMountedTask(res.component);

    pushTask(mountedTask, res.tasks);
  }

  if (isParentComponent(res.component)) {
    processChildren(res as ComponentHandlerResult<ParentComponent>);
  }

  return res as ComponentHandlerResult<T>;
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
  _ctx
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
    position: _ctx.dom.nextIndex,
    domParent: _ctx.dom.parent,
  };

  const tasks = initComponentTasks();

  const innerHTML = props.innerHTML;

  if (!current) {
    const renderTask = createRenderTask(component);

    pushTask(renderTask, tasks);

    if (typeof innerHTML === 'string') {
      const renderInnerHTML = createInnerHTMLTask(component, innerHTML);

      // skip children rendering
      children = [];

      pushTask(renderInnerHTML, tasks);
    }

    const ref = props.ref;

    if (isRefValue(ref)) {
      const refTask = createRefElementTask(component, ref);
      pushTask(refTask, tasks);
    }
  } else {
    if (typeof innerHTML === 'string') {
      if (innerHTML !== component.props['innerHTML']) {
        const renderInnerHTML = createInnerHTMLTask(component, innerHTML);

        pushTask(renderInnerHTML, tasks);

        // ? set empty array, children will be unmounted in handleComponent
        children = [];
      }

      // ? if innerHTML is the same, we do not unmount children, because obviously no children were processed
    }

    // perform diffing of props
    const cmp = compareElementProps(component.props, props);

    // if there is a difference, we schedule a micro-task
    if (cmp.length > 0) {
      const updateProps = createElementPropsUpdateTask(component, cmp);

      pushTask(updateProps, tasks);
    }

    // check if there is a new reference
    const oldRef = current.props.ref;
    const newRef = props.ref;

    // does not point to the same object
    if (newRef !== oldRef) {
      if (isRefValue(oldRef)) {
        const unrefTask = createUnrefElementTask(component, oldRef as RefValue);

        pushTask(unrefTask, tasks);
      }

      if (isRefValue(newRef)) {
        const refTask = createRefElementTask(component, newRef as RefValue);

        pushTask(refTask, tasks);
      }
    }

    // override props
    component.props = props;

    // check position
    if (component.position !== _ctx.dom.nextIndex) {
      const changePositionTask = createChangeElementPosition(component, _ctx.dom.nextIndex);

      pushTask(changePositionTask, tasks);

      component.position = _ctx.dom.nextIndex;
    }
  }

  // create a new ctx
  const ctx = cloneExecutionContext(
    _ctx,
    ctx =>
      (ctx.dom = {
        nextIndex: 0,
        parent: component,
      })
  );

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
       ██████╗ ██████╗ ███╗   ██╗████████╗███████╗██╗  ██╗████████╗
      ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
      ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗   ╚███╔╝    ██║   
      ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗    ██║   
      ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██╔╝ ██╗   ██║   
       ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝                                                            
 */

export const handleContext: ComponentHandler<ContextTemplate, ContextComponent> = (
  template,
  current,
  parent,
  key,
  _ctx
) => {
  const { props, type } = template;

  const children = template.children as Array<Template>;

  const tasks = initComponentTasks();

  const component = current ?? {
    children: [],
    key,
    parent,
    props,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Context,
    type,
  };

  if (current) {
    component.props = props;
  }

  const id = props.ctx.id;

  const ctx: ExecutionContext = cloneExecutionContext(
    _ctx,
    ctx => (ctx.contexts[id] = props.value)
  );

  return { children, component, ctx, tasks };
};

/**
      ███████╗██████╗  █████╗  ██████╗ ███╗   ███╗███████╗███╗   ██╗████████╗
      ██╔════╝██╔══██╗██╔══██╗██╔════╝ ████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
      █████╗  ██████╔╝███████║██║  ███╗██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
      ██╔══╝  ██╔══██╗██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   
      ██║     ██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   
      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝                                                                      
 */
export const handleFragment: ComponentHandler<FragmentTemplate, FragmentComponent> = (
  template,
  current,
  parent,
  key,
  ctx
) => {
  const { props, type } = template;

  const children = template.children as Array<Template>;

  const tasks = initComponentTasks();

  const component: FragmentComponent = current ?? {
    children: [],
    key,
    parent,
    type,
    props,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Fragment,
  };

  if (current) {
    component.props = props;
  }

  return { children, component, ctx, tasks };
};

export const handleJsxFragment: ComponentHandler<JsxFragmentTemplate, JsxFragmentComponent> = (
  template,
  current,
  parent,
  key,
  ctx
) => {
  const { props, type } = template;

  const children = template.children as Array<Template>;

  const tasks = initComponentTasks();

  const component: JsxFragmentComponent = current ?? {
    children: [],
    key,
    props,
    parent,
    type,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.JsxFragment,
  };

  return { children, component, ctx, tasks };
};

/**
      ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
      ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
      █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║
      ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║
      ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
      ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝                                                               
 */

export const handleFunction: ComponentHandler<FunctionTemplate, FunctionComponent> = (
  template,
  current,
  parent,
  key,
  ctx
) => {
  const tasks = initComponentTasks();

  const { props, type } = template;

  const component = current ?? {
    children: [],
    hooks: [],
    key,
    parent,
    props,
    type,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Function,
    ctx: cloneExecutionContext(ctx),
  };

  if (current) {
    // override props
    component.props = props;

    // update context
    component.ctx = ctx;
  }

  const child = withHookContext({ component, tasks, ctx }, () => type(props));

  return { children: [child], component, ctx, tasks };
};

/**
      ███╗   ██╗██╗   ██╗██╗     ██╗     
      ████╗  ██║██║   ██║██║     ██║     
      ██╔██╗ ██║██║   ██║██║     ██║     
      ██║╚██╗██║██║   ██║██║     ██║     
      ██║ ╚████║╚██████╔╝███████╗███████╗
      ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝                                   
 */

/**
 * handle nullish components
 */
export const handleNull: ComponentHandler<NullTemplate, NullComponent> = (
  _,
  current,
  parent,
  key,
  ctx
) => {
  const tasks = initComponentTasks();

  const component = current ?? {
    key,
    parent,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Null,
  };

  return { component, children: [], ctx, tasks };
};

/**
       ██████╗ ██╗   ██╗████████╗██╗     ███████╗████████╗
      ██╔═══██╗██║   ██║╚══██╔══╝██║     ██╔════╝╚══██╔══╝
      ██║   ██║██║   ██║   ██║   ██║     █████╗     ██║   
      ██║   ██║██║   ██║   ██║   ██║     ██╔══╝     ██║   
      ╚██████╔╝╚██████╔╝   ██║   ███████╗███████╗   ██║   
       ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝   ╚═╝                                                       
 */
export const handleOutlet: ComponentHandler<OutletTemplate, OutletComponent> = (
  template,
  current,
  parent,
  key,
  _ctx
) => {
  const tasks = initComponentTasks();

  const { props, type } = template;

  const component = current ?? {
    children: [],
    key,
    parent,
    props,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Outlet,
    type,
  };

  if (current) {
    component.props = props;
  }

  const depth = (_ctx.outletDepth ?? -1) + 1;

  const child = getTemplateByDepth(depth);

  const ctx: ExecutionContext = {
    ..._ctx,
    outletDepth: depth,
  };

  return { children: [child], ctx, component, tasks };
};

/**
      ██████╗  ██████╗ ██████╗ ████████╗ █████╗ ██╗     
      ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔══██╗██║     
      ██████╔╝██║   ██║██████╔╝   ██║   ███████║██║     
      ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══██║██║     
      ██║     ╚██████╔╝██║  ██║   ██║   ██║  ██║███████╗
      ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝                                            
 */
export const handlePortal: ComponentHandler<PortalTemplate, PortalComponent> = (
  template,
  current,
  parent,
  key,
  _ctx
) => {
  const { type, props } = template;

  const { children, container } = props;

  const tasks = initComponentTasks();

  const component: PortalComponent = current ?? {
    children: [],
    key,
    parent,
    props,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Portal,
    instance: container,
    type,
  };

  if (current) {
    const newContainer = props.container;
    const currentContainer = component.props.container;

    if (newContainer !== currentContainer) {
      component.instance = newContainer;

      const movePortal = createMovePortalChildren(component);

      pushTask(movePortal, tasks);
    }

    component.props = props;
  }

  const ctx: ExecutionContext = {
    ..._ctx,
    dom: {
      ..._ctx.dom,
      parent: component,
    },
  };

  return { component, children, ctx, tasks };
};

/**
      ████████╗███████╗██╗  ██╗████████╗
      ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
         ██║   █████╗   ╚███╔╝    ██║   
         ██║   ██╔══╝   ██╔██╗    ██║   
         ██║   ███████╗██╔╝ ██╗   ██║   
         ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝                               
 */

/**
 * handle text component creation and update
 */
export const handleText: ComponentHandler<TextTemplate, TextComponent> = (
  template,
  current,
  parent,
  key,
  ctx
) => {
  const text = `${template}`;

  const tasks = initComponentTasks();

  const component = current ?? {
    key,
    parent,
    status: ComponentStatus.Mounting,
    tag: ComponentTag.Text,
    text,
    position: ctx.dom.nextIndex,
    domParent: ctx.dom.parent,
  };

  if (!current) {
    const renderTask = createTextTask(component);

    pushTask(renderTask, tasks);
  } else {
    // check data is different
    if (text !== component.text) {
      component.text = text;

      const updateTask = createUpdateTextTask(component, text);

      pushTask(updateTask, tasks);
    }

    if (ctx.dom.nextIndex !== component.position) {
      const changePositionTask = createChangeElementPosition(component, ctx.dom.nextIndex);

      pushTask(changePositionTask, tasks);

      component.position = ctx.dom.nextIndex;
    }
  }

  return { component, ctx, children: [], tasks };
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
 * select component handler
 */
const handlerMap = {
  [ComponentTag.Element]: handleElement,
  [ComponentTag.Context]: handleContext,
  [ComponentTag.Fragment]: handleFragment,
  [ComponentTag.JsxFragment]: handleJsxFragment,
  [ComponentTag.Function]: handleFunction,
  [ComponentTag.Outlet]: handleOutlet,
  [ComponentTag.Text]: handleText,
  [ComponentTag.Null]: handleNull,
  [ComponentTag.Portal]: handlePortal,
} as Record<string, ComponentHandler<Template, NonRootComponent>>;

/**
 * create an empty record of tasks
 */
export const initComponentTasks = (): ComponentTasks => ({
  [TaskType.SetComponentMounted]: [],
  [TaskType.RemoveComponent]: [],
  [TaskType.RenderElement]: [],
  [TaskType.RenderInnerHTML]: [],
  [TaskType.RenderText]: [],
  [TaskType.ReorderElements]: [],
  [TaskType.RunEffect]: [],
  [TaskType.RunEffectCleanup]: [],
  [TaskType.UnmountComponent]: [],
  [TaskType.UpdatePortalChildren]: [],
  [TaskType.UpdateProps]: [],
  [TaskType.UpdateText]: [],
  [TaskType.UnmountedComponent]: [],
  [TaskType.RefElement]: [],
  [TaskType.UnrefEelement]: [],
  [TaskType.ChangeElementPosition]: [],
});

export const isJsxComponent = (component: Component): component is JsxComponent => {
  return [
    ComponentTag.Function,
    ComponentTag.Element,
    ComponentTag.Portal,
    ComponentTag.Portal,
    ComponentTag.Fragment,
    ComponentTag.JsxFragment,
    ComponentTag.Context,
    ComponentTag.Outlet,
  ].includes(component.tag);
};

export const isNodeTemplate = (template: Template): template is NodeTemplate =>
  [ComponentTag.Text, ComponentTag.Element].includes(getTagFromTemplate(template));

/**
 * checks if the given component is a switch controller
 * and the return the switch value within an object,
 * otherwise, `false`.
 */
export const isSwitchController = (component: Component): ValueOrFalse => {
  if (!isJsxComponent(component) || !hasProperty(component.props, 'switch')) return false;

  const value = component.props['switch'];

  return { value };
};

export const isNodeComponent = (component: Component): component is NodeComponent =>
  [ComponentTag.Element, ComponentTag.Text].includes(component.tag);

export const isHostComponent = (component: Component): component is HostComponent =>
  [ComponentTag.Element, ComponentTag.Portal, ComponentTag.Root].includes(component.tag);

export const getHostingComponent = (component: Component): HostComponent => {
  if (component.tag === ComponentTag.Root) {
    throw new RuvyError('unable to locate the parent node.');
  }

  if (isHostComponent(component.parent)) return component.parent;

  return getHostingComponent(component.parent);
};

export const isRefValue = (v: unknown): v is RefValue => {
  return hasProperty(v, 'value');
};

export const pushTask = (task: Task, target: ComponentTasks) => {
  target[task.type].push(task);
};

export const pushBlukTasks = (tasks: ComponentTasks, target: ComponentTasks) => {
  for (const queue of Object.keys(tasks) as Array<TaskType>) {
    target[queue].push(...tasks[queue]);
  }
};

export const unmountComponent = (
  component: NonRootComponent,
  data: UnmountComponentData
): ComponentTasks => {
  const tasks = initComponentTasks();

  const childrenData = { ...data };

  component.status = ComponentStatus.Unmounting;

  if (component.tag === ComponentTag.Function) {
    component.hooks.forEach(it => {
      if (it.type === HookType.Effect && typeof it.cleanup === 'function') {
        // cleanup effect
        const cleanupTask = createEffectCleanUpTask(component, it);

        pushTask(cleanupTask, tasks);
      }
    });
  }

  const unmountTask = createUnmountComponentTask(component, data);

  pushTask(unmountTask, tasks);

  // unmount for children
  if (isParentComponent(component)) {
    component.children.forEach(child => {
      const t = unmountComponent(child, childrenData);

      // push them in tasks
      pushBlukTasks(t, tasks);
    });
  }

  return tasks;
};

export const isJsxTemplate = (template: unknown): template is JsxTemplate => {
  return (
    template !== null &&
    typeof template === 'object' &&
    !Array.isArray(template) &&
    hasProperty(template, 'type') &&
    hasProperty(template, 'props') &&
    hasProperty(template, 'children') &&
    hasProperty(template, 'symbol') &&
    (template as JsxTemplate).symbol === ComponentSymbol &&
    typeof (template as JsxTemplate).props === 'object' &&
    Array.isArray((template as JsxTemplate).children)
  );
};

export const getTagFromTemplate = (template: Template): ComponentTag => {
  if (isJsxTemplate(template)) {
    if (template.type === Portal) return ComponentTag.Portal;

    if (template.type === ComponentTag.Context) return ComponentTag.Context;

    if (template.type === Outlet) return ComponentTag.Outlet;

    if (template.type === Fragment) return ComponentTag.Fragment;

    if (template.type === createFragmentTemplate) return ComponentTag.JsxFragment;

    if (typeof template.type === 'function') return ComponentTag.Function;

    if (typeof template.type === 'string') return ComponentTag.Element;
  }

  if ([null, false, undefined].includes(template as NullTemplate)) return ComponentTag.Null;

  return ComponentTag.Text;
};

export const isParentComponent = (component: Component): component is ParentComponent => {
  return [
    ComponentTag.Fragment,
    ComponentTag.JsxFragment,
    ComponentTag.Element,
    ComponentTag.Function,
    ComponentTag.Context,
    ComponentTag.Function,
    ComponentTag.Portal,
    ComponentTag.Outlet,
  ].includes(component.tag);
};

export const computeKey = (template: Template, index: number): Key => {
  return isJsxTemplate(template) ? template.key ?? index : index;
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

export const computeChildrenMap = (component: Component): ComputedChildrenMap => {
  if (!isParentComponent(component)) {
    return {};
  }

  return component.children.reduce((acc, component, index) => {
    const key = component.key;

    acc[key] = {
      component,
      index,
    };

    // ! we need to set it now, later, we change this if component is reused
    component.status = ComponentStatus.Unmounting;

    return acc;
  }, {} as ComputedChildrenMap);
};

export const processElementTemplateProps = (template: ElementTemplate, ctx: ExecutionContext) => {
  const classProps: Array<{ value: unknown; key: string }> = [];

  if (typeof template.props.tag === 'string') {
    template.type = template.props.tag;
  }

  const props = Object.keys(template.props).reduce((acc, key) => {
    const value = template.props[key];

    if (isClassProp(key)) {
      classProps.push({ key, value });
    } else if (key === 'href' && template.type.toLowerCase() === 'a') {
      const href = getPropFromTemplate(template, 'href');

      if (href) {
        acc[key] = createDestination(href.value as DestinationRequest);
      }
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as Props);

  if (classProps.length > 0) {
    const className = resolveClassProps(classProps);

    props.class = className;
  }

  // default namespace to HTML
  props.ns = ctx.ns ?? props.ns ?? Namespace.HTML;

  template.props = props;
};

export const processSwitchDirective = (
  child: Template,
  index: number,
  siblingsCount: number,
  switchValue: unknown,
  switchFulfilled: boolean
): boolean => {
  // we are inside a switch control

  // check if switch is already fullfilled
  if (switchFulfilled) {
    return true;
  } else {
    // check if there is a "case" prop
    const caseValue = getPropFromTemplate(child, 'case');

    if (caseValue) {
      const doMatch = caseValue.value === switchValue;

      return !doMatch;
    } else {
      // we should check if we are at the last element
      const isLast = index === siblingsCount - 1;

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

      // nullify is false
      return false;
    }
  }
};

export const processIfDirective = (
  keyword: 'if' | 'else-if' | 'else',
  value: unknown,
  sequence: IfDirectiveSequence
): IfDirectiveProcessResult => {
  const fullfilled = Boolean(value);

  if (keyword === 'if') {
    return {
      nullify: !fullfilled,
      sequence: {
        fullfilled,
        last: 'if',
      },
    };
  } else {
    if (sequence === false) {
      throw new RuvyError(
        'cannot use "else" or "else-if" directives outside a conditional sequence'
      );
    }

    if (keyword === 'else-if' && sequence.last === 'else') {
      throw new RuvyError('cannot use "else-if" directive after "else" directive');
    }

    // already fullfilled
    if (sequence.fullfilled) {
      return {
        nullify: true,
        sequence: {
          fullfilled: true,
          last: keyword,
        },
      };
    }

    if (keyword === 'else-if') {
      return {
        nullify: !fullfilled,
        sequence: {
          fullfilled,
          last: 'else-if',
        },
      };
    }

    // else
    return {
      nullify: !fullfilled,
      sequence: false,
    };
  }
};

export const processChildren = (res: ComponentHandlerResult<ParentComponent>): boolean => {
  const parent = res.component as ParentComponent;

  const switchControl = isSwitchController(parent as SwitchControllerComponent);

  let switchFulfilled = switchControl === false;

  let ifSequence: IfDirectiveSequence = false;

  const childrenMap = computeChildrenMap(parent);

  const childrenKeys = new Set<Key>([]);

  const childrenCount = res.children.length;

  let shouldReorder = false;

  let domIndex = isHostComponent(res.component) ? 0 : res.ctx.dom.nextIndex;

  for (let i = 0; i < childrenCount; i++) {
    const child = res.children[i];

    let nullify = false;

    // ? switch directive
    if (switchControl) {
      nullify = processSwitchDirective(
        child,
        i,
        childrenCount,
        switchControl.value,
        switchFulfilled
      );

      if (!nullify) {
        switchFulfilled = true;
      }
    }

    const key = computeKey(child, i);

    if (childrenKeys.has(key)) {
      throw new RuvyError(
        `duplicate key "${key}" detected. make sure to assign unique keys for each child. if key is not defined, the framework will use the component index as a key instead.`
      );
    }

    childrenKeys.add(key);

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

    if (ifDirectiveCount === 1) {
      const keyword = ifValue ? 'if' : elseIfValue ? 'else-if' : 'else';
      const value = ifValue ? ifValue.value : elseIfValue ? elseIfValue.value : true;

      const ifDir = processIfDirective(keyword, value, ifSequence);

      ifSequence = ifDir.sequence;
      nullify = ifDir.nullify;
    } else {
      ifSequence = false;
    }

    // re-evaluate the template
    template = nullify ? null : template;

    const childTag = getTagFromTemplate(template);

    // check if we have an element template, which needs some props processing
    if (childTag === ComponentTag.Element) {
      processElementTemplateProps(template as ElementTemplate, res.ctx);
    }

    let childRes: ComponentHandlerResult<Component>;

    const ctx = cloneExecutionContext(res.ctx, ctx => (ctx.dom.nextIndex = domIndex));

    if (isNodeTemplate(template)) {
      domIndex++;
    }

    // try and find the corresponding component
    const oldComponent = childrenMap[key];

    if (!oldComponent || shouldRenderNewComponent(template, oldComponent.component)) {
      childRes = handleComponent(template, undefined, parent, i, ctx);

      shouldReorder = true;

      const insertedAt = parent.children.length;

      parent.children.push(childRes.component as NonRootComponent);

      // ! we need to insert the component at the correct position
      if (i !== insertedAt) {
        parent.children = moveElement(parent.children, insertedAt, i);
      }
    } else {
      // mark the old component as mounted, so we don't unmount it
      oldComponent.component.status = ComponentStatus.Mounted;

      childRes = handleComponent(template, oldComponent.component, parent, i, res.ctx);

      if (parent.children.indexOf(oldComponent.component) !== i) {
        // need to change element position
        shouldReorder = true;

        parent.children = moveElement(parent.children, oldComponent.index, i);
      }
    }

    domIndex = isNodeComponent(childRes.component) ? domIndex : childRes.ctx.dom.nextIndex;

    // push tasks
    pushBlukTasks(childRes.tasks, res.tasks);
  }

  // remove unused from the array of children
  res.component.children = res.component.children.filter(child => {
    if (child.status === ComponentStatus.Unmounting) {
      const unmountTasks = unmountComponent(child, {});

      pushBlukTasks(unmountTasks, res.tasks);

      return false;
    }

    return true;
  });

  if (!isNodeComponent(res.component)) {
    res.ctx.dom.nextIndex = domIndex;
  }

  return shouldReorder;
};

export const cloneExecutionContext = (
  current: ExecutionContext,
  then?: (ctx: ExecutionContext) => void
) => {
  const ctx: ExecutionContext = {
    ...current,
    contexts: {
      ...current.contexts,
    },
    dom: {
      ...current.dom,
    },
  };

  then?.(ctx);

  return ctx;
};

export const shouldRenderNewComponent = (template: Template, current: Component): boolean => {
  const tag = getTagFromTemplate(template);

  if (tag !== current.tag) {
    return true;
  }

  if (!isJsxTemplate(template)) {
    return false;
  }

  const c = current as JsxComponent;

  if (template.type === c.type) {
    if (c.tag === ComponentTag.Element && (template.props.ns ?? Namespace.HTML) !== c.props.ns) {
      return true;
    } else {
      return false;
    }
  }

  return true;
};

export const getClosestNodeComponents = (component: NonRootComponent): Array<NodeComponent> => {
  if (!isParentComponent(component)) return [];

  if (component.children) {
    return component.children.reduce((acc, child) => {
      if (isNodeComponent(child)) {
        acc.push(child);
      }

      acc.push(...getClosestNodeComponents(child));

      return acc;
    }, [] as Array<NodeComponent>);
  }

  return [];
};

/**
      ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗███████╗
      ██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝
      ███████║██║   ██║██║   ██║█████╔╝ ███████╗
      ██╔══██║██║   ██║██║   ██║██╔═██╗ ╚════██║
      ██║  ██║╚██████╔╝╚██████╔╝██║  ██╗███████║
      ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝                                          
 */

/**
 * current hook index
 */
let hookIndex = -1;
let caller: HookCaller | undefined;

export const withHookContext = (hookCaller: HookCaller, callback: () => Template): Template => {
  caller = hookCaller;

  const out = callback();

  caller = undefined;
  hookIndex = -1;

  return out;
};

export const useState = <T = unknown>(create: CreateState<T>): UseState<T> => {
  if (!caller) {
    throw new RuvyError('cannot call "useState" outisde of a functional component body.');
  }

  const component = caller.component;

  // increment hook index
  hookIndex++;

  let hook: StateHook;

  // if component is not mounted, this is the first time
  if (caller.component.status === ComponentStatus.Mounting) {
    const value = typeof create === 'function' ? (create as () => unknown)() : create;

    hook = {
      type: HookType.State,
      value,
      getValue: () => hook.value,
      setValue: setter => {
        if (
          component.status === ComponentStatus.Unmounting ||
          component.status === ComponentStatus.Unmounted
        ) {
          // ? useless to update state
          return;
        }

        let newValue: unknown;

        if (typeof setter === 'function') {
          newValue = (setter as (v: unknown) => unknown)(hook.value);
        } else {
          newValue = setter;
        }

        if (!areEqual(hook.value, newValue)) {
          // TODO: schedule UI update
          hook.value = newValue;
        }
      },
    };

    caller.component.hooks.push(hook);
  } else {
    hook = caller.component.hooks[hookIndex] as StateHook;
  }

  if (!hook || hook.type !== HookType.State) {
    throw new RuvyError('unexpected hook type : expected state but got something else.');
  }

  return [hook.value, hook.setValue, hook.getValue] as UseState<T>;
};

export const useEffect = (callback: Effect, deps?: unknown): void => {
  if (!caller) {
    throw new RuvyError('cannot call "useEffect" outisde of a functional component body.');
  }

  // increment hook index
  hookIndex++;

  let hook: EffectHook;

  if (caller.component.status === ComponentStatus.Mounting) {
    hook = {
      callback,
      deps,
      type: HookType.Effect,
    };

    caller.component.hooks.push(hook);

    // schedule
    const effectTask = createEffectTask(caller.component, hook);

    pushTask(effectTask, caller.tasks);
  } else {
    // check if deps changed
    hook = caller.component.hooks[hookIndex] as EffectHook;

    if (!hook || hook.type !== HookType.Effect) {
      throw new RuvyError('unexpected hook type : expected effect but got something else.');
    }

    // compare deps
    if (!areEqual(deps, hook.deps)) {
      if (typeof hook.cleanup === 'function') {
        const cleanupTask = createEffectCleanUpTask(caller.component, hook);

        pushTask(cleanupTask, caller.tasks);
      }

      hook.callback = callback;
      hook.deps = deps;

      // schedule
      const effectTask = createEffectTask(caller.component, hook);

      pushTask(effectTask, caller.tasks);
    }
  }
};

export const useMemo = <T = unknown>(callback: () => T, deps?: unknown): T => {
  if (!caller) {
    throw new RuvyError('cannot call "useMemo" outisde of a functional component body.');
  }

  // increment hook index
  hookIndex++;

  let hook: MemoHook;

  if (caller.component.status === ComponentStatus.Mounting) {
    const value = callback();

    hook = {
      type: HookType.Memo,
      deps,
      value,
    };

    caller.component.hooks.push(hook);
  } else {
    // check if deps changed
    hook = caller.component.hooks[hookIndex] as MemoHook;

    if (!hook || hook.type !== HookType.Memo) {
      throw new RuvyError('unexpected hook type : expected memo but got something else.');
    }

    if (!areEqual(hook.deps, deps)) {
      hook.value = callback();
      hook.deps = deps;
    }
  }

  return hook.value as T;
};

export const useCallback = <T = () => void>(callback: T, deps?: unknown): T => {
  return useMemo(() => callback, deps);
};

export const useRef = <T = unknown>(value?: T): RefValue<T> => {
  if (!caller) {
    throw new RuvyError('cannot call "useRef" outisde of a functional component body.');
  }

  // increment hook index
  hookIndex++;

  let hook: RefHook;

  if (caller.component.status === ComponentStatus.Mounting) {
    hook = {
      type: HookType.Ref,
      value: { value },
    };

    caller.component.hooks.push(hook);
  } else {
    // check if deps changed
    hook = caller.component.hooks[hookIndex] as RefHook;

    if (!hook || hook.type !== HookType.Ref) {
      throw new RuvyError('unexpected hook type : expected ref but got something else.');
    }
  }

  return hook.value as RefValue<T>;
};

export const createContextProviderComponent = <T>({
  value,
  children,
  ctx,
}: CreateContextComponentProviderProps<T>) => {
  return createJsxElement(ComponentTag.Context, { value, ctx }, ...(children ?? []));
};

export const useContext = <T>(obj: ContextObject<T>): T => {
  // find the context in the execution context
  if (!caller) {
    throw new RuvyError('cannot call "useContext" outisde of a functional component body.');
  }

  // increment hook index
  hookIndex++;

  let hook: ContextHook;

  if (caller.component.status === ComponentStatus.Mounting) {
    hook = {
      type: HookType.Context,
      value: obj as ContextObject,
    };

    caller.component.hooks.push(hook);
  } else {
    hook = caller.component.hooks[hookIndex] as ContextHook;

    if (!hook || hook.type !== HookType.Context) {
      throw new RuvyError('unexpected hook type : expected context but got something else.');
    }
  }

  const ctx = caller.ctx.contexts;

  if (!hasProperty(ctx, obj.id)) {
    throw new RuvyError('unable to find a context with the given object');
  }

  return ctx[obj.id] as T;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContext = <T = unknown>(_init?: T): ContextObject<T> => {
  const ctx: ContextObject = {
    id: generateId(),
    Provider: ({ value, children }) => {
      return createContextProviderComponent({ value, children, ctx });
    },
    use: () => {
      return useContext(ctx);
    },
  };

  return ctx as ContextObject<T>;
};
