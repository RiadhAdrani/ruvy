import { Callback } from "./common";
import { IComponentTemplate } from "./component";

export interface IMountConfig {
  hostElement: HTMLElement;
  callback: Callback<IComponentTemplate>;
}
