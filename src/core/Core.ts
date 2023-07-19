import { isElement, setEvent } from '@riadh-adrani/dom-utils';
import { isFunction, Callback } from '@riadh-adrani/utils';
import { Context } from '../context/index.js';
import { Router, RouterParams, RawRoute, NavigationRequest } from '../router/index.js';
import { Scheduler } from '../scheduler/index.js';
import {
  createEffectCollection,
  createStateCollection,
  Store,
  StateArray,
} from '../store/index.js';
import { MountParams } from './types.js';
import { getClosestAnchorParent } from './utils/index.js';
import {
  createFragmentTemplate,
  createJsxElement,
  createTemplate,
  Branch,
  RuvyNode,
  collectActions,
  commit,
  handleComponent,
  createRoot,
} from '../branch/index.js';
import { DOMEvent } from '../types/index.js';
import getRouteFromUrl from '../router/utils/getRouteFromUrl.js';
import { reset } from '../store/createStore.js';

export class Core {
  static singleton: Core = new Core();

  fn: Callback<unknown> = undefined as unknown as Callback<unknown>;

  current: Branch = undefined as unknown as Branch;
  host: HTMLElement = undefined as unknown as HTMLElement;

  shouldUpdate = false;
  batchContext = new Context<boolean>();
  scheduler = new Scheduler();
  store = new Store();
  router: Router<RuvyNode> = undefined as unknown as Router<RuvyNode>;
  routerContext = new Context<number>();

  constructor() {
    this.store.createItemsStore(() =>
      createStateCollection(this.store, {
        name: 'state',
        checkEqual: true,
        forceSet: false,
        keepUnused: false,
        onChanged: () => this.notifyStateUpdated(),
      })
    );

    this.store.createEffectsStore(() =>
      createEffectCollection(this.store, {
        name: 'effect',
        keepUnused: false,
      })
    );

    Core.singleton = this;
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

    commit(collectActions(this.current));

    this.store.launchEffects();
    this.store.resetUsage();

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

    const anchorEl = getClosestAnchorParent(ev.target);

    if (anchorEl) {
      const path: string | null = anchorEl.getAttribute('href');

      if (path && Core.singleton.router.isNavigatable(path)) {
        navigate(path);
        e.preventDefault();
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
  // reset global store
  reset();

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
 * creates a new global stateful variable with the given key.
 * @param key globally unique key.
 * @param value initial value
 * @deprecated
 */
export const useKey = <T>(key: string, value: T): StateArray<T> => {
  return Core.singleton.store.setItem<T>('state', key, value);
};

/**
 * creates a new global effect with the given key
 * @param callback effect
 * @param key globally unique key.
 * @param dependencies dependencies
 * @deprecated
 */
export const setEffect = (
  callback: Callback,
  key: string,
  dependencies: unknown = undefined
): void => {
  Core.singleton.store.setEffect('effect', key, callback, dependencies);
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
 *
 * use `getPathname` instead.
 *
 *
 * @deprecated
 *
 */
export const getRoute = (): string => {
  return throwIfNoRouter(() => getRouteFromUrl(Core.singleton.router.base));
};

/**
 * retrieves the current route without the base.
 */
export const getPathname = (): string => {
  return throwIfNoRouter(() => getRouteFromUrl(Core.singleton.router.base));
};
