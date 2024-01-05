import '../component/jsx.js';
import {
  GlobalContext,
  MountAppConfig,
  RenderRequest,
  Request,
  RequestData,
  Requester,
  RootComponent,
  SchedulerState,
  TasksSorted,
  Template,
  UpdateRequest,
} from '../types.js';
import { setConfig } from '@riadh-adrani/domer';
import {
  cloneExecutionContext,
  getComposables,
  handleComponent,
  handleComposable,
  initComponentTasks,
  isComposable,
  pushBlukTasks,
  unmountComponentOrComposable,
  unmountComposable,
} from '../component/index.js';
import { RuvyError, generateId } from '../helpers/helpers.js';
import {
  Component,
  ComponentTag,
  ComponentTasks,
  FunctionComponent,
  HostComponent,
  OutletComponent,
  ParentComponent,
} from '../types.js';
import toposort from 'toposort';

export const frameworkContext: GlobalContext = {
  preventRequests: false,
  preventRequestsProcessing: false,
};

export let root: RootComponent | undefined;
export let template: Template;

let state: SchedulerState = 'idle';
let buffer: Array<Request> = [];
let pending: Array<Request> = [];
let didRender = false;
let updateDepth = 0;

export const __state__ = () => state;
export const __buffer__ = () => buffer;
export const __pending__ = () => pending;
export const __didRender__ = () => didRender;

const batchDelay = 12;

export const __setUpdateDepth = (v: number) => {
  updateDepth = v;
};

export const __setState__ = (v: SchedulerState) => {
  state = v;
};

export const __resetBuffer__ = () => {
  buffer = [];
};

export const __resetPending__ = () => {
  pending = [];
};

export const __setDidRender__ = (v: boolean) => {
  didRender = v;
};

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

  return sorted
    .map(it => {
      const comp = minimal[parseInt(it)];

      if (!comp) {
        throw new RuvyError('something went wrong while trying to optimize dependencies');
      }

      return comp;
    })
    .reverse();
};

export const processPending = () => {
  if (frameworkContext.preventRequestsProcessing) {
    return;
  }

  updateDepth++;

  if (updateDepth > 100) {
    throw new RuvyError('infinite re-rendering detected: update depth exceeded 100.');
  }

  if (state !== 'unmounting') {
    state = 'processing';
  }

  const route = pending.some(it => it.type === 'route');

  const renders = route ? [] : (pending.filter(it => it.type === 'mount') as Array<RenderRequest>);

  if (didRender && renders.length > 0) {
    throw new RuvyError('cannot mount application twice, try to unmount the current one first.');
  }

  const unmount = pending.some(it => it.type === 'unmount');

  if (unmount) {
    state = 'unmounting';

    if (!didRender) {
      throw new RuvyError('no application to be unmounted');
    }
  }

  const updates = pending.filter(it => it.type === 'update') as Array<UpdateRequest>;

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
      const type = component.type;
      const children = component.props.children as Array<unknown>;

      const index = component.ctx.index;

      const template = createJsxElement(type, props, ...children);

      const ctx = cloneExecutionContext(component.ctx);

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
      dom: { parent: parent as HostComponent },
      index,
      key: index,
      parent,
    });

    // should be only one application
    root.children = [res.component];

    pushBlukTasks(res.tasks, tasks);

    didRender = true;
  });

  if (route) {
    const res = handleComponent(
      template,
      root?.children[0],
      root as unknown as ParentComponent,
      0,
      {
        contexts: {},
        dom: { parent: root as HostComponent },
        index: 0,
        key: 0,
        parent: root as unknown as ParentComponent,
      }
    );

    pushBlukTasks(res.tasks, tasks);
  }

  if (unmount && root) {
    // unmount components
    const head = root.children[0];
    const cmpnts = unmountComponentOrComposable(head, {});
    pushBlukTasks(cmpnts, tasks);

    // unmount composables
    Array.from(getComposables())
      .sort((a, b) => b[1].index - a[1].index)
      .forEach(([it]) => pushBlukTasks(unmountComposable(it), tasks));

    // remove root and template
    root = undefined;
    template = undefined;
  }

  executeTasks(tasks);

  // indicate that we are ready to accept requests
  state = 'idle';

  if (buffer.length === 0) {
    // it is over
    updateDepth = 0;

    // exit
    return;
  }

  // we have pending requests
  pending = buffer;
  buffer = [];

  queueRequest(pending[0] as RequestData);
};

export const queueRequest = (data: RequestData) => {
  if (frameworkContext.preventRequests === true || state === 'unmounting') {
    return;
  }

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

  setTimeout(() => processPending(), batchDelay);
};

setConfig({
  events: {
    wrapper: (e, cb) => {
      try {
        cb(e);
      } catch (e) {
        console.error(e);
      }
    },
    syntax: {
      svelte: false,
      vue: false,
    },
  },
});

export const mountApp = ({ app, host }: MountAppConfig) => {
  if (root) {
    throw new RuvyError('an app is already mounted');
  }

  root = { children: [], instance: host, tag: ComponentTag.Root };

  template = app;

  queueRequest({ root, child: app, type: 'mount' });
};

export const unmountApp = () => queueRequest({ type: 'unmount' });

export const executeTasks = (tasks: ComponentTasks) => {
  TasksSorted.forEach(queue => {
    tasks[queue].forEach(task => {
      try {
        task.execute();
      } catch (e) {
        // some err
      }
    });
  });
};
