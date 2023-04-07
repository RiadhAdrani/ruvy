import { isElement, setEvent, HTML_NS, SVG_NS, MATH_NS } from "@riadh-adrani/dom-utils";
import { isArray, isFunction, isString } from "@riadh-adrani/utils";
import {
  diffComponents,
  executeUpdateCallbacks,
  processComponent,
  renderComponent,
  createComponent as createComponentUnWrapped,
} from "../component/index.js";
import { Context } from "../context/index.js";
import { Router } from "../router/index.js";
import { Scheduler } from "../scheduler/index.js";
import { createEffectCollection, createStateCollection, Store } from "../store/index.js";
import {
  Callback,
  IComponent,
  IComponentTemplate,
  StateArray,
  Tag,
  PrimitiveComponentTemplate,
  RouterConfig,
  RawRoute,
  FunctionComponent,
} from "../types/index.js";
import { IMountConfig } from "../types/index.js";
import { getClosestAnchorParent } from "./utils/index.js";
import { HookType } from "../types/_component.js";

export class Core {
  static singleton: Core = new Core();

  fn: Callback<IComponentTemplate> = undefined as unknown as Callback<IComponentTemplate>;

  current: IComponent = undefined as unknown as IComponent;
  host: HTMLElement = undefined as unknown as HTMLElement;

  shouldUpdate = false;
  batchContext = new Context<boolean>();
  scheduler = new Scheduler();
  store = new Store();
  router: Router<Callback<IComponentTemplate | PrimitiveComponentTemplate>> =
    undefined as unknown as Router<Callback<IComponentTemplate | PrimitiveComponentTemplate>>;
  routerContext = new Context<number>();

  constructor() {
    this.store.createItemsStore(() =>
      createStateCollection(this.store, {
        name: "state",
        checkEqual: true,
        forceSet: false,
        keepUnused: false,
        onChanged: () => this.onStateUpdate(),
      })
    );

    this.store.createItemsStore(() =>
      createStateCollection(this.store, {
        name: HookType.state,
        checkEqual: true,
        forceSet: true,
        keepUnused: false,
        onChanged: () => this.onStateUpdate(),
      })
    );

    this.store.createEffectsStore(() =>
      createEffectCollection(this.store, {
        name: HookType.effect,
        keepUnused: false,
      })
    );

    this.store.createEffectsStore(() =>
      createEffectCollection(this.store, {
        name: "effect",
        keepUnused: false,
      })
    );

    Core.singleton = this;
  }

  executeRoutine(isUpdate = true) {
    if (!isFunction(this.fn)) {
      throw "Unexpected Type: app callback is not a function.";
    }

    if (!isElement(this.host)) {
      throw "Unexpected Type: host element is not a Dom element.";
    }

    if (!isUpdate) {
      this.current = processComponent(this.fn());
      this.host.appendChild(renderComponent(this.current));
    } else {
      const updated = processComponent(this.fn());
      const actions = diffComponents(this.current, updated);

      executeUpdateCallbacks(actions);
    }

    this.store.launchEffects();
    this.store.resetUsage();

    this.shouldUpdate = false;
  }

  onStateUpdate() {
    this.shouldUpdate = true;

    if (this.batchContext.data === true) {
      return;
    }

    this.scheduler.schedule({
      date: Date.now(),
      id: `${Date.now()}`,
      type: "update",
      callback: () => {
        this.executeRoutine();
      },
    });
  }
}

setEvent(
  "onClick",
  (e) => {
    const ev = e as unknown as DOMEvent<MouseEvent>;

    const anchorEl = getClosestAnchorParent(ev.target);

    if (anchorEl) {
      const path: string | null = anchorEl.getAttribute("href");

      if (path && Core.singleton.router.isNavigatable(path)) {
        navigate(path);
        e.preventDefault();
      }
    }
  },
  document
);

export const mountApp = ({ callback, hostElement }: IMountConfig) => {
  Core.singleton.fn = callback;
  Core.singleton.host = hostElement;

  Core.singleton.scheduler.schedule({
    date: Date.now(),
    id: Date.now().toString(),
    type: "render",
    callback: () => {
      Core.singleton.executeRoutine(false);
      Core.singleton.router?.updateTitle();
    },
  });
};

export const createRouter = (
  routes: Array<RawRoute<FunctionComponent>>,
  config: Omit<RouterConfig, "onStateChange">
) => {
  Core.singleton.router = new Router(routes, {
    ...config,
    onStateChange: () => {
      Core.singleton.onStateUpdate();
    },
  });
};

export const Outlet = (): IComponentTemplate | PrimitiveComponentTemplate => {
  const router = Core.singleton.router;

  return router.useContext(() => {
    const obj = router.component;

    return obj ? obj() : "";
  });
};

export const setState = <T>(key: string, value: T): StateArray<T> => {
  return Core.singleton.store.setItem<T>("state", key, value);
};

export const setEffect = (
  callback: Callback,
  key: string,
  dependencies: unknown = undefined
): void => {
  Core.singleton.store.setEffect("effect", key, callback, dependencies);
};

export const createComponent = (tag: Tag, options?: Record<string, unknown>) => {
  const opts = options ?? {};

  const eventWrapper = (callback: Callback) => {
    Core.singleton.batchContext.use(callback, true, () => {
      if (Core.singleton.shouldUpdate) {
        Core.singleton.executeRoutine();
      }
    });
  };

  return createComponentUnWrapped(tag, opts, { eventWrapper });
};

export const createJsxElement = (
  tag: Tag | FunctionComponent,
  options?: Record<string, unknown>,
  ...children: Array<unknown>
): IComponentTemplate => {
  const $children: Array<unknown> = [];
  const $options = options || {};

  if (options) {
    if (options.svg === true) {
      $options.ns = SVG_NS;
    } else if (options.math === true) {
      $options.ns = MATH_NS;
    } else if (options.html === true) {
      $options.ns = HTML_NS;
    }
  }

  children.forEach((child) => {
    if (isArray(child)) {
      $children.push(...(child as Array<unknown>));
    } else {
      $children.push(child);
    }
  });

  if (isString(tag)) {
    return createComponent(tag as Tag, { ...$options, children: $children });
  }

  return (tag as (options: unknown, ...children: Array<unknown>) => IComponentTemplate)(
    options,
    ...$children
  );
};

export const createJsxFragmentElement = (
  _: unknown,
  ...children: Array<PrimitiveComponentTemplate | IComponentTemplate>
): Array<unknown> => {
  return children;
};

export const navigate = (path: string) => {
  Core.singleton.router.push(path);
};

export const getParams = <T = Record<string, string>>() => {
  return Core.singleton.router.params as T;
};

const win = window as unknown as Record<string, unknown>;

win.setState = setState;
win.setEffect = setEffect;
win.createJsxElement = createJsxElement;
win.createJsxFragmentElement = createJsxFragmentElement;
