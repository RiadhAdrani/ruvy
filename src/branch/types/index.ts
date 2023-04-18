import { Callback } from "@riadh-adrani/utils";
import { CallbackWithArgs } from "../../types/common.js";
import { createFragmentTemplate } from "../create/index.js";

export enum BranchTag {
  Function = "#-function-branch",
  Element = "#-element-branch",
  Root = "#-root-branch",
  Fragment = "#-fragment-branch",
  Text = "#-text-branch",
  Null = "#-null-branch",
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
  Render = "#-action-render-element",
  Effect = "#-action-run-effect",
  CleanUp = "#-action-clean-up",
}

export type Effect = Callback<Callback | void>;

export interface SetEffectData {
  deps: unknown;
  callback: Effect;
  cleanUp?: Effect;
  pendingEffect?: Effect;
  pendingCleanUp?: Effect;
}

export type SetEffectParams = Pick<SetEffectData, "callback" | "deps">;

export type BranchProps = Record<string, unknown>;

export type BranchHooks = Record<string, HookData<unknown>>;

export type BranchKey = string | number;

export interface BranchTemplate<T = unknown> {
  type: T;
  props: Record<string, unknown>;
  children: Array<unknown>;
  symbol: typeof BranchSymbol;
  key?: BranchKey;
}

export type BranchTemplateFunction = BranchTemplate<
  CallbackWithArgs<[Record<string, unknown>], unknown>
>;

export type BranchTemplateFragment = BranchTemplate<typeof createFragmentTemplate>;

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
  key: BranchKey;
}
