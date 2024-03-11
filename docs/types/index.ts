import { PathRawRoute } from '@riadh-adrani/dom-router';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  Device = 'device',
}

export const Versions = ['0.5.0', '0.5.2', '0.5.3', '0.5.4', '0.5.5', '0.5.6'] as const;

export type Version = (typeof Versions)[number];

export interface DocItem extends PathRawRoute {
  versions: Array<DocVersion>;
  children?: Array<DocItem>;
}

export interface DocVersion {
  from: Version;
  to?: Version;
  md: string;
}
