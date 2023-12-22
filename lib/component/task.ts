import {
  ComponentStatus,
  ElementComponent,
  MicroTask,
  MicroTaskType,
  NonRootComponent,
  PropComparison,
  RefValue,
  UnmountComponentData,
  TextComponent,
  FunctionComponent,
  EffectHook,
  PortalComponent,
  ParentComponent,
} from '@/types.js';
import {
  element,
  insertNode,
  extractEventDetails,
  removeEventListener,
  setEventListener,
  setAttribute,
  removeAttribute,
  removeNode,
  changeNodePosition,
  text,
} from '@riadh-adrani/domer';
import {
  filterDomProps,
  getClosestNodeComponents,
  getNodeIndex,
  getHostingComponent,
  isNodeComponent,
} from './index.js';
import { RuvyError, generateId } from '@/helpers/helpers.js';

export const createTask = (data: Pick<MicroTask, 'execute' | 'component' | 'type'>): MicroTask => {
  return {
    date: new Date(),
    id: generateId(),
    ...data,
  };
};

export const createRenderTask = (component: ElementComponent): MicroTask => {
  // filter events and attributes
  const props = filterDomProps(component.props);

  const execute = () => {
    const instance = element(component.type, props);

    const host = getHostingComponent(component);

    if (!host.instance) {
      throw new RuvyError('unable to find element hosting parent.');
    }

    const { found, index } = getNodeIndex(component, host as ParentComponent);

    if (!found) {
      throw new RuvyError('unable to compute node index.');
    }

    insertNode(instance, host.instance, index);

    component.instance = instance;

    component.status = ComponentStatus.Mounted;
  };

  return createTask({ component, execute, type: MicroTaskType.RenderElement });
};

export const createInnerHTMLTask = (component: ElementComponent, innerHTML: string): MicroTask => {
  const execute = () => {
    const element = component.instance as Element;

    if (!element) {
      throw new RuvyError('unable to set innerHTML, component is not yet mounted.');
    }

    element.innerHTML = innerHTML;
  };

  return createTask({ component, execute, type: MicroTaskType.RenderInnerHTML });
};

export const createElementPropsUpdateTask = (
  component: ElementComponent,
  comparison: Array<PropComparison>
): MicroTask => {
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

  return createTask({ component, execute, type: MicroTaskType.UpdateProps });
};

export const createRefElementTask = (component: ElementComponent, ref: RefValue): MicroTask => {
  const execute = () => {
    const element = component.instance as Element;

    if (!element) {
      throw new RuvyError('unable to update element, component is not yet mounted.');
    }

    ref.value = element;
  };

  return createTask({ execute, component, type: MicroTaskType.RefElement });
};

export const createUnrefElementTask = (component: ElementComponent, ref: RefValue): MicroTask => {
  const execute = () => {
    ref.value = undefined;
  };

  return createTask({ execute, component, type: MicroTaskType.UnrefEelement });
};

export const createSetMountedTask = (component: NonRootComponent): MicroTask => {
  const execute = () => {
    component.status = ComponentStatus.Mounted;
  };

  return createTask({ execute, component, type: MicroTaskType.SetComponentMounted });
};

export const createUnmountComponentTask = (
  component: NonRootComponent,
  data: UnmountComponentData
): MicroTask => {
  const execute = () => {
    if (isNodeComponent(component) && !data.isHostParentUnmounting) {
      const element = component.instance as Element;

      if (!element) {
        throw new RuvyError('unable to unmount node, component instance does not exist.');
      }

      removeNode(element);
    }

    component.status = ComponentStatus.Unmounted;
  };

  return createTask({ execute, component, type: MicroTaskType.UnmountComponent });
};

export const createChangeElementPositionTask = (component: NonRootComponent): MicroTask => {
  const execute = () => {
    const nodeComponents = getClosestNodeComponents(component);

    nodeComponents.forEach(node => {
      const element = node.instance as Element;

      if (!element) {
        throw new RuvyError(
          'unable to change element position, component instance does not exist.'
        );
      }

      const { index, found } = getNodeIndex(node);

      if (!found) {
        throw new RuvyError('unable to change element position, position computation failed');
      }

      changeNodePosition(element, index);
    });
  };

  return createTask({ execute, component, type: MicroTaskType.ReorderElements });
};

export const createTextTask = (component: TextComponent): MicroTask => {
  const execute = () => {
    const instance = text(component.text);

    const host = getHostingComponent(component);

    if (!host.instance) {
      throw new RuvyError('unable to find element hosting parent.');
    }

    const { found, index } = getNodeIndex(component, host as ParentComponent);

    if (!found) {
      throw new RuvyError('unable to compute node index.');
    }

    insertNode(instance, host.instance, index);

    component.instance = instance;

    component.status = ComponentStatus.Mounted;
  };

  return createTask({ component, execute, type: MicroTaskType.RenderText });
};

export const createUpdateTextTask = (component: TextComponent, data: string): MicroTask => {
  const execute = () => {
    const node = component.instance;

    if (!node) {
      throw new RuvyError('unable to change element position, component instance does not exist.');
    }

    node.data = data;
  };

  return createTask({ component, execute, type: MicroTaskType.UpdateText });
};

export const createEffectTask = (component: FunctionComponent, hook: EffectHook): MicroTask => {
  const execute = () => {
    const cleanup = hook.callback();

    if (typeof cleanup === 'function') {
      hook.cleanup = cleanup;
    }
  };

  return createTask({ component, execute, type: MicroTaskType.RunEffect });
};

export const createEffectCleanUpTask = (
  component: FunctionComponent,
  hook: EffectHook
): MicroTask => {
  const execute = () => {
    hook.cleanup?.();

    hook.cleanup = undefined;
  };

  return createTask({ component, execute, type: MicroTaskType.RunEffectCleanup });
};

export const createMovePortalChildren = (component: PortalComponent): MicroTask => {
  const execute = () => {
    const element = component.instance;

    if (!element) {
      throw new RuvyError('unable to change portal, component instance does not exist.');
    }

    component.children.forEach(child => {
      getClosestNodeComponents(child).forEach(node => {
        const inst = node.instance;

        if (!inst) {
          throw new RuvyError(
            'unable to move element to new portal, component instance does not exist.'
          );
        }

        insertNode(inst, element);
      });
    });
  };

  return createTask({ component, execute, type: MicroTaskType.UpdatePortalChildren });
};
