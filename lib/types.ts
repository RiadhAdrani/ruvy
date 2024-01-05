import { RouterConfig } from '@riadh-adrani/dom-router';
import { Namespace } from '@riadh-adrani/domer';

export type Requester = FunctionComponent | OutletComponent | Composable;

export type RequestType = 'mount' | 'update' | 'route' | 'unmount';

export interface RequestObject {
  id: string;
  date: Date;
  fulfilled: boolean;
  type: RequestType;
}

export interface UpdateRequest extends RequestObject {
  type: 'update';
  requester: Requester;
}

export interface RouteUpdateRequest extends RequestObject {
  type: 'route';
}

export interface RenderRequest extends RequestObject {
  type: 'mount';
  root: RootComponent;
  child: Template;
}

export interface UnmountRequest extends RequestObject {
  type: 'unmount';
}

export type Request = UpdateRequest | RenderRequest | RouteUpdateRequest | UnmountRequest;

export type SchedulerState = 'idle' | 'batching' | 'processing' | 'unmounting';

export type RequestData =
  | Pick<RenderRequest, 'child' | 'root' | 'type'>
  | Pick<UpdateRequest, 'requester' | 'type'>
  | Pick<RouteUpdateRequest, 'type'>
  | Pick<UnmountRequest, 'type'>;

export interface GlobalContext {
  preventRequests?: boolean;
  preventRequestsProcessing?: boolean;
}

export type Callback<Return = void, Args extends Array<unknown> = Array<unknown>> = (
  ...args: Args
) => Return;

export type Arrayable<T> = T | Array<T>;

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
  Composable = '#-composable',
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

export type Effect = () => (() => void) | void;

export type Key = string | number;

export type RuvyNode = Template;

export type FunctionTemplateCallback = (props: Props) => Template;

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

export type Props<T = object> = Record<string, unknown> & UtilityProps & T;

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
  type: FunctionTemplateCallback;
}

export interface ContextTemplate<T = unknown> extends CommonTemplate {
  type: ComponentTag.Context;
  props: Props<{ value: T; ctx: ContextObject<T> }>;
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

export type NodeTemplate = TextTemplate | ElementTemplate;

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
  children: Array<Template>;
}

export interface ContextObject<T = unknown> {
  id: string;
  Provider: (props: ContextProviderProps<T>) => JSX.Element;
  use: () => T;
}

export interface ContextProviderProps<T = unknown> extends Record<string, unknown> {
  value: T;
  children?: Array<unknown>;
}

export interface CreateContextComponentProviderProps<T = unknown> extends ContextProviderProps<T> {
  ctx: ContextObject<T>;
}

export interface CommonComponent {
  props: Record<string, unknown>;
  parent: Component;
  status: ComponentStatus;
  key: Key;
  children: Array<NonRootComponent>;
}

export interface FunctionComponent extends CommonComponent {
  tag: ComponentTag.Function;
  type: FunctionTemplateCallback;
  hooks: Array<Hook>;
  ctx: ExecutionContext;
}

export interface NodeComponentBase<T = Node> {
  domParent: HostComponent;
  instance?: T;
}

export interface ElementComponent extends CommonComponent, NodeComponentBase<Element> {
  tag: ComponentTag.Element;
  type: string;
}

export interface RootComponent extends Pick<CommonComponent, 'children'> {
  tag: ComponentTag.Root;
  instance: Node;
}

export interface TextComponent
  extends Pick<CommonComponent, 'key' | 'parent' | 'status'>,
    NodeComponentBase<Text> {
  tag: ComponentTag.Text;
  text: string;
  /** @deprecated */
  position: number;
}

export interface NullComponent extends Pick<CommonComponent, 'key' | 'parent' | 'status'> {
  tag: ComponentTag.Null;
}

export interface OutletComponent extends CommonComponent {
  tag: ComponentTag.Outlet;
  type: typeof Outlet;
  ctx: ExecutionContext;
}

export interface PortalComponent extends CommonComponent {
  tag: ComponentTag.Portal;
  props: PortalComponentProps;
  instance?: Node;
  type: typeof Portal;
}

export interface JsxFragmentComponent extends CommonComponent {
  tag: ComponentTag.JsxFragment;
  type: (props: Array<unknown>) => unknown;
}

export interface FragmentComponent extends CommonComponent {
  tag: ComponentTag.Fragment;
  type: typeof Fragment;
}

export interface ContextComponent extends CommonComponent {
  tag: ComponentTag.Context;
  props: Props<{ value: unknown; ctx: ContextObject }>;
  type: ComponentTag.Context;
}

export type HostComponent = RootComponent | ElementComponent | PortalComponent;

export type NodeComponent = ElementComponent | TextComponent;

export type JsxComponent =
  | FunctionComponent
  | ElementComponent
  | PortalComponent
  | FragmentComponent
  | JsxFragmentComponent
  | ContextComponent
  | OutletComponent;

export type SwitchControllerComponent =
  | FunctionComponent
  | ElementComponent
  | PortalComponent
  | FragmentComponent
  | ContextComponent;

export type ParentComponent =
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

export type Component = NonRootComponent | RootComponent;

export interface Composable<R = unknown> {
  id: string;
  name: string;
  hooks: Array<Hook>;
  value: R;
  subscribers: Array<FunctionComponent | Composable>;
  status: ComponentStatus;
  index: number;
  callback: () => R;
}

export type CreateState<T = unknown> = T | (() => T);

export type SetState<T = unknown> = (valueOrSetter: T | ((val: T) => T)) => void;

export type GetState<T = unknown> = () => T;

export type UseState<T = unknown> = [T, SetState<T>, GetState<T>];

export interface StateHook<T = unknown> {
  type: HookType.State;
  value: T;
  setValue: SetState<T>;
  getValue: () => T;
}

export interface HookCaller {
  component: FunctionComponent | Composable;
  tasks: ComponentTasks;
  ctx: ExecutionContext;
}

export interface EffectHook {
  type: HookType.Effect;
  deps: unknown;
  callback: Effect;
  cleanup?: () => void;
}

export interface MemoHook<T = unknown> {
  type: HookType.Memo;
  deps: unknown;
  value: T;
}

export interface RefValue<T = unknown> {
  value: T | undefined;
}

export interface RefHook<T = unknown> {
  type: HookType.Ref;
  value: RefValue<T>;
}

export interface ContextHook<T = unknown> {
  type: HookType.Context;
  value: ContextObject<T>;
}

export interface ComposableHook {
  type: HookType.Composable;
  name: string;
}

export type Hook<T = unknown> =
  | EffectHook
  | StateHook<T>
  | MemoHook<T>
  | RefHook<T>
  | ContextHook<T>
  | ComposableHook;

export enum TaskType {
  RenderElement = 'render-element',
  RenderText = 'render-text',
  RenderInnerHTML = 'render-inner-html',
  ReorderElements = 'reorder-elements',
  ChangeElementPosition = 'change-element-position',
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

export const TasksSorted = [
  TaskType.UnmountComponent,
  TaskType.RenderElement,
  TaskType.RenderText,
  TaskType.UnrefEelement,
  TaskType.RefElement,
  TaskType.RenderInnerHTML,
  TaskType.UnmountedComponent,
  TaskType.RemoveComponent,
  TaskType.ChangeElementPosition,
  TaskType.ReorderElements,
  TaskType.UpdatePortalChildren,
  TaskType.UpdateProps,
  TaskType.UpdateText,
  TaskType.SetComponentMounted,
  TaskType.RunEffectCleanup,
  TaskType.RunEffect,
];

export interface Task {
  execute: () => void;
  component: Component | Composable;
  id: string;
  type: TaskType;
  date: Date;
}

export interface ExecutionContext {
  /** Store closest context values for easy of access */
  contexts: Record<string, unknown>;
  /** warn if there is a change of context */
  ns?: Namespace;
  /** current outlet depth */
  outletDepth?: number;
  /** component index in the parent */
  index: number;
  /** component key in the parent */
  key: Key;
  /** direct parent component */
  parent: ParentComponent;
  /** DOM specific data */
  dom: {
    /** parent in the DOM */
    parent: HostComponent;
  };
}

export type ComponentTasks = Record<TaskType, Array<Task>>;

export interface ComponentHandlerResult<C extends Component> {
  component: C;
  children: Array<Template>;
  tasks: ComponentTasks;
  ctx: ExecutionContext;
}

export type ComponentHandler<T extends Template, C extends Component> = (
  template: T,
  component: C | undefined,
  parent: Component,
  key: Key,
  ctx: ExecutionContext
) => ComponentHandlerResult<C>;

export type ComputedChildrenMap = Record<Key, { component: NonRootComponent; index: number }>;

export interface UnmountComponentData {
  isHostParentUnmounting?: boolean;
}

export type ValueOrFalse<T = unknown> = { value: T } | false;

export type IfDirectiveSequence = { fullfilled: boolean; last: 'if' | 'else-if' | 'else' } | false;

export interface IfDirectiveProcessResult {
  sequence: IfDirectiveSequence;
  nullify: boolean;
}

export type RouterOptions = Pick<
  RouterConfig<Template>,
  'base' | 'correctScrolling' | 'routes' | 'transformTitle' | 'type'
>;

export interface MountAppConfig {
  app: RuvyNode;
  host: Element;
}
