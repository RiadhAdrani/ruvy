import { RuvyNode } from '@/types.js';
import { RawRoute } from '@riadh-adrani/dom-router';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  Device = 'device',
}

export type DocItem = RawRoute<RuvyNode>;
