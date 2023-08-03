import type { Callback } from '@riadh-adrani/type-utils';

export type EffectCallback = Callback<void | Callback>;

export type SetStateCallback<T> = (currentValue: T) => T;
export type StateSetter<T> = (valeuOrSetter: T | SetStateCallback<T>) => void;
export type StateGetter<T> = Callback<T>;

export type StateInitializer<T> = Callback<T>;

export type StateArray<T> = [T, StateSetter<T>, StateGetter<T>];
