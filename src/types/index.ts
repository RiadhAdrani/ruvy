import { Arrayable } from '@riadh-adrani/utils';
import type * as CSS from 'csstype';
import { RuvyNode } from '../index.js';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type PropsWithChildren<T extends object> = { children?: Array<RuvyNode> } & T;

export type CallbackWithArgs<A extends Array<unknown> = [], R = void> = (...args: A) => R;

export type DOMEventTarget<T extends Element> = Event & T;

export type DOMEvent<E extends Event = Event, T extends Element = HTMLElement> = Event &
  E & {
    target: DOMEventTarget<HTMLElement>;
    currentTarget: DOMEventTarget<T>;
  };

export type DOMEventHandler<E extends Event = Event, T extends Element = HTMLElement> = (
  event: DOMEvent<E, T>
) => void;

export type Selector = { [key in keyof CSS.Properties]: Arrayable<string | number> } & Record<
  string,
  unknown
>;
