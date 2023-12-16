import {
  ComponentStatus,
  ElementComponent,
  MicroTask,
  MicroTaskType,
  PropComparison,
  RefValue,
} from '@/types.js';
import {
  element,
  insertNode,
  extractEventDetails,
  removeEventListener,
  setEventListener,
  setAttribute,
  removeAttribute,
} from '@riadh-adrani/domer';
import { filterDomProps, getNodeIndex, getParentNode } from './index.js';
import { RuvyError, generateId } from '@/helpers.js';

export const createTask = (data: Pick<MicroTask, 'execute' | 'component' | 'type'>): MicroTask => {
  return {
    date: new Date(),
    id: generateId(),
    ...data,
  };
};

export const createRenderTask = (component: ElementComponent): MicroTask => {
  // filter events and attributes
  const props = filterDomProps(component);

  const execute = () => {
    const instance = element(component.type, props);

    const host = getParentNode(component);

    if (!host.instance) {
      throw new RuvyError('unable to find element hosting parent.');
    }

    const { found, index } = getNodeIndex(component, host);

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

  return createTask({ execute, component, type: MicroTaskType.RefElement });
};
