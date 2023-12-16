import { areEqual, hasProperty } from '@riadh-adrani/obj-utils';
import {
  Component,
  ComponentHandler,
  ComponentStatus,
  ComponentTag,
  ElementComponent,
  ElementTemplate,
  HostComponent,
  MicroTask,
  MicroTaskType,
  NodeComponent,
  PropComparison,
  Props,
  RootComponent,
  SwitchableComponent,
} from '@type';
import { createElementPropsUpdateTask, createInnerHTMLTask, createRenderTask } from './task.js';
import { RuvyError } from '@/helpers.js';

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

  const tasks = createTaskObj();

  const innerHTML = props.innerHTML;

  /**
   * should we assign to a new ref
   */
  const ref = false;

  /**
   * should we unref the old reference
   */
  const unref = false;

  if (!current) {
    const renderTask = createRenderTask(component);

    tasks[MicroTaskType.RenderElement].push(renderTask);

    if (typeof innerHTML === 'string') {
      const renderInnerHTML = createInnerHTMLTask(component, innerHTML);

      children = [];

      tasks[MicroTaskType.RenderInnerHTML].push(renderInnerHTML);
    }
  } else {
    if (typeof innerHTML === 'string') {
      if (innerHTML !== component.props['innerHTML']) {
        const renderInnerHTML = createInnerHTMLTask(component, innerHTML);

        tasks[MicroTaskType.RenderInnerHTML].push(renderInnerHTML);
      }

      children = [];
    }

    // perform diffing of props
    const cmp = compareElementProps(component.props, current.props);

    // if there is a difference, we schedule a micro-task
    if (cmp.length > 0) {
      const updateProps = createElementPropsUpdateTask(component, cmp);

      tasks[MicroTaskType.UpdateProps].push(updateProps);
    }

    // override props
    component.props = props;
  }

  if (unref) {
    // TODO: unref old reference
  }

  if (ref) {
    // TODO: assign ref task
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

export const filterDomProps = (component: ElementComponent): Record<string, unknown> => {
  return Object.keys(component.props).reduce((acc, prop) => {
    if (![...RuvyAttributes, 'tag'].includes(prop)) {
      acc[prop] = component.props[prop];
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

const createTaskObj = (): Record<MicroTaskType, Array<MicroTask>> => ({
  [MicroTaskType.MountedComponent]: [],
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
});

export const isSwitchComponent = (component: SwitchableComponent): { value: unknown } | false => {
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
