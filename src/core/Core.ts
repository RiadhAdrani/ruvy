import { isString } from "@riadh-adrani/utils";
import {
  diffComponents,
  executeUpdateCallbacks,
  processComponent,
  renderComponent,
  createComponent as createComponentUnWrapped,
} from "../component";
import { Context } from "../context";
import { Router } from "../router";
import { Scheduler } from "../scheduler";
import { createEffectCollection, createStateCollection, Store } from "../store";
import {
  Callback,
  IComponent,
  IComponentTemplate,
  StateArray,
  Tag,
  PrimitiveComponentTemplate,
  RouterConfig,
  RawRoute,
} from "../types";
import { IMountConfig } from "../types/core";

export class Core {
  static singleton: Core = new Core();

  fn: Callback<IComponentTemplate> = undefined as unknown as Callback<IComponentTemplate>;

  current: IComponent = undefined as unknown as IComponent;
  host: HTMLElement = undefined as unknown as HTMLElement;

  shouldUpdate: boolean = false;
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

    this.store.createEffectsStore(() =>
      createEffectCollection(this.store, {
        name: "effect",
        keepUnused: false,
      })
    );

    Core.singleton = this;
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

  executeRoutine(isUpdate: boolean = true) {
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
  }
}

export const mountApp = ({ callback, hostElement }: IMountConfig) => {
  Core.singleton.fn = callback;
  Core.singleton.host = hostElement;

  Core.singleton.scheduler.schedule({
    date: Date.now(),
    id: Date.now().toString(),
    type: "render",
    callback: () => {
      Core.singleton.executeRoutine(false);
    },
  });
};

export const createRouter = (
  routes: Array<RawRoute<Callback<IComponentTemplate | PrimitiveComponentTemplate>>>,
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
    const obj = router.object;

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
  tag: Tag | Callback<IComponentTemplate>,
  options?: Record<string, unknown>,
  ...children: Array<unknown>
): IComponentTemplate => {
  if (isString(tag)) {
    return createComponent(tag as Tag, { ...options, children });
  }

  return (tag as (options: unknown) => IComponentTemplate)(options);
};

export const navigate = (path: string) => {
  Core.singleton.router.push(path);
};

export const getParams = <T = Record<string, string>>() => {
  return Core.singleton.router.params as T;
};
