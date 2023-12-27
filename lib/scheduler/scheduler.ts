import { cloneExecutionContext, handleComponent } from '../component/index.js';
import { executeTasks } from '../core/index.js';
import { generateId } from '../helpers/helpers.js';
import { Component, ComponentTag, FunctionComponent, Outlet, OutletComponent } from '../types.js';

export interface UpdateRequest {
  id: string;
  date: Date;
  fulfilled: boolean;
  component: FunctionComponent | OutletComponent;
}

export type SchedulerState = 'idle' | 'batching' | 'processing';

export type UpdateRequestData = Pick<UpdateRequest, 'component'>;

let buffer: Array<UpdateRequest> = [];

let stack: Array<UpdateRequest> = [];

let state: SchedulerState = 'idle';

const batchDelay = 5;

export const isAncestorComponent = (
  component: Component,
  parent: FunctionComponent | OutletComponent
): boolean => {
  if (component.tag === ComponentTag.Root) return false;

  if (component.parent === parent) return true;

  return isAncestorComponent(component.parent, parent);
};

export const optimizeComponentsToHandle = (
  requests: Array<UpdateRequest>
): Array<UpdateRequest> => {
  const components: Array<UpdateRequest['component']> = [];

  return requests.reduce((acc, it, index) => {
    if (components.includes(it.component)) {
      return acc;
    }

    // check if component is already includes in the rest of the requesters
    let found = false;

    for (let i = index + 1; i < requests.length; i++) {
      if (isAncestorComponent(it.component, requests[i].component)) {
        found = true;
        break;
      }
    }

    if (!found) {
      acc.push(it);
    }

    return acc;
  }, [] as Array<UpdateRequest>);
};

export const queueRequest = (data: UpdateRequestData) => {
  const request: UpdateRequest = {
    ...data,
    date: new Date(),
    fulfilled: false,
    id: generateId(),
  };

  if (state === 'processing') {
    buffer.push(request);
    return;
  }

  stack.push(request);

  if (state === 'batching') {
    return;
  }

  state = 'batching';

  setTimeout(() => {
    state = 'processing';

    // empty the stack
    const optimized = optimizeComponentsToHandle(stack);

    stack = [];

    optimized.forEach(it => {
      const component = it.component;

      const props = component.props;
      const type = component.tag === ComponentTag.Outlet ? Outlet : component.type;
      const children = component.props.children as Array<unknown>;

      const index = component.ctx.index;

      const template = createJsxElement(type, props, ...children);

      const ctx = cloneExecutionContext(
        component.ctx,
        ctx => (ctx.dom.nextIndex = component.ctx.dom.firstIndex)
      );

      const { tasks } = handleComponent(template, component, component.ctx.parent, index, ctx);

      executeTasks(tasks);
    });

    if (buffer.length === 0) {
      // it is over
      state = 'idle';
      return;
    }

    // we have pending requests
    stack = buffer;
    buffer = [];

    queueRequest(stack[0]);
  }, batchDelay);
};
