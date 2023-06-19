import { RawRoute, RuvyNode } from '../index.js';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  Device = 'device',
}

export type DocItem = RawRoute<RuvyNode>;
