import { areEqual, hasProperty } from '@riadh-adrani/obj-utils';
import {
  Component,
  ComponentHandler,
  ComponentStatus,
  ComponentTag,
  ComponentTasks,
  ElementComponent,
  ElementTemplate,
  HostComponent,
  MicroTask,
  MicroTaskType,
  NodeComponent,
  PropComparison,
  Props,
  RefValue,
  RootComponent,
  SwitchControllerComponent,
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

  let children = template.children;

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
  if (!hasProperty(component.props, 'switch')) return false;

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
