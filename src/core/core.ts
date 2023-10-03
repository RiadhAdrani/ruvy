import { isElement, setEvent } from '@riadh-adrani/dom-utils';
import { isFunction } from '@riadh-adrani/obj-utils';
import { Callback } from '@riadh-adrani/type-utils';
import Context from '../context/Context.js';
import Router from '../router/Router.js';
import { NavigationRequest, RawRoute, RouterParams } from '../router/types.js';
import Scheduler from '../scheduler/Scheduler.js';
import { MountParams } from './types.js';
import { getClosestAnchorParent } from './utils.js';
import {
  createFragmentTemplate,
  createJsxElement,
  createTemplate,
  Branch,
  RuvyNode,
  handleComponent,
  createRoot,
  BranchAction,
  ActionType,
  ActionsSorted,
} from '../branch/index.js';
import { DOMEvent } from '../types/index.js';
import getRouteFromUrl, { getPathFromURL } from '../router/utils/getRouteFromUrl.js';

export class Core {
  static singleton: Core = new Core();

  fn: Callback<unknown> = undefined as unknown as Callback<unknown>;

  current: Branch = undefined as unknown as Branch;
  host: HTMLElement = undefined as unknown as HTMLElement;

  pendingActions: { [key in ActionType]?: Array<BranchAction> } = {};

  shouldUpdate = false;
  batchContext = new Context<boolean>();
  scheduler = new Scheduler();
  router: Router<RuvyNode> = undefined as unknown as Router<RuvyNode>;
  routerContext = new Context<number>();

  constructor() {
    Core.singleton = this;
  }

  queueAction(action: BranchAction): void {
    const { type } = action;

    if (!this.pendingActions[type]) {
      this.pendingActions[type] = [];
    }

    this.pendingActions[type]?.push(action);
  }

  commitAction(action: BranchAction): void {
    try {
      action.callback();
    } catch (error) {
      // nope
    }
  }

  commitActions(): void {
    ActionsSorted.forEach(type => this.pendingActions[type]?.forEach(this.commitAction));

    this.resetActions();
  }

  resetActions(): void {
    this.pendingActions = {};
  }

  executeRoutine(isUpdate = true) {
    if (!isFunction(this.fn)) {
      throw 'Unexpected Type: app callback is not a function.';
    }

    if (!isElement(this.host)) {
      throw 'Unexpected Type: host element is not a Dom element.';
    }

    const template = createTemplate(this.fn, {}, []);

    if (!isUpdate) {
      this.current = createRoot(this.host, template);
    } else {
      handleComponent(template, this.current.children[0], this.current, 0);
    }

    this.commitActions();

    this.shouldUpdate = false;
  }

  onStateUpdate() {
    if (!this.fn || !this.shouldUpdate || this.batchContext.data) {
      return;
    }

    this.scheduler.schedule({
      date: Date.now(),
      id: `${Date.now()}`,
      type: 'update',
      callback: () => {
        this.executeRoutine();
      },
    });
  }

  notifyStateUpdated() {
    this.shouldUpdate = true;

    if (!this.batchContext.get()) {
      this.onStateUpdate();
    }
  }

  static notifyStateUpdated() {
    Core.singleton.notifyStateUpdated();
  }

  batch<T = void>(callback: Callback<T>): T {
    if (this.batchContext.get() === true) {
      return callback();
    }

    return this.batchContext.use(callback, true, () => this.onStateUpdate());
  }

  static batch<T>(callback: Callback<T>) {
    return Core.singleton.batch(callback);
  }
}

setEvent(
  'onClick',
  e => {
    const ev = e as unknown as DOMEvent<MouseEvent>;

    const router = getCurrent().router;

    if (!router) {
      return;
    }

    const anchorEl = getClosestAnchorParent(ev.target);

    if (anchorEl) {
      const path: string | null = anchorEl.getAttribute('href');
      if (path && router.isNavigatable(path)) {
        e.preventDefault();

        navigate(getPathFromURL(path, router.base));
      }
    }
  },
  document
);

// ? make `createJsxElement` and `createFragmentTemplate` globally available
const win = window as unknown as Record<string, unknown>;
win.createJsxElement = createJsxElement;
win.createJsxFragmentElement = createFragmentTemplate;

const throwIfNoRouter = <T = void>(callback: () => T): T => {
  if (!Core.singleton.router) {
    throw '[Ruvy] You are trying to run a method which necessitate the creation of a Router using "createRouter" !';
  }

  return callback();
};

/**
 * create and mount a ruvy app using the provided parameters.
 */
export const mountApp = ({ callback, hostElement }: MountParams) => {
  Core.singleton.fn = callback;
  Core.singleton.host = hostElement;

  Core.singleton.scheduler.schedule({
    date: Date.now(),
    id: Date.now().toString(),
    type: 'render',
    callback: () => {
      Core.singleton.executeRoutine(false);
      Core.singleton.router?.updateTitle();
    },
  });
};

export const getCurrent = () => Core.singleton;

/**
 * Batch updates in a synchronous callback .
 * @param callback containing state updates.
 */
export const batch = <T>(callback: Callback<T>): T => {
  return Core.batch(callback);
};

/**
 * creates a router for the ruvy application.
 *
 * ⚠️ Should be called before ``mountApp``
 *
 * @param routes
 * @param config
 */
export const createRouter = (routes: Array<RawRoute<RuvyNode>>, config: RouterParams = {}) => {
  Core.singleton.router = new Router(routes, {
    ...config,
    onStateChange: () =>
      batch(() => {
        Core.notifyStateUpdated();
        Core.singleton.router.onPostStateChange();
      }),
  });
};

/**
 * lets you navigate programmatically between routes.
 * @param request desintation path
 */
export const navigate = (request: NavigationRequest) => {
  throwIfNoRouter(() => Core.singleton.router.push(request));
};

/**
 * lets you replace the current route programmatically.
 * @param request desintation path
 */
export const replace = (request: Exclude<NavigationRequest, number>) => {
  throwIfNoRouter(() => Core.singleton.router.replace(request));
};

interface QueryParams {
  [key: string]: string | undefined;
}

/**
 * returns an object of key/value pairs of the dynamic params
 * from the current URL that were matched by the current route.
 * Child routes inherit all params from their parent routes.
 */
export const getParams = (): Record<string, string> => {
  return throwIfNoRouter(() => Core.singleton.router.params);
};

/**
 * returns an object of key/value pairs of the dynamic search params (if they exists) from the current URL.
 */
export const getSearchParams = <T extends QueryParams>(): T => {
  const queryParams: T = {} as T;
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.forEach((value, key) => {
    (queryParams as Record<string, string>)[key] = value;
  });

  return queryParams;
};

/**
 * retrieves the current route without the base.
 */
export const getPathname = (): string => {
  return throwIfNoRouter(() => getRouteFromUrl(Core.singleton.router.base));
};
