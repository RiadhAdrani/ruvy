import { areEqual } from "@riadh-adrani/utils";
import { StoreEffect, StoreEffectsCollection } from "./types.js";
import Store from "./Store.js";

type Options = {
  name: string;
  keepUnused: boolean;
};

export default (manager: Store, { name, keepUnused }: Options): StoreEffectsCollection => {
  return {
    items: {},
    name,
    used: [],
    set: (key, effect, dep) => {
      const item: StoreEffect | undefined = manager.effects[name].items[key];

      manager.effects[name].used.push(key);

      if (item) {
        const current = item.dep;

        if (!areEqual(current, dep)) {
          item.shouldRun = true;
          item.effect = effect;
          item.dep = dep;
        }
      } else {
        const item: StoreEffect = {
          called: 0,
          dep,
          effect,
          key,
          shouldRun: true,
        };

        manager.effects[name].items[key] = item;
      }
    },
    clean: item => {
      if (keepUnused) {
        return;
      }

      delete manager.effects[name].items[item.key];
    },
    runner: item => {
      item.cleanUp?.();

      if (!item.shouldRun) {
        return;
      }

      const cleanUp = item.effect();

      if (cleanUp) {
        item.cleanUp = cleanUp;
      }

      item.called = item.called + 1;
      item.shouldRun = false;
    },
  };
};
