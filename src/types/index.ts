export * from "../branch/types.js";

export type CallbackWithArgs<A extends Array<unknown> = [], R = void> = (...args: A) => R;
