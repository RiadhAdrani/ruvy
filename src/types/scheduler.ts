import { Callback } from "./common";

export type Task = {
  callback: Callback;
  id: string;
  date: number;
  type: string;
};
