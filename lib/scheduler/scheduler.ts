import {
  cloneExecutionContext,
  handleComponent,
  handleComposable,
  isComposable,
} from '../component/index.js';
import { executeTasks } from '../core/index.js';
import { RuvyError, generateId } from '../helpers/helpers.js';
import {
  Component,
  ComponentTag,
  ComponentTasks,
  Composable,
  FunctionComponent,
  Outlet,
  OutletComponent,
  RootComponent,
  Template,
} from '../types.js';
import toposort from 'toposort';

export interface UpdateRequest {
  id: string;
  date: Date;
  fulfilled: boolean;
  component: FunctionComponent | OutletComponent | Composable;
}

export interface RenderRequest {
  root: RootComponent;
  child: Template;
}

export type SchedulerState = 'idle' | 'batching' | 'processing';

export type UpdateRequestData = Pick<UpdateRequest, 'component'>;

let state: SchedulerState = 'idle';
let buffer: Array<UpdateRequest> = [];
let pending: Array<UpdateRequest> = [];

const batchDelay = 5;

export const isAncestorComponent = (
  component: Component | Composable,
  parent: FunctionComponent | OutletComponent | Composable
): boolean => {
  if (isComposable(component)) {
    throw new RuvyError('not implemented');
  }

  if (component.tag === ComponentTag.Root) return false;

  if (component.parent === parent) return true;

  return isAncestorComponent(component.parent, parent);
};

export const optimizeComponentsToHandle = (
  requests: Array<UpdateRequest>
): Array<UpdateRequest> => {
  const queue: Array<UpdateRequest['component']> = [];

  const composables: Array<Composable> = requests
    .filter(it => isComposable(it.component))
    .map(it => it.component as Composable);

  return requests.reduce((acc, it, index) => {
    if (queue.includes(it.component)) {
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

  pending.push(request);

  if (state === 'batching') {
    return;
  }

  state = 'batching';

  setTimeout(() => {
    state = 'processing';

    const optimized = optimizeComponentsToHandle(pending);

    // empty the stack
    pending = [];

    optimized.forEach(it => {
      const component = it.component;

      let tasks: ComponentTasks;

      if (isComposable(component)) {
        tasks = handleComposable(component);
      } else {
        const props = component.props;
        const type = component.tag === ComponentTag.Outlet ? Outlet : component.type;
        const children = component.props.children as Array<unknown>;

        const index = component.ctx.index;

        const template = createJsxElement(type, props, ...children);

        const ctx = cloneExecutionContext(
          component.ctx,
          ctx => (ctx.dom.nextIndex = component.ctx.dom.firstIndex)
        );

        tasks = handleComponent(template, component, component.ctx.parent, index, ctx).tasks;
      }

      executeTasks(tasks);
    });

    if (buffer.length === 0) {
      // it is over
      state = 'idle';
      return;
    }

    // we have pending requests
    pending = buffer;
    buffer = [];

    queueRequest(pending[0]);
  }, batchDelay);
};
