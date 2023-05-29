import type { Callback } from "@riadh-adrani/utils";

export type Task = {
  callback: Callback;
  id: string;
  date: number;
  type: string;
};
