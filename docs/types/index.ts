import { RuvyNode } from '@/types.js';
import { PathRawRoute } from '@riadh-adrani/dom-router';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  Device = 'device',
}

export type DocItem = PathRawRoute<RuvyNode>;
