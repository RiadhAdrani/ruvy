import { isElement, setEvent } from "@riadh-adrani/dom-utils";
import { isFunction } from "@riadh-adrani/utils";
import { Context } from "../context/index.js";
import { Router } from "../router/index.js";
import { Scheduler } from "../scheduler/index.js";
import { createEffectCollection, createStateCollection, Store } from "../store/index.js";
import { Callback, StateArray, RouterConfig, RawRoute } from "../types/index.js";
import { IMountConfig } from "../types/index.js";
import { getClosestAnchorParent } from "./utils/index.js";
import { Branch, RuvyNode } from "../branch/types/index.js";
import root from "../branch/process/new/root.js";
import { createFragmentTemplate, createJsxElement, createTemplate } from "../branch/index.js";
import { collectActions, commit } from "../branch/process/common/index.js";
import process from "../branch/process/index.js";

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

  executeRoutine(isUpdate = true) {
    if (!isFunction(this.fn)) {
      throw "Unexpected Type: app callback is not a function.";
    }

    if (!isElement(this.host)) {
      throw "Unexpected Type: host element is not a Dom element.";
    }

    const template = createTemplate(this.fn, {}, []);

    if (!isUpdate) {
      this.current = root(this.host, template);
    } else {
      process(template, this.current.children[0], this.current, 0);
    }

    commit(collectActions(this.current));

    this.store.launchEffects();
    this.store.resetUsage();

    this.shouldUpdate = false;
  }

  onStateUpdate() {
    if (!this.fn) {
      return;
    }

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
  routes: Array<RawRoute<RuvyNode>>,
  config: Omit<RouterConfig, "onStateChange">
) => {
  Core.singleton.router = new Router(routes, {
    ...config,
    onStateChange: () => {
      Core.singleton.onStateUpdate();
    },
  });
};

export const Outlet = (): any => null;

export const useKey = <T>(key: string, value: T): StateArray<T> => {
  return Core.singleton.store.setItem<T>("state", key, value);
};

export const setEffect = (
  callback: Callback,
  key: string,
  dependencies: unknown = undefined
): void => {
  Core.singleton.store.setEffect("effect", key, callback, dependencies);
};

export const navigate = (path: string) => {
  Core.singleton.router.push(path);
};

export const getParams = <T = Record<string, string>>() => {
  return Core.singleton.router.params as T;
};

const win = window as unknown as Record<string, unknown>;

win.createJsxElement = createJsxElement;
win.createJsxFragmentElement = createFragmentTemplate;
