import type { Callback } from '@riadh-adrani/utils';

export interface StoreItem<T = unknown> {
  key: string;
  value: T;
  history: Array<T>;
  creationIndex: number;
}

export interface StoreEffect {
  key: string;
  dep: unknown;
  effect: EffectCallback;
  called: number;
  shouldRun: boolean;
  cleanUp?: Callback;
}

export type EffectCallback = Callback<void | Callback>;

export type StoreItemSetter<T = unknown> = (key: string, value: T) => void;
export type StoreItemGetter<T = unknown> = (key: string) => T;
export type StoreItemCleaner = (item: StoreItem, wasUsed: boolean) => void;
export type StoreItemUpdate<T = unknown> = (key: string, value: T) => void;

export type StoreEffectSetter = (key: string, effect: EffectCallback, dep: unknown) => void;
export type StoreEffectRunner = (item: StoreEffect) => void;
export type StoreEffectCleaner = (item: StoreEffect, wasUsed: boolean) => void;

export interface StoreCollection<T> {
  name: string;
  items: Record<string, T>;
  used: Array<string>;
}

export interface StoreItemsCollection extends StoreCollection<StoreItem> {
  set: StoreItemSetter;
  get: StoreItemGetter;
  clean: StoreItemCleaner;
  update: StoreItemUpdate;
}

export interface StoreEffectsCollection extends StoreCollection<StoreEffect> {
  runner: StoreEffectRunner;
  clean: StoreEffectCleaner;
  set: StoreEffectSetter;
}

export type StateArray<T> = [T, (value: T) => void, Callback<T>];
