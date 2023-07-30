import { Callback } from '@riadh-adrani/type-utils';

export interface MountParams {
  hostElement: HTMLElement;
  callback: Callback<JSX.Element>;
}
