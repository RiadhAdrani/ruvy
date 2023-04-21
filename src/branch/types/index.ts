import { Callback } from "@riadh-adrani/utils";
import { CallbackWithArgs } from "../../types/common.js";
import { createFragmentTemplate } from "../create/index.js";

export enum Namespace {
  HTML = "http://www.w3.org/1999/xhtml",
  SVG = "http://www.w3.org/2000/svg",
  MATH = "http://www.w3.org/1998/Math/MathML",
}

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
  Mounting = "#-pending",
  Unmounting = "#-un-mounting",
  Unmounted = "#-un-mounted",
}

export const BranchSymbol = Symbol.for("#-ruvy-branch");

export enum ActionType {
  Render = "#-action-render-element",
  Reorder = "#-action-order-elements",
  Cleanup = "#-action-clean-up-effects",
  Effect = "#-action-run-effect",
  Unmount = "#-action-unmount-element",
  UpdateProps = "#-action-update-props",
  Unmounted = "#-action-unmounted-effect",
}

export const ActionPriority: { [key in ActionType]: number } = (() => {
  return [
    ActionType.Render,
    ActionType.Unmount,
    ActionType.Unmounted,
    ActionType.Reorder,
    ActionType.UpdateProps,
    ActionType.Cleanup,
    ActionType.Effect,
  ].map((key, index) => ({ [key]: index })) as unknown as { [key in ActionType]: number };
})();

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

export interface Branch<Type = unknown> {
  text?: string;
  tag: BranchTag;
  type: Type;
  props: BranchProps;
  hooks: BranchHooks;
  pendingActions: Array<BranchAction>;
  parent?: Branch;
  status: BranchStatus;
  children: Array<Branch>;
  instance?: Node;
  key: BranchKey;
  old?: Branch;
  flags?: {
    willBeReplaced?: boolean;
  };
}

export interface PropDiff<T = unknown> {
  prop: string;
  value: T;
  op: "set" | "update" | "remove";
  priority: number;
}
