import { Callback } from '@riadh-adrani/utils';
import { CallbackWithArgs } from '../types/index.js';
import { createFragmentTemplate } from './create/index.js';

export enum Namespace {
  HTML = 'http://www.w3.org/1999/xhtml',
  SVG = 'http://www.w3.org/2000/svg',
  MATH = 'http://www.w3.org/1998/Math/MathML',
}

export enum BranchTag {
  Function = '#-function-branch',
  Element = '#-element-branch',
  Root = '#-root-branch',
  Fragment = '#-fragment-branch',
  Text = '#-text-branch',
  Null = '#-null-branch',
  Outlet = '#-outlet-branch',
  Context = '#-context-branch',
  Portal = '#-portal-branch',
  Conditional = '#-conditional-branch',
}

export enum HookType {
  State = '#-use-state',
  Effect = '#-use-effect',
  Memo = '#-use-Memo',
  Ref = '#-use-ref',
  Context = '#-use-context',
  Reactive = '#-use-reactive',
  Promise = '#-use-promise',
}

export enum BranchStatus {
  Mounted = '#-mounted',
  Mounting = '#-pending',
  Unmounting = '#-un-mounting',
  Unmounted = '#-un-mounted',
}

export const BranchSymbol = Symbol.for('#-ruvy-branch');

export enum ActionType {
  Render = '#-action-render-element',
  Reorder = '#-action-order-elements',
  Cleanup = '#-action-clean-effect',
  Effect = '#-action-run-effect',
  Unmount = '#-action-unmount-element',
  UpdateProps = '#-action-update-props',
  UpdateText = '#-action-text-node',
  Unmounted = '#-action-unmounted',
  RemoveBranch = '#-action-remove-branch',
  UpdatePortalChildren = '#-action-update-portal-children',
}

export const ActionPriority: { [key in ActionType]: number } = (() => {
  const items = {} as unknown as { [key in ActionType]: number };

  [
    ActionType.Unmount,
    ActionType.Render,
    ActionType.Unmounted,
    ActionType.RemoveBranch,
    ActionType.Reorder,
    ActionType.UpdatePortalChildren,
    ActionType.UpdateProps,
    ActionType.UpdateText,
    ActionType.Cleanup,
    ActionType.Effect,
  ].forEach((key, index) => (items[key] = index));

  return items;
})();

export interface UseMemoData<T = unknown> {
  deps: unknown;
  value: T;
}

export interface UseMemoParams<T = unknown> {
  callback: () => T;
  deps?: unknown;
}

export interface UseRefData<T = unknown> {
  value: T;
}

export type Effect = Callback<Callback | void>;

export interface UseEffectData {
  deps: unknown;
  callback: Effect;
  cleanUp?: Effect;
  pendingEffect?: Effect;
  pendingCleanUp?: Effect;
}

export type UseEffectParams = Pick<UseEffectData, 'callback' | 'deps'>;

export type UsePromiseState = 'pending' | 'refreshing' | 'resolved' | 'rejected';

export type UsePromiseParams<T = unknown> = Callback<Promise<T>>;

export type UsePromiseReturn<T = unknown> = [UsePromiseState, T | undefined, Callback];

export type UsePromiseData<T = unknown> = {
  callback: Callback<Promise<T>>;
  state: UsePromiseState;
  value: T | undefined;
};

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

export type HookDispatcher<D, R> = (key: string, data: D, current: Branch) => R;

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
  op: 'set' | 'update' | 'remove';
  priority: number;
}

export type RuvyNode = BranchTemplate | string | boolean | null | undefined | number;

export interface ContextObject<T = unknown> {
  Provider: (props: ContextComponentProps<T>) => BranchTemplate<BranchTag.Context>;
}

export interface ContextComponentProps<T = unknown> {
  value: T;
  children?: Array<unknown>;
}

export interface ComponentHandler<B = unknown, T = BranchTemplate, D = unknown> {
  create: (template: T, parent: Branch, key: BranchKey, data?: D) => Branch<B>;
  diff: (template: T, current: Branch<B>, data?: D) => Array<unknown>;
}

export type ComponentFunctionHandler<T = BranchTemplate, B = unknown, D = unknown> = (
  template: T,
  current: Branch<B> | undefined,
  parent: Branch,
  key: BranchKey,
  data?: D
) => { branch: Branch<B>; unprocessedChildren: Array<unknown> };
