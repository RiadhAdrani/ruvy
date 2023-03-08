import { isElement } from "@riadh-adrani/dom-control-js";
import { isFunction } from "@riadh-adrani/utils";
import {
  diffComponents,
  executeUpdateCallbacks,
  processComponent,
  renderComponent,
  createComponent as createComponentUnWrapped,
} from "../component";
import { Context } from "../context";
import { Scheduler } from "../scheduler";
import { createEffectCollection, createStateCollection, Store } from "../store";
import { Callback, IComponent, IComponentTemplate, StateArray, Tag } from "../types";
import { IMountConfig } from "../types/core";

let current: IComponent;
let host: HTMLElement;
let shouldUpdate = false;
let fn: Callback<IComponentTemplate>;

const batchContext = new Context<boolean>();
const scheduler = new Scheduler();
const store = new Store();

store.createItemsStore(() =>
  createStateCollection(store, {
    name: "state",
    checkEqual: true,
    forceSet: false,
    keepUnused: false,
    onChanged: () => onStateUpdate(),
  })
);

store.createEffectsStore(() =>
  createEffectCollection(store, {
    name: "effect",
    keepUnused: false,
  })
);

const executeRoutine = (isUpdate = true) => {
  if (!isUpdate) {
    current = processComponent(fn());
    host.appendChild(renderComponent(current));
  } else {
    const updated = processComponent(fn());
    const actions = diffComponents(current, updated);

    executeUpdateCallbacks(actions);
  }

  store.launchEffects();
  store.resetUsage();
};

const onStateUpdate = () => {
  shouldUpdate = true;

  if (batchContext.data === true) {
    return;
  }

  scheduler.schedule({
    date: Date.now(),
    id: `${Date.now()}`,
    type: "update",
    callback: () => {
      executeRoutine();
    },
  });
};

export const mountApp = ({ callback, hostElement }: IMountConfig) => {
  if (!isFunction(callback)) {
    throw "Unexpected prop: app callback is not a function.";
  }

  if (isElement(hostElement)) {
    host = hostElement;
  } else {
    host = document.body;
  }

  scheduler.schedule({
    date: Date.now(),
    id: Date.now().toString(),
    type: "render",
    callback: () => {
      fn = callback;

      executeRoutine(false);
    },
  });
};

export const setState = <T>(key: string, value: T): StateArray<T> => {
  return store.setItem<T>("state", key, value);
};

export const setEffect = (
  callback: Callback,
  key: string,
  dependencies: unknown = undefined
): void => {
  store.setEffect("effect", key, callback, dependencies);
};

export const createComponent = (tag: Tag, options?: Record<string, unknown>) => {
  const opts = options ?? {};

  const eventWrapper = (callback: Callback) => {
    batchContext.use(callback, true, () => {
      if (shouldUpdate) {
        executeRoutine();
      }
    });
  };

  return createComponentUnWrapped(tag, opts, { eventWrapper });
};
