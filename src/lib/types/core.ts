import type { Callback } from "./common.js";

export interface MountParams {
  hostElement: HTMLElement;
  callback: Callback<JSX.Element>;
}
