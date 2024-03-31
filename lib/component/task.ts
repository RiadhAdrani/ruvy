import {
  ComponentStatus,
  ElementComponent,
  Task,
  TaskType,
  NonRootComponent,
  PropComparison,
  RefValue,
  UnmountComponentData,
  TextComponent,
  FunctionComponent,
  EffectHook,
  PortalComponent,
  NodeComponent,
  Composable,
  ErrorBoundaryComponent,
} from '../types.js';
import {
  element,
  insertNode,
  extractEventDetails,
  removeEventListener,
  setEventListener,
  removeAttribute,
  removeNode,
  changeNodePosition,
  text,
  setAttribute,
} from '@riadh-adrani/domer';
import {
  computeNodeComponentIndexInDOM,
  filterDomProps,
  getClosestNodeComponents,
  getHostingComponent,
  isNodeComponent,
} from './index.js';
import { RuvyError, generateId } from '../helpers/helpers.js';

export const createTask = (data: Pick<Task, 'execute' | 'component' | 'type'>): Task => {
  return {
    date: new Date(),
    id: generateId(),
    ...data,
  };
};

export const createRenderTask = (component: ElementComponent): Task => {
  // filter events and attributes
  const props = filterDomProps(component.props);

  const execute = () => {
    const instance = element(component.type, props);

    const host = getHostingComponent(component);

    if (!host.instance) {
      throw new RuvyError('unable to find element hosting parent.');
    }

    const { index } = computeNodeComponentIndexInDOM(component);

    insertNode(instance, host.instance, index);

    component.instance = instance;

    component.status = ComponentStatus.Mounted;
  };

  return createTask({ component, execute, type: TaskType.RenderElement });
};

export const createInnerHTMLTask = (component: ElementComponent, innerHTML: string): Task => {
  const execute = () => {
    const element = component.instance as Element;

    if (!element) {
      throw new RuvyError('unable to set innerHTML, component is not yet mounted.');
    }

    element.innerHTML = innerHTML;
  };

  return createTask({ component, execute, type: TaskType.RenderInnerHTML });
};

export const createElementPropsUpdateTask = (
  component: ElementComponent,
  comparison: Array<PropComparison>
): Task => {
  const execute = () => {
    const element = component.instance as Element;

    if (!element) {
      throw new RuvyError('unable to update element, component is not yet mounted.');
    }

    for (const item of comparison) {
      const { key, operation } = item;

      const eventDetails = extractEventDetails(key);

      // it is an event
      if (eventDetails) {
        const { event } = eventDetails;

        if (operation === 'create' || operation === 'update') {
          setEventListener(key, event, item.value, element);
        } else {
          removeEventListener(key, event, element);
        }
      }
      // it is a prop
      else {
        if (operation === 'create' || operation === 'update') {
          setAttribute(key, item.value, element);
        } else {
          removeAttribute(key, element);
        }
      }
    }
  };

  return createTask({ component, execute, type: TaskType.UpdateProps });
};

export const createRefElementTask = (component: ElementComponent, ref: RefValue): Task => {
  const execute = () => {
    const element = component.instance as Element;

    if (!element) {
      throw new RuvyError('unable to set reference, component is not yet mounted.');
    }

    ref.value = element;
  };

  return createTask({ execute, component, type: TaskType.RefElement });
};

export const createUnrefElementTask = (component: ElementComponent, ref: RefValue): Task => {
  const execute = () => {
    ref.value = undefined;
  };

  return createTask({ execute, component, type: TaskType.UnrefEelement });
};

export const createSetMountedTask = (component: NonRootComponent): Task => {
  const execute = () => {
    component.status = ComponentStatus.Mounted;
  };

  return createTask({ execute, component, type: TaskType.SetComponentMounted });
};

export const createUnmountComponentTask = (
  component: NonRootComponent,
  data: UnmountComponentData
): Task => {
  const execute = () => {
    if (isNodeComponent(component) && !data.isHostParentUnmounting) {
      const element = component.instance;

      if (!element) {
        throw new RuvyError('unable to unmount node, component instance does not exist.');
      }

      removeNode(element);
    }

    component.status = ComponentStatus.Unmounted;
  };

  return createTask({ execute, component, type: TaskType.UnmountComponent });
};

export const createReorderChildrenTask = (component: NonRootComponent): Task => {
  const execute = () => {
    const nodeComponents = getClosestNodeComponents(component);

    nodeComponents.forEach(node => {
      const element = node.instance as Element;

      if (!element) {
        throw new RuvyError(
          'unable to change element position, component instance does not exist.'
        );
      }

      const { index, found } = computeNodeComponentIndexInDOM(node);

      if (!found) {
        throw new RuvyError('unable to compute node index in dom');
      }

      const parent = element.parentElement;

      if (!parent) {
        throw new RuvyError('element does not have any parent');
      }

      changeNodePosition(element, index);
    });
  };

  return createTask({ execute, component, type: TaskType.ReorderElements });
};

export const createTextTask = (component: TextComponent): Task => {
  const execute = () => {
    const instance = text(component.text);

    const host = component.domParent;

    if (!host.instance) {
      throw new RuvyError('unable to find element hosting parent.');
    }

    const { index, found } = computeNodeComponentIndexInDOM(component);

    if (!found) {
      throw new RuvyError('unable to compute node index in dom');
    }

    insertNode(instance, host.instance, index);

    component.instance = instance;
  };

  return createTask({ component, execute, type: TaskType.RenderText });
};

export const createUpdateTextTask = (component: TextComponent, data: string): Task => {
  const execute = () => {
    const node = component.instance;

    if (!node) {
      throw new RuvyError('unable to change element position, component instance does not exist.');
    }

    node.data = data;
  };

  return createTask({ component, execute, type: TaskType.UpdateText });
};

export const createEffectTask = (
  component: FunctionComponent | Composable | ErrorBoundaryComponent,
  hook: EffectHook
): Task => {
  const execute = () => {
    const cleanup = hook.callback();

    if (typeof cleanup === 'function') {
      hook.cleanup = cleanup;
    }
  };

  return createTask({ component, execute, type: TaskType.RunEffect });
};

export const createEffectCleanUpTask = (
  component: FunctionComponent | Composable,
  hook: EffectHook
): Task => {
  const execute = () => {
    hook.cleanup?.();

    hook.cleanup = undefined;
  };

  return createTask({ component, execute, type: TaskType.RunEffectCleanup });
};

export const createMovePortalChildren = (component: PortalComponent): Task => {
  const execute = () => {
    const element = component.instance;

    if (!element) {
      throw new RuvyError('unable to change portal, component instance does not exist.');
    }

    getClosestNodeComponents(component).forEach(node => {
      const inst = node.instance;

      if (!inst) {
        throw new RuvyError(
          'unable to move element to new portal, component instance does not exist.'
        );
      }

      insertNode(inst, element);
    });
  };

  return createTask({ component, execute, type: TaskType.UpdatePortalChildren });
};

export const createChangeElementPosition = (component: NodeComponent, position: number): Task => {
  const execute = () => {
    const element = component.instance;

    if (!element) {
      throw new RuvyError('unable to change element position, component instance does not exist.');
    }

    changeNodePosition(element, position);
  };

  return createTask({ component, execute, type: TaskType.ChangeElementPosition });
};
