import { Arrayable } from "@riadh-adrani/utils";

export type { Arrayable };

export type Callback<T = void> = () => T;

export type CallbackWithArgs<A extends Array<unknown> = [], R = void> = (...args: A) => R;
