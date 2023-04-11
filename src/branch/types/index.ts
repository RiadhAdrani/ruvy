import { Callback } from "@riadh-adrani/utils";

export enum BranchTag {
  Function = "#-function-branch",
  Element = "#-element-branch",
  Root = "#-root-branch",
  Fragment = "#-fragment-branch",
  Text = "#-text-branch",
}

export enum HookType {
  State = "#-setState",
  Effect = "#-setEffect",
  Memo = "#-setMemo",
}

export enum BranchStatus {
  Mounted = "#-mounted",
  Pending = "#-pending",
}

export const BranchSymbol = Symbol.for("#-ruvy-branch");

export enum ActionType {
  Render = "#-render-element",
}

export type BranchProps = Record<string, unknown>;

export type BranchHooks = Record<string, HookData<unknown>>;

export interface BranchTemplate {
  type: unknown;
  props: Record<string, unknown>;
  children: Array<unknown>;
  symbol: typeof BranchSymbol;
  key?: string | number;
}

export interface HookData<T> {
  key: string;
  type: HookType;
  data: T;
  initialData: T;
}

export interface BranchAction {
  type: ActionType;
  requestTime: number;
  callback: Callback;
}

export interface Branch {
  text?: string;
  tag: BranchTag;
  type: unknown;
  props: BranchProps;
  hooks: BranchHooks;
  pendingActions: Array<BranchAction>;
  parent?: Branch;
  status: BranchStatus;
  children: Array<Branch | undefined>;
  instance?: Element | Text;
  key: string | number;
}
