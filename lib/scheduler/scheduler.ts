import {
  cloneExecutionContext,
  handleComponent,
  handleComposable,
  initComponentTasks,
  isComposable,
  pushBlukTasks,
} from '../component/index.js';
import { executeTasks } from '../core/index.js';
import { RuvyError, generateId } from '../helpers/helpers.js';
import {
  Component,
  ComponentTag,
  ComponentTasks,
  Composable,
  FunctionComponent,
  HostComponent,
  Outlet,
  OutletComponent,
  ParentComponent,
  RootComponent,
  Template,
} from '../types.js';
import toposort from 'toposort';

export type Requester = FunctionComponent | OutletComponent | Composable;

export interface RequestObject {
  id: string;
  date: Date;
  fulfilled: boolean;
}

export interface UpdateRequest extends RequestObject {
  requester: Requester;
}

export interface RenderRequest extends RequestObject {
  root: RootComponent;
  child: Template;
}

export type Request = UpdateRequest | RenderRequest;

export type SchedulerState = 'idle' | 'batching' | 'processing';

export type RequestData = Pick<RenderRequest, 'child' | 'root'> | Pick<UpdateRequest, 'requester'>;

let state: SchedulerState = 'idle';
let buffer: Array<Request> = [];
let pending: Array<Request> = [];

const batchDelay = 5;

export const collectUniqueRequesters = (
  requesters: Array<Requester>,
  previous: Array<Requester>
): Array<Requester> => {
  requesters.forEach(req => {
    if (previous.includes(req)) return;

    previous.push(req);

    if (isComposable(req)) {
      collectUniqueRequesters(req.subscribers, previous);
    }
  });

  return previous;
};

export const isAncestorComponent = (
  component: Component,
  parent: FunctionComponent | OutletComponent
): boolean => {
  if (component.tag === ComponentTag.Root) return false;

  if (component.parent === parent) return true;

  return isAncestorComponent(component.parent, parent);
};

export const optimizeRequesters = (requests: Array<Requester>): Array<Requester> => {
  const minimal: Array<Requester> = [];

  requests.forEach((it, index) => {
    if (minimal.includes(it)) return;

    if (isComposable(it)) {
      minimal.push(it);
      return;
    }

    let ancestor: Requester | undefined = minimal.find(comp => {
      if (isComposable(comp)) return false;

      return isAncestorComponent(it, comp);
    });

    ancestor ??= requests.slice(index).find(comp => {
      if (isComposable(comp)) return false;

      return isAncestorComponent(it, comp);
    });

    if (!ancestor) {
      minimal.push(it);
    }
  });

  const deps: Array<[string, string]> = minimal.reduce((acc, it, index) => {
    if (isComposable(it)) {
      const arr: Array<[string, string]> = [];

      it.subscribers.forEach(sub => {
        const i = minimal.indexOf(sub);

        if (i !== -1) {
          arr.push([i.toString(), index.toString()]);
        }
      });

      acc.push(...arr);
    }

    return acc;
  }, [] as Array<[string, string]>);

  const sorted = toposort.array(
    minimal.map((_, i) => i.toString()),
    deps
  );

  return sorted.map(it => {
    const comp = minimal[parseInt(it)];

    if (!comp) {
      throw new RuvyError('something went wrong while trying to optimize dependencies');
    }

    return comp;
  });
};

export const queueRequest = (data: RequestData) => {
  const request: Request = {
    date: new Date(),
    fulfilled: false,
    id: generateId(),
    ...data,
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

    const renders = pending.filter(it => 'root' in it) as Array<RenderRequest>;

    const updates = pending.reduce((acc, it) => {
      if ('requester' in it) {
        acc.push(it);
      }

      return acc;
    }, [] as Array<UpdateRequest>);

    const requesters = collectUniqueRequesters(
      updates.map(it => it.requester),
      []
    );

    const optimized = optimizeRequesters(requesters);

    // empty the stack
    pending = [];

    const tasks = initComponentTasks();

    optimized.forEach(it => {
      const component = it;

      let tsks: ComponentTasks;

      if (isComposable(component)) {
        tsks = handleComposable(component);
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

        tsks = handleComponent(template, component, component.ctx.parent, index, ctx).tasks;
      }

      pushBlukTasks(tsks, tasks);
    });

    renders.forEach(it => {
      const { child, root } = it;

      const index = root.children.length;

      const parent = root as unknown as ParentComponent;

      const res = handleComponent(child, undefined, parent, index, {
        contexts: {},
        dom: { parent: parent as HostComponent, firstIndex: 0, nextIndex: 0 },
        index,
        key: index,
        parent,
      });

      root.children.push(res.component);

      pushBlukTasks(res.tasks, tasks);
    });

    executeTasks(tasks);

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
