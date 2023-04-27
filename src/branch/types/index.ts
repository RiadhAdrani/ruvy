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
  State = "#-use-state",
  Effect = "#-use-effect",
  Memo = "#-use-Memo",
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
  Cleanup = "#-action-clean-effect",
  Effect = "#-action-run-effect",
  Unmount = "#-action-unmount-element",
  UpdateProps = "#-action-update-props",
  UpdateText = "#-action-text-node",
  Unmounted = "#-action-unmounted",
  RemoveBranch = "#-action-remove-branch",
}

export const ActionPriority: { [key in ActionType]: number } = (() => {
  const items = {} as unknown as { [key in ActionType]: number };

  [
    ActionType.Unmount,
    ActionType.Render,
    ActionType.Unmounted,
    ActionType.RemoveBranch,
    ActionType.Reorder,
    ActionType.UpdateProps,
    ActionType.UpdateText,
    ActionType.Cleanup,
    ActionType.Effect,
  ].forEach((key, index) => (items[key] = index));

  return items;
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
  debug?: unknown;
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
  unmountedChildren: Array<Branch>;
}

export interface PropDiff<T = unknown> {
  prop: string;
  value: T;
  op: "set" | "update" | "remove";
  priority: number;
}

export type RuvyNode = BranchTemplate | string | boolean | null | undefined | number;
