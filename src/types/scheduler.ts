import type { Callback } from "./common.js";

export type Task = {
  callback: Callback;
  id: string;
  date: number;
  type: string;
};
