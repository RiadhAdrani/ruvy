import { Namespace } from '@riadh-adrani/domer';

export enum ContextType {
  Idle = 'idle',
  Diff = 'diffing',
  Composable = 'composable',
  Component = 'component',
  Flush = 'flush',
  Paint = 'paint',
  Effect = 'effect',
  Hook = 'hook',
}

export interface IdleContext {
  type: ContextType.Idle;
}

export interface DiffContext {
  type: ContextType.Diff;
}

export interface ComposableContext {
  type: ContextType.Composable;
}

export interface ComponentContext {
  type: ContextType.Component;
}

export interface FlushContext {
  type: ContextType.Flush;
}

export interface PaintContext {
  type: ContextType.Paint;
}

export interface EffectContext {
  type: ContextType.Effect;
}

export interface HookContext {
  type: ContextType.Hook;
}

export type Context =
  | IdleContext
  | DiffContext
  | ComposableContext
  | ComponentContext
  | FlushContext
  | PaintContext
  | EffectContext
  | HookContext;

export type Callback<Return = void, Args extends Array<unknown> = Array<unknown>> = (
  ...args: Args
) => Return;

export type Arrayable<T> = T | Array<T>;

export interface Task {
  callback: () => void;
  id: string;
  date: Date;
}

export enum ComponentTag {
  Function = '#-function',
  Element = '#-element',
  Root = '#-root',
  Text = '#-text',
  Null = '#-null',
  Context = '#-context',
  Outlet = '#-outlet',
  Portal = '#-portal',
  Fragment = '#-fragment',
  JsxFragment = '#-jsx-fragment',
}

export enum HookType {
  State = '#-state',
  Effect = '#-effect',
  Memo = '#-memo',
  Ref = '#-ref',
  Context = '#-context',
}

export enum ComponentStatus {
  Mounted = '#-mounted',
  Mounting = '#-mounting',
  Unmounting = '#-unmounting',
  Unmounted = '#-unmounted',
}

export const ComponentSymbol = Symbol.for('ruvy-component');

export enum ActionType {
  Render = '#-render-element',
  RenderInnerHTML = '#-render-inner-html',
  Reorder = '#-order-elements',
  Cleanup = '#-clean-effect',
  Effect = '#-run-effect',
  Unmount = '#-unmount-element',
  UpdateProps = '#-update-props',
  UpdateText = '#-text-node',
  Unmounted = '#-unmounted',
  RemoveBranch = '#-remove-branch',
  UpdatePortalChildren = '#-update-portal-children',
  Mounted = '#-on-mounted',
}

export const ActionsSorted = [
  ActionType.Unmount,
  ActionType.Render,
  ActionType.RenderInnerHTML,
  ActionType.Unmounted,
  ActionType.RemoveBranch,
  ActionType.Reorder,
  ActionType.UpdatePortalChildren,
  ActionType.UpdateProps,
  ActionType.UpdateText,
  ActionType.Mounted,
  ActionType.Cleanup,
  ActionType.Effect,
];

export type Effect = Callback<Callback | void>;

export type Key = string | number;

export type RuvyNode = Template;

export interface UtilityProps {
  children?: Array<RuvyNode>;
  key?: Key;
  if?: boolean;
  else?: unknown;
  'else-if'?: boolean;
  switch?: unknown;
  case?: unknown;
  'case:default'?: unknown;
}

export type Props = Record<string, unknown> & UtilityProps;

export type PropComparison =
  | {
      key: string;
      operation: 'create' | 'update';
      value: unknown;
    }
  | { key: string; operation: 'remove' };

export interface CommonTemplate {
  props: Record<string, unknown>;
  children: Array<unknown>;
  symbol: typeof ComponentSymbol;
  key?: Key;
}

export interface PortalProps {
  container: Element;
}

export const Outlet = () => null as unknown as JSX.Element;

export const Portal = (props: PortalProps) => props as unknown as JSX.Element;

export const Fragment = () => null as unknown as JSX.Element;

export interface FunctionTemplate extends CommonTemplate {
  type: (props: Props) => unknown;
}

export interface ContextTemplate<T = unknown> extends CommonTemplate {
  type: ComponentTag.Context;
  props: ContextComponentProps<T>;
}

export interface OutletTemplate extends CommonTemplate {
  type: typeof Outlet;
}

export interface PortalTemplate extends CommonTemplate {
  type: typeof Portal;
  props: PortalComponentProps;
}

export interface FragmentTemplate extends CommonTemplate {
  type: typeof Fragment;
}

export interface JsxFragmentTemplate extends CommonTemplate {
  type: typeof createJsxFragmentElement;
}

export interface ElementTemplate extends CommonTemplate {
  type: string;
}

export type TextTemplate = string | number | true | object;

export type NullTemplate = undefined | null | false;

export type Template =
  | FunctionTemplate
  | OutletTemplate
  | PortalTemplate
  | FragmentTemplate
  | JsxFragmentTemplate
  | ElementTemplate
  | TextTemplate
  | NullTemplate
  | ContextTemplate;

export type JsxTemplate =
  | FunctionTemplate
  | OutletTemplate
  | PortalTemplate
  | FragmentTemplate
  | JsxFragmentTemplate
  | ElementTemplate
  | ContextTemplate;

export type PropsWithUtility<T extends object = object> = Partial<UtilityProps> & T;

export interface PortalComponentProps extends Record<string, unknown> {
  container: Element;
}

export interface ContextObject<T = unknown> {
  id: string;
  Provider: (props: ContextComponentProps<T>) => ContextTemplate<T>;
}

export interface ContextComponentProps<T = unknown> extends Record<string, unknown> {
  value: T;
  children?: Array<unknown>;
}

export interface CommonComponent {
  props: Record<string, unknown>;
  parent: Component;
  status: ComponentStatus;
  key: Key;
  unmountedChildren: Array<NonRootComponent>;
  children: Array<NonRootComponent>;
  old?: Component;
}

export interface FunctionComponent extends CommonComponent {
  tag: ComponentTag.Function;
  type: (props: Record<string, unknown>) => unknown;
  hooks: Record<string, Hook>;
}

export interface ElementComponent extends CommonComponent {
  tag: ComponentTag.Element;
  type: string;
  instance?: Node;
}

export interface RootComponent extends Pick<CommonComponent, 'children'> {
  tag: ComponentTag.Root;
  instance: Node;
}

export interface TextComponent extends Pick<CommonComponent, 'key' | 'old' | 'parent' | 'status'> {
  tag: ComponentTag.Text;
  text: string;
  instance?: Text;
}

export interface NullComponent extends Pick<CommonComponent, 'key' | 'old' | 'parent' | 'status'> {
  tag: ComponentTag.Null;
}

export interface OutletComponent extends CommonComponent {
  tag: ComponentTag.Outlet;
  type: typeof Outlet;
}

export interface PortalComponent extends CommonComponent {
  tag: ComponentTag.Portal;
  props: PortalComponentProps;
  instance?: Node;
  type: typeof Portal;
}

export interface JsxFragmentComponent extends CommonComponent {
  tag: ComponentTag.JsxFragment;
  props: PortalComponentProps;
  type: (props: Record<string, unknown>) => unknown;
}

export interface FragmentComponent extends CommonComponent {
  tag: ComponentTag.Fragment;
  props: PortalComponentProps;
  type: typeof Fragment;
}

export interface ContextComponent extends CommonComponent {
  tag: ComponentTag.Context;
  props: ContextComponentProps;
  // TODO: context type
  type: typeof Fragment;
}

export type HostComponent = RootComponent | ElementComponent | PortalComponent;

export type NodeComponent = ElementComponent | TextComponent;

export type SwitchControllerComponent =
  | FunctionComponent
  | ElementComponent
  | PortalComponent
  | FragmentComponent
  | ContextComponent;

export type ComponentWithChildren =
  | FunctionComponent
  | ElementComponent
  | OutletComponent
  | PortalComponent
  | JsxFragmentComponent
  | FragmentComponent
  | ContextComponent;

export type NonRootComponent =
  | FunctionComponent
  | ElementComponent
  | TextComponent
  | NullComponent
  | OutletComponent
  | PortalComponent
  | JsxFragmentComponent
  | FragmentComponent
  | ContextComponent;

export type Component =
  | FunctionComponent
  | ElementComponent
  | RootComponent
  | TextComponent
  | NullComponent
  | OutletComponent
  | PortalComponent
  | JsxFragmentComponent
  | FragmentComponent
  | ContextComponent;

export type SetState<T = unknown> = (valueOrSetter: T | ((val: T) => T)) => void;

export interface StateHook<T = unknown> {
  type: HookType.State;
  value: T;
  setValue: SetState<T>;
  getValue: () => T;
}

export interface EffectHook {
  type: HookType.Effect;
  deps: unknown;
  callback: Effect;
  cleanup?: Effect;
  pendingEffect?: Effect;
  pendingCleanup?: Effect;
}

export interface MemoHook<T = unknown> {
  type: HookType.Memo;
  deps: unknown;
  value: T;
}

export interface RefValue<T = unknown> {
  value: T;
}

export interface RefHook<T = unknown> {
  type: HookType.Ref;
  value: RefValue<T>;
}

export interface ContextHook<T = unknown> {
  type: HookType.Context;
  value: T;
}

export type Hook<T = unknown> =
  | EffectHook
  | StateHook<T>
  | MemoHook<T>
  | RefHook<T>
  | ContextHook<T>;

export enum MicroTaskType {
  RenderElement = 'render-element',
  RenderText = 'render-text',
  RenderInnerHTML = 'render-inner-html',
  ReorderElements = 'reorder-elements',
  RunEffectCleanup = 'run-cleanup',
  RunEffect = 'run-effect',
  UnmountComponent = 'unmount-component',
  UpdateProps = 'update-props',
  UpdateText = 'update-text',
  UnmountedComponent = 'unmounted-component',
  RemoveComponent = 'remove-component',
  UpdatePortalChildren = 'update-portal-children',
  SetComponentMounted = 'mounted-component',
  RefElement = 'ref-element',
  UnrefEelement = 'unref-element',
}

export const MicroTaskSorted = [
  MicroTaskType.UnmountComponent,
  MicroTaskType.RenderElement,
  MicroTaskType.UnrefEelement,
  MicroTaskType.RefElement,
  MicroTaskType.RenderInnerHTML,
  MicroTaskType.UnmountedComponent,
  MicroTaskType.RemoveComponent,
  MicroTaskType.ReorderElements,
  MicroTaskType.UpdatePortalChildren,
  MicroTaskType.UpdateProps,
  MicroTaskType.UpdateText,
  MicroTaskType.SetComponentMounted,
  MicroTaskType.RunEffectCleanup,
  MicroTaskType.RunEffect,
];

export interface MicroTask {
  execute: () => void;
  component: Component;
  id: string;
  type: MicroTaskType;
  date: Date;
}

export interface ExecutionContext {
  /** Store closest context values for easy of access */
  contexts: Record<string, unknown>;
  /** warn if there is a change of context */
  ns?: Namespace;
}

export type ComponentTasks = Record<MicroTaskType, Array<MicroTask>>;

export interface ComponentHandlerResult<C extends Component> {
  component: C;
  children: Array<Template>;
  tasks: ComponentTasks;
  ctx: ExecutionContext;
}

export type ComponentHandler<T extends Template, C extends Component, D = unknown> = (
  template: T,
  component: C | undefined,
  parent: Component,
  key: Key,
  ctx: ExecutionContext,
  data?: D
) => ComponentHandlerResult<C>;

export type ComputedChildrenMap = Record<Key, { component: NonRootComponent; index: number }>;
