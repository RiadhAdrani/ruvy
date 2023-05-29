import { areEqual, copy, Callback } from "@riadh-adrani/utils";
import { StoreItem, StoreItemsCollection } from "./types.js";
import Store from "./Store.js";

type Options = {
  name: string;
  checkEqual: boolean;
  forceSet: boolean;
  keepUnused: boolean;
  onChanged: Callback;
};

export default (
  manager: Store,
  { name, checkEqual, forceSet, keepUnused, onChanged }: Options
): StoreItemsCollection => {
  return {
    items: {},
    name,
    used: [],
    set: (key, value) => {
      const maybe = manager.items[name].items[key];

      manager.items[name].used.push(key);

      if (maybe && !forceSet) {
        return;
      }

      const creationIndex = Object.keys(manager.items[name].items).length;

      const item: StoreItem = {
        creationIndex,
        history: [],
        key,
        value,
      };

      manager.items[name].items[key] = item;
    },
    update: (key, value) => {
      const item = manager.items[name].items[key];

      const current = item.value;

      if (areEqual(current, value, 20) && checkEqual) {
        return;
      }

      item.history.push(copy(current));
      item.value = value;

      onChanged();
    },
    get: key => {
      return manager.items[name].items[key].value;
    },
    clean: item => {
      if (keepUnused) {
        return;
      }

      delete manager.items[name].items[item.key];
    },
  };
};
