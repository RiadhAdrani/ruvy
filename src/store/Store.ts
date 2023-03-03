import { copy, hasProperty } from "@riadh-adrani/utils";
import { EffectCallback, StateArray, StoreEffectsCollection, StoreItemsCollection } from "../types";

export default class Store {
  items: Record<string, StoreItemsCollection> = {};
  effects: Record<string, StoreEffectsCollection> = {};

  createItemsStore(callback: (manager: Store) => StoreItemsCollection) {
    const collection = callback(this);

    if (hasProperty(this.items, collection.name)) {
      throw `Conflict: Item collection with name ${collection.name} already exist.`;
    }

    this.items[collection.name] = collection;
  }

  createEffectsStore(callback: (manager: Store) => StoreEffectsCollection) {
    const collection = callback(this);

    if (hasProperty(this.items, collection.name)) {
      throw `Conflict: Item collection with name ${collection.name} already exist.`;
    }

    this.effects[collection.name] = collection;
  }

  getItemsCollection(name: string): StoreItemsCollection {
    if (!hasProperty(this.items, name)) {
      throw `Not Found: collection ${name} does not exist.`;
    }

    return this.items[name];
  }

  getEffectsCollection(name: string): StoreEffectsCollection {
    if (!hasProperty(this.effects, name)) {
      throw `Not Found: collection ${name} does not exist.`;
    }

    return this.effects[name];
  }

  getItem<T>(name: string, key: string): StateArray<T> {
    const collection = this.getItemsCollection(name);

    const $value = copy(collection.get(key) as T);
    const $setter = (value: T) => collection.update(key, value);
    const $getter = () => copy(collection.get(key) as T);

    return [$value, $setter, $getter];
  }

  setItem<T>(name: string, key: string, value: T): StateArray<T> {
    this.getItemsCollection(name).set(key, value);

    return this.getItem<T>(name, key);
  }

  updateItem<T>(name: string, key: string, value: T): void {
    this.getItemsCollection(name).update(key, value);
  }

  removeItem(name: string, key: string): void {
    const collection = this.getItemsCollection(name);

    const item = collection.items[key];
    const wasUsed = collection.used.includes(key);

    collection.clean(item, wasUsed);
  }

  setEffect(name: string, key: string, callback: EffectCallback, dep: unknown) {
    const collection = this.getEffectsCollection(name);

    collection.set(key, callback, dep);
  }

  runEffect(name: string, key: string): void {
    const collection = this.getEffectsCollection(name);

    const effect = collection.items[key];

    this.getEffectsCollection(name).runner(effect);
  }

  removeEffect(name: string, key: string): void {
    const collection = this.getEffectsCollection(name);

    const item = collection.items[key];
    const wasUsed = collection.used.includes(key);

    collection.clean(item, wasUsed);
  }

  resetUsage() {
    Object.keys(this.items).forEach((name) => {
      this.items[name].used = [];
    });

    Object.keys(this.effects).forEach((name) => {
      this.items[name].used = [];
    });
  }
}
