import { Callback } from "./common";
import { IComponent, IComponentTemplate } from "./component";

export type IRuvyConfig = {
  callback: Callback<IComponentTemplate>;
  hostElement: HTMLElement;
  current: IComponent;
};

export type IMountConfig = Omit<IRuvyConfig, "current">;
