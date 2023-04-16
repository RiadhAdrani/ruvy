import type { Callback } from "./common.js";

export interface IMountConfig {
  hostElement: HTMLElement;
  callback: Callback<JSX.Element>;
}
