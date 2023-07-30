import { Arrayable } from '@riadh-adrani/type-utils';
import type * as CSS from 'csstype';
import { RuvyNode } from '../index.js';
import { BranchKey } from 'src/branch/types.js';

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

export type Selector = { [key in keyof CSS.Properties]: Arrayable<CSS.Properties[key]> } & Record<
  string,
  unknown
>;

export interface UtilityProps {
  children: Array<RuvyNode>;
  key: BranchKey;
  if: boolean;
  else: unknown;
  'else-if': boolean;
  switch: unknown;
  case: unknown;
  'case:default': unknown;
}

export type PropsWithUtility<T extends object = object> = Partial<UtilityProps> & T;
