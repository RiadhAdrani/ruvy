import type { Callback } from "./common.js";
import type { IComponentTemplate } from "./component.js";

export interface IMountConfig {
  hostElement: HTMLElement;
  callback: Callback<IComponentTemplate>;
}
