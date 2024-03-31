import { DestinationRequest } from '@riadh-adrani/dom-router';
import { PropsWithUtility } from './types.js';
import CSS from 'csstype';

export type Arrayable<T> = T | Array<T>;

export type TypedEvent<
  E extends Event = Event,
  C extends Element = Element,
  T extends Element = Element
> = Event & E & { target: T; currentTarget: C };

export type TypedEventHandler<
  E extends Event = Event,
  C extends Element = Element,
  T extends Element = Element
> = (event: TypedEvent<E, C, T>) => void;

export type Selector = { [key in keyof CSS.Properties]: Arrayable<CSS.Properties[key]> } & Record<
  string,
  unknown
>;

export type StringWithAutoComplete<T> = T | (string & Record<never, never>);

export interface TypedEventMap<E extends Element> {
  onAnimationEnd: TypedEventHandler<AnimationEvent, E>;
  onAnimationIteration: TypedEventHandler<AnimationEvent, E>;
  onAnimationStart: TypedEventHandler<AnimationEvent, E>;

  onBlur: TypedEventHandler<FocusEvent, E>;
  onFocus: TypedEventHandler<FocusEvent, E>;
  onFocusIn: TypedEventHandler<FocusEvent, E>;
  onFocusOut: TypedEventHandler<FocusEvent, E>;

  onChange: TypedEventHandler<InputEvent, E>;
  onInput: TypedEventHandler<InputEvent, E>;
  onBeforeInput: TypedEventHandler<InputEvent, E>;
  onSubmit: TypedEventHandler<SubmitEvent, E>;

  onCompositionEnd: TypedEventHandler<CompositionEvent, E>;
  onCompositionStart: TypedEventHandler<CompositionEvent, E>;
  onCompositionUpdate: TypedEventHandler<CompositionEvent, E>;

  onCopy: TypedEventHandler<ClipboardEvent, E>;
  onCut: TypedEventHandler<ClipboardEvent, E>;
  onPaste: TypedEventHandler<ClipboardEvent, E>;

  onAbort: TypedEventHandler<Event, E>;
  onLoad: TypedEventHandler<Event, E>;
  onLoadStart: TypedEventHandler<Event, E>;
  onLoadedData: TypedEventHandler<Event, E>;
  onLoadedMetadata: TypedEventHandler<Event, E>;
  onCanPlay: TypedEventHandler<Event, E>;
  onCanPlayThrough: TypedEventHandler<Event, E>;
  onDurationChange: TypedEventHandler<Event, E>;
  onEmptied: TypedEventHandler<Event, E>;
  onEncrypted: TypedEventHandler<Event, E>;
  onPause: TypedEventHandler<Event, E>;
  onEnded: TypedEventHandler<Event, E>;
  onPlay: TypedEventHandler<Event, E>;
  onPlaying: TypedEventHandler<Event, E>;
  onProgress: TypedEventHandler<Event, E>;
  onRateChange: TypedEventHandler<Event, E>;
  onSeeked: TypedEventHandler<Event, E>;
  onSeeking: TypedEventHandler<Event, E>;
  onTimeUpdate: TypedEventHandler<Event, E>;

  onInvalid: TypedEventHandler<Event, E>;
  onResize: TypedEventHandler<UIEvent, E>;
  onReset: TypedEventHandler<Event, E>;
  onScroll: TypedEventHandler<Event, E>;
  onSelect: TypedEventHandler<Event, E>;
  onShow: TypedEventHandler<Event, E>;
  onStalled: TypedEventHandler<Event, E>;
  onSuspend: TypedEventHandler<Event, E>;
  onToggle: TypedEventHandler<Event, E>;
  onTransitionEnd: TypedEventHandler<TransitionEvent>;
  onVolumeChange: TypedEventHandler<Event, E>;
  onWaiting: TypedEventHandler<Event, E>;
  onWheel: TypedEventHandler<WheelEvent, E>;

  onDrag: TypedEventHandler<DragEvent, E>;
  onDragEnd: TypedEventHandler<DragEvent, E>;
  onDragEnter: TypedEventHandler<DragEvent, E>;
  onDragLeave: TypedEventHandler<DragEvent, E>;
  onDragOver: TypedEventHandler<DragEvent, E>;
  onDragStart: TypedEventHandler<DragEvent, E>;
  onDrop: TypedEventHandler<DragEvent, E>;

  onKeyDown: TypedEventHandler<KeyboardEvent, E>;
  onKeyPress: TypedEventHandler<KeyboardEvent, E>;
  onKeyUp: TypedEventHandler<KeyboardEvent, E>;

  onContextMenu: TypedEventHandler<MouseEvent, E>;
  onClick: TypedEventHandler<MouseEvent, E>;
  onDblClick: TypedEventHandler<MouseEvent, E>;
  onMouseDown: TypedEventHandler<MouseEvent, E>;
  onMouseEnter: TypedEventHandler<MouseEvent, E>;
  onMouseLeave: TypedEventHandler<MouseEvent, E>;
  onMouseMove: TypedEventHandler<MouseEvent, E>;
  onMouseOver: TypedEventHandler<MouseEvent, E>;
  onMouseOut: TypedEventHandler<MouseEvent, E>;
  onMouseUp: TypedEventHandler<MouseEvent, E>;
  onAuxClick: TypedEventHandler<MouseEvent, E>;

  onPointerOver: TypedEventHandler<PointerEvent, E>;
  onPointerEnter: TypedEventHandler<PointerEvent, E>;
  onPointerDown: TypedEventHandler<PointerEvent, E>;
  onPointerMove: TypedEventHandler<PointerEvent, E>;
  onPointerUp: TypedEventHandler<PointerEvent, E>;
  onPointerCancel: TypedEventHandler<PointerEvent, E>;
  onPointerOut: TypedEventHandler<PointerEvent, E>;
  onPointerLeave: TypedEventHandler<PointerEvent, E>;
  onGotPointerCapture: TypedEventHandler<PointerEvent, E>;
  onLostPointerCapture: TypedEventHandler<PointerEvent, E>;

  onTouchCancel: TypedEventHandler<TouchEvent, E>;
  onTouchEnd: TypedEventHandler<TouchEvent, E>;
  onTouchMove: TypedEventHandler<TouchEvent, E>;
  onTouchStart: TypedEventHandler<TouchEvent, E>;
}

export type TypedEventMapRecord<E extends Element> = TypedEventMap<E>;

export type TypedEventsMapRecordWithModifiers<E extends Element> = {
  [K in keyof TypedEventMapRecord<E> as `${string & K}:${string}`]:
    | TypedEventMapRecord<E>[K]
    | true;
};

export type TypedJSXEventsMap<E extends Element> = TypedEventMapRecord<E> &
  TypedEventsMapRecordWithModifiers<E>;

export interface Aria {
  autocomplete: string;
  checked: string;
  disabled: string;
  errormessage: string;
  expanded: string;
  haspopup: string;
  hidden: string;
  invalid: string;
  label: string;
  level: string;
  modal: string;
  multiline: string;
  multiselectable: string;
  orientation: string;
  placeholder: string;
  pressed: string;
  readonly: string;
  required: string;
  selected: string;
  sort: string;
  valuemax: string;
  valuemin: string;
  valuenow: string;
  valuetext: string;
  busy: string;
  live: string;
  relevant: string;
  atomic: string;
  dropeffect: string;
  grabbed: string;
  activedescendant: string;
  colcount: string;
  colindex: string;
  colspan: string;
  controls: string;
  describedby: string;
  description: string;
  details: string;
  flowto: string;
  labelledby: string;
  owns: string;
  posinset: string;
  rowindes: string;
  rowspan: string;
  setsize: string;
  current: string;
  keyshortcuts: string;
  roledescription: string;
}

export type AriaProps = { [key in `aria-${keyof Aria}`]: string | number | boolean };

export interface HTMLAttributes {
  accept: StringWithAutoComplete<'audio/*' | 'video/*' | 'image/*'>;
  'accept-charset': string;
  accesskey: string;
  action: string;
  /**
   * @deprecated
   */
  align: string;
  allow: boolean;
  allowfullscreen: boolean;
  allowpaymentrequest: boolean;
  alt: string;
  async: boolean;
  autocapitalize: StringWithAutoComplete<
    'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
  >;
  autocomplete: string;
  autofocus: boolean;
  autoplay: boolean;
  /**
   * @obsolete
   */
  background: string;
  /**
   * @obsolete
   */
  bgcolor: string;
  /**
   * @legacy
   */
  border: string;
  buffered: string;
  capture: StringWithAutoComplete<'user' | 'environment'>;
  charset: string;
  checked: boolean;
  cite: string;
  class: Arrayable<string | undefined | boolean | null>;
  color: string;
  cols: number;
  colspan: number;
  content: string;
  contenteditable: boolean;
  /**
   * @non-standard
   */
  contextmenu: string;
  controls: boolean;
  coords: string;
  compact: string;
  crossorigin: StringWithAutoComplete<'anonymous' | 'use-credentials' | ''>;
  /**
   * @experimental
   */
  csp: string;
  data: string;
  datetime: string;
  decoding: string;
  default: boolean;
  def: string;
  defer: boolean;
  dir: StringWithAutoComplete<'ltr' | 'rtl' | 'auto'>;
  dirname: string;
  disabled: boolean;
  download: string;
  draggalbe: boolean;
  enctype: StringWithAutoComplete<
    'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
  >;
  /**
   * @experimental
   */
  enterkeyhint: string;
  for: string;
  form: string;
  formaction: string;
  formmethod: string;
  formenctype: string;
  formnovalidate: string;
  formtarget: string;
  headers: string;
  height: string | number;
  hidden: boolean;
  high: string | number;
  href: Exclude<DestinationRequest, number>;
  hreflang: string;
  'http-equiv': StringWithAutoComplete<
    'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatibl' | 'refresh'
  >;
  id: string;
  integrity: string;
  /**
   * @deprecated
   */
  intrinsicsize: string | number;
  inputmode: StringWithAutoComplete<
    'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  >;
  ismap: boolean;
  itemprop: string;
  kind: StringWithAutoComplete<'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata'>;
  label: string;
  lang: string;
  /**
   * @deprecated
   */
  language: string;
  /**
   * @experimental
   */
  loading: StringWithAutoComplete<'lazy' | 'eager'>;
  list: string;
  loop: boolean;
  low: number | string;
  /**
   * @deprecated
   */
  manifest: string;
  max: number | string;
  maxlength: number | string;
  minlength: number | string;
  media: string;
  method: StringWithAutoComplete<'post' | 'get' | 'dialog'>;
  min: number | string;
  multiple: boolean;
  muted: boolean;
  name: string;
  noshade: boolean;
  novalidate: boolean;
  open: boolean;
  optimum: number | string;
  pattern: string;
  ping: string;
  placeholder: string;
  playsinline: boolean;
  poster: string;
  preload: boolean;
  readonly: boolean;
  referrerpolicy: StringWithAutoComplete<
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >;
  rel: StringWithAutoComplete<
    | 'alternate'
    | 'author'
    | 'bookmark'
    | 'canonical'
    | 'dns-prefetch'
    | 'external'
    | 'help'
    | 'icon'
    | 'licence'
    | 'manifest'
    | 'me'
    | 'modulepreload'
    | 'next'
    | 'nofollow'
    | 'noopener'
    | 'noreferrer'
    | 'opener'
    | 'pingback'
    | 'preconnect'
    | 'prefetch'
    | 'preload'
    | 'prerender'
    | 'prev'
    | 'stylesheet'
    | 'tag'
  >;
  required: boolean;
  reversed: boolean;
  role: string;
  rows: number | string;
  rowspan: number | string;
  sandbox: StringWithAutoComplete<
    | 'allow-downloads'
    | 'allow-downloads-without-user-activation'
    | 'allow-forms'
    | 'allow-modals'
    | 'allow-orientation-lock'
    | 'allow-pointer-lock'
    | 'allow-popups'
    | 'allow-popups-to-escape-sandbox'
    | 'allow-presentation'
    | 'allow-same-origi'
    | 'allow-script'
    | 'allow-storage-access-by-user-activation'
    | 'allow-top-navigation'
    | 'allow-top-navigation-by-user-activation'
    | 'allow-top-navigation-to-custom-protocols'
  >;
  scope: StringWithAutoComplete<'row' | 'co' | 'rowgroup' | 'colgroup'>;
  /**
   * @deprecated
   */
  scoped: boolean;
  selected: boolean;
  shape: string;
  size: number | string;
  sizes: number | string;
  slot: string;
  span: number | string;
  spellcheck: boolean;
  src: string;
  srcset: string;
  srcdoc: string;
  srclang: string;
  start: number | string;
  step: number | string;
  style: string | Selector;
  /**
   * @deprecated
   */
  summary: string;
  tabindex: number | string;
  target: StringWithAutoComplete<'_self' | '_blank' | '_parent' | '_top'>;
  title: string;
  translate: StringWithAutoComplete<'yes' | '' | 'no'>;
  type: StringWithAutoComplete<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  >;
  usemap: string;
  value: string | number;
  width: string | number;
  wrap: StringWithAutoComplete<'hard' | 'soft' | 'off'>;
}

export interface SVGAttributes {
  'accent-height': string;
  accumulate: StringWithAutoComplete<'none' | 'sum'>;
  additive: StringWithAutoComplete<'replace' | 'sum'>;
  'alignment-baseline': StringWithAutoComplete<
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'top'
    | 'center'
    | 'bottom'
  >;
  /**
   * @deprecated
   */
  alphabetic: number | string;
  amplitude: string;
  /**
   * @deprecated
   */
  'arabic-form': StringWithAutoComplete<'initial' | 'medial' | 'terminal' | 'isolated'>;
  /**
   * @deprecated
   */
  ascent: number | string;
  attributeName: string;
  /**
   * @deprecated
   */
  attributeType: StringWithAutoComplete<'CSS' | 'XML' | 'auto'>;
  azimuth: number | string;

  baseFrequency: number | string;
  'baseline-shift': StringWithAutoComplete<'sub' | 'super'> | number;
  /**
   * @deprecated
   */
  baseProfile: string;
  /**
   * @deprecated
   */
  bbox: string;
  begin: string;
  bias: number | string;
  by: string;

  calcMode: StringWithAutoComplete<'discrete' | 'linear' | 'paced' | 'spline'>;
  /**
   * @deprecated
   */
  'cap-height': number | string;
  class: Arrayable<string | undefined | boolean | null>;
  /**
   * @deprecated
   */
  clip: StringWithAutoComplete<'auto'>;
  clipPathUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  'clip-path': string;
  'clip-rule': StringWithAutoComplete<'nonzero' | 'evenodd' | 'inherit'>;
  'color-interpolation': StringWithAutoComplete<'auto' | 'sRGB' | 'linearRGB'>;
  'color-interpolation-filters': StringWithAutoComplete<'auto' | 'sRGB' | 'linearRGB'>;
  /**
   * @deprecated
   */
  'color-profile': string;
  'color-rendering': string;
  /**
   * @deprecated
   */
  contentScriptType: string;
  /**
   * @deprecated
   */
  contentStyleType: string;
  crossorigin: StringWithAutoComplete<'anonymous' | '' | 'use-credentials'>;
  cursor: StringWithAutoComplete<
    | 'auto'
    | 'crosshair'
    | 'default'
    | 'pointer'
    | 'move'
    | 'e-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'n-resize'
    | 'se-resize'
    | 'sw-resize'
    | 's-resize '
    | 'w-resize'
    | 'text'
    | 'wait'
    | 'help'
  >;
  cx: number | string;
  cy: number | string;
  color: string;

  d: string;
  /**
   * @deprecated
   */
  decelerate: string;
  def: string;
  descent: string;
  diffuseConstant: number | string;
  direction: StringWithAutoComplete<'ltr' | 'rtl'>;
  display: string;
  divisor: number | string;
  'dominant-baseline': StringWithAutoComplete<
    | 'auto'
    | 'text-bottom'
    | 'alphabetic'
    | 'ideographic'
    | 'middle'
    | 'central'
    | 'mathematical'
    | 'hanging'
    | 'text-top'
  >;
  dur: StringWithAutoComplete<'media' | 'indefinite'>;
  dx: number | string;
  dy: number | string;

  edgeMode: StringWithAutoComplete<'duplicate' | 'wrap' | 'none'>;
  elevation: number | string;
  /**
   * @deprecated
   */
  'enable-background': StringWithAutoComplete<'accumulate'>;
  end: string;
  exponent: number | string;

  fill: StringWithAutoComplete<'freeze' | 'remove'>;
  'fill-opacity': number | string;
  'fill-rule': StringWithAutoComplete<'nonzero' | 'evenodd'>;
  filter: string;
  /**
   * @deprecated
   */
  filterRes: number | string;
  filterUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  'flood-color': string;
  'flood-opacity': number | string;
  'font-family': string;
  'font-size': string;
  'font-size-adjust': number | string;
  'font-stretch': string;
  'font-style': StringWithAutoComplete<'normal' | 'italic' | 'oblique'>;
  'font-weight': number | StringWithAutoComplete<'normal' | 'bold' | 'bolder' | 'lighter'>;
  format: string;
  from: number | string;
  fr: number | string;
  fx: number | string;
  fy: number | string;

  /**
   * @deprecated
   */
  g1: string;
  /**
   * @deprecated
   */
  g2: string;
  /**
   * @deprecated
   */
  'glyph-name': string;
  /**
   * @deprecated
   */
  'glyph-orientation-horizontal': string;
  /**
   * @deprecated
   */
  'glyph-orientation-vertical': string;
  glyphRef: string;
  gradientTransform: string;
  gradientUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  /**
   * @deprecated
   */
  hanging: string;
  height: number | string;
  href: string;
  hreflang: string;
  /**
   * @deprecated
   */
  'horiz-adv-x': number | string;
  /**
   * @deprecated
   */
  'horiz-origin-x': number | string;

  id: string;
  /**
   * @deprecated
   */
  ideographic: string;
  'image-rendering': StringWithAutoComplete<'auto' | 'optimizeSpeed' | 'optimizeQuality'>;
  in: StringWithAutoComplete<
    | 'SourceGraphic'
    | 'SourceAlpha'
    | 'BackgroundImage'
    | 'BackgroundAlpha'
    | 'FillPaint'
    | 'StrokePaint'
  >;
  in2: StringWithAutoComplete<
    | 'SourceGraphic'
    | 'SourceAlpha'
    | 'BackgroundImage'
    | 'BackgroundAlpha'
    | 'FillPaint'
    | 'StrokePaint'
  >;
  intercept: number | string;
  /**
   * @deprecated
   */
  k: string;
  k1: number | string;
  k2: number | string;
  k3: number | string;
  k4: number | string;
  kernelMatrix: number | string;
  /**
   * @deprecated
   */
  kernelUnitLength: string;
  /**
   * @deprecated
   */
  kerning: string;
  keyPoints: number | string;
  keySplines: string;
  keyTimes: number | string;

  lang: string;
  lengthAdjust: StringWithAutoComplete<'spacing' | 'spacingAndGlyphs'>;
  'letter-spacing': StringWithAutoComplete<'normal'> | number;
  'lighting-color': string;
  limitingConeAngle: number | string;
  local: string;

  'marker-end': StringWithAutoComplete<'none'>;
  'marker-mid': StringWithAutoComplete<'none'>;
  'marker-start': StringWithAutoComplete<'none'>;
  markerHeight: number | string;
  markerUnits: StringWithAutoComplete<'userSpaceOnUse' | 'strokeWidth'>;
  markerWidth: number | string;
  mask: string;
  maskContentUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  maskUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  /**
   * @deprecated
   */
  mathematical: string;
  max: number | string;
  media: string;
  /**
   * @experimental
   */
  method: StringWithAutoComplete<'align' | 'stretch'>;
  min: number | string;
  mode: string;
  /**
   * @deprecated
   */
  name: string;
  numOctaves: number | string;

  offset: string;
  opacity: number | string;
  operator: StringWithAutoComplete<
    'over' | 'in' | 'out' | 'atop' | 'xor' | 'lighter' | 'arithmetic'
  >;
  order: number | string;
  orient: StringWithAutoComplete<'auto' | 'auto-start-reverse'> | number;
  /**
   * @deprecated
   */
  orientation: StringWithAutoComplete<'h' | 'v'>;
  origin: string;
  overflow: StringWithAutoComplete<'visible' | 'hidden' | 'scroll' | 'auto'>;
  'overline-position': number | string;
  'overline-thickness': number | string;
  /**
   * @deprecated
   */
  'panose-1': number | string;
  'paint-order': StringWithAutoComplete<'normal' | 'fill' | 'stroke' | 'markers'>;
  path: string;
  pathLength: number | string;
  patternContentUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  patternTransform: string;
  patternUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;
  ping: string;
  'pointer-events': StringWithAutoComplete<
    | 'bounding-box'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all'
    | 'none'
  >;
  points: number | string;
  pointsAtX: number | string;
  pointsAtY: number | string;
  pointsAtZ: number | string;
  preserveAlpha: boolean;
  preserveAspectRatio: string;
  primitiveUnits: StringWithAutoComplete<'userSpaceOnUse' | 'objectBoundingBox'>;

  r: number | string;
  radius: number | string;
  referrerPolicy: string;
  refX: StringWithAutoComplete<'left' | 'center' | 'right'> | number;
  refY: StringWithAutoComplete<'top' | 'center' | 'bottom'> | number;
  rel: string;
  'rendering-intent': string;
  repeatCount: number | string;
  repeatDur: StringWithAutoComplete<'indefinite'>;
  requiredExtensions: string;
  /**
   * @deprecated
   */
  requiredFeatures: string;
  restart: StringWithAutoComplete<'always' | 'whenNotActive' | 'never'>;
  result: string;
  rotate: StringWithAutoComplete<'auto' | 'auto-reverse'> | number;
  rx: number | string;
  ry: number | string;

  scale: number | string;
  seed: number | string;
  'shape-rendering': StringWithAutoComplete<
    'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision'
  >;
  /**
   * @experimental
   */
  side: string;
  /**
   * @deprecated
   */
  slope: number | string;
  spacing: StringWithAutoComplete<'auto' | 'exact'>;
  specularConstant: number | string;
  specularExponent: number | string;
  speed: string;
  spreadMethod: StringWithAutoComplete<'pad' | 'reflect' | 'repeat'>;
  startOffset: number | string;
  stdDeviation: number | string;
  /**
   * @deprecated
   */
  stemh: number | string;
  /**
   * @deprecated
   */
  stemv: number | string;
  stitchTiles: StringWithAutoComplete<'noStitch' | 'stitch'>;
  'stop-color': StringWithAutoComplete<'currentcolor'>;
  'stop-opacity': number | string;
  'strikethrough-position': number | string;
  'strikethrough-thickness': number | string;
  /**
   * @deprecated
   */
  string: string;
  stroke: string;
  'stroke-dasharray': StringWithAutoComplete<'none'>;
  'stroke-dashoffset': number | string;
  'stroke-linecap': StringWithAutoComplete<'butt' | 'round' | 'square'>;
  'stroke-linejoin': StringWithAutoComplete<'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'>;
  'stroke-miterlimit': number | string;
  'stroke-opacity': number | string;
  'stroke-width': number | string;
  style: string | Selector;
  surfaceScale: number | string;
  systemLanguage: string;

  tabindex: number | string;
  tableValues: number | string;
  target: StringWithAutoComplete<'_self' | '_parent' | '_top' | '_blank'>;
  targetX: number | string;
  targetY: number | string;
  'text-anchor': StringWithAutoComplete<'start' | 'middle' | 'end'>;
  'text-decoration': string;
  'text-rendering': StringWithAutoComplete<
    'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision'
  >;
  textLength: number | string;
  to: string;
  transform: string;
  'transform-origin': string;
  type: StringWithAutoComplete<
    | 'translate'
    | 'scale'
    | 'rotate'
    | 'skewX'
    | 'skewY'
    | 'matrix'
    | 'saturate'
    | 'hueRotate'
    | 'luminanceToAlpha'
    | 'identity'
    | 'table'
    | 'discrete'
    | 'linear'
    | 'gamma'
    | 'fractalNoise'
    | 'turbulence'
  >;
  /**
   * @deprecated
   */
  u1: string;
  /**
   * @deprecated
   */
  u2: string;
  'underline-position': number | string;
  'underline-thickness': number | string;
  /**
   * @deprecated
   */
  unicode: string;
  'unicode-bidi': string;
  /**
   * @deprecated
   */
  'unicode-range': string;
  /**
   * @deprecated
   */
  'units-per-em': string;

  /**
   * @deprecated
   */
  'v-alphabetic': number | string;
  /**
   * @deprecated
   */
  'v-hanging': number | string;
  /**
   * @deprecated
   */
  'v-ideographic': number | string;
  /**
   * @deprecated
   */
  'v-mathematical': number | string;
  values: string;
  'vector-effect': StringWithAutoComplete<
    'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position'
  >;
  /**
   * @deprecated
   */
  version: string;
  /**
   * @deprecated
   */
  'vert-adv-y': number | string;
  /**
   * @deprecated
   */
  'vert-origin-x': number | string;
  /**
   * @deprecated
   */
  'vert-origin-y': number | string;
  viewBox: string;
  /**
   * @deprecated
   */
  viewTarget: string;
  visibility: StringWithAutoComplete<'visible' | 'hidden' | 'collapse'>;

  width: number | string;
  /**
   * @deprecated
   */
  widths: number | string;
  'word-spacing': string;
  'writing-mode': StringWithAutoComplete<'horizontal-tb' | 'vertical-rl' | 'vertical-lr'>;

  x: number | string;
  /**
   * @deprecated
   */
  'x-height': number | string;
  x1: number | string;
  x2: number | string;
  xChannelSelector: StringWithAutoComplete<'R' | 'G' | 'B' | 'A'>;

  'xlink:actuate': string;
  /**
   * @deprecated
   */
  'xlink:arcrole': string;
  /**
   * @deprecated
   */
  'xlink:href': string;
  'xlink:role': string;
  /**
   * @deprecated
   */
  'xlink:show': string;
  /**
   * @deprecated
   */
  'xlink:title': string;
  /**
   * @deprecated
   */
  'xlink:type': string;
  /**
   * @deprecated
   */
  'xml:base': string;
  /**
   * @deprecated
   */
  'xml:lang': string;
  /**
   * @deprecated
   */
  'xml:space': string;

  y: number | string;
  y1: number | string;
  y2: number | string;
  yChannelSelector: StringWithAutoComplete<'R' | 'G' | 'B' | 'A'>;

  z: number | string;
  /**
   * @deprecated
   */
  zoomAndPan: string;
}

export type ElementRef<E extends Element = Element> = { value: E | undefined };

export type RuvyElementAttributes<E extends Element = Element> = {
  tag: string;
  innerHTML: string;
  ref: ElementRef<E>;
};

export type BaseProps<E extends Element = Element> = PropsWithUtility<RuvyElementAttributes<E>>;

export type BaseHTMLProps = Pick<
  HTMLAttributes,
  | 'class'
  | 'id'
  | 'style'
  | 'value'
  | 'accesskey'
  | 'autocapitalize'
  | 'contenteditable'
  | 'contextmenu'
  | 'dir'
  | 'draggalbe'
  | 'hidden'
  | 'playsinline'
  | 'role'
  | 'slot'
  | 'spellcheck'
  | 'tabindex'
  | 'title'
  | 'translate'
>;

export type BaseSVGProps = Pick<
  SVGAttributes,
  | 'lang'
  | 'tabindex'
  | 'requiredExtensions'
  | 'systemLanguage'
  | 'clip-path'
  | 'clip-rule'
  | 'color'
  | 'color-interpolation'
  | 'color-rendering'
  | 'cursor'
  | 'display'
  | 'fill'
  | 'fill-opacity'
  | 'fill-rule'
  | 'filter'
  | 'mask'
  | 'opacity'
  | 'pointer-events'
  | 'shape-rendering'
  | 'stroke'
  | 'stroke-dasharray'
  | 'stroke-dashoffset'
  | 'stroke-linecap'
  | 'stroke-linejoin'
  | 'stroke-miterlimit'
  | 'stroke-opacity'
  | 'stroke-width'
  | 'transform'
  | 'vector-effect'
  | 'visibility'
  | 'xlink:title'
  | 'class'
  | 'style'
>;

export type HTMLElementProps<E extends Element = HTMLElement, T extends object = object> = Record<
  string | number,
  unknown
> &
  Partial<BaseProps<E> & BaseHTMLProps & TypedJSXEventsMap<E> & T>;

export type SVGElementProps<E extends Element = SVGElement, T extends object = object> = Record<
  string | number,
  unknown
> &
  Partial<BaseProps<E> & BaseSVGProps & TypedJSXEventsMap<E> & T>;

export type BlockQuoteProps = Pick<HTMLAttributes, 'cite'>;

export type HrProps = Pick<HTMLAttributes, 'align' | 'color' | 'size' | 'width' | 'noshade'>;

export type LiProps = Pick<HTMLAttributes, 'value' | 'type'>;

export type OlProps = Pick<HTMLAttributes, 'type' | 'start' | 'reversed'>;

export type PreProps = Pick<HTMLAttributes, 'cols' | 'width' | 'wrap'>;

export type UlProps = Pick<HTMLAttributes, 'compact' | 'type'>;

export type AProps = Pick<
  HTMLAttributes,
  'download' | 'href' | 'hreflang' | 'ping' | 'referrerpolicy' | 'rel' | 'target' | 'type'
>;

export type BdiProps = Pick<HTMLAttributes, 'dir'>;

export type BdoProps = Pick<HTMLAttributes, 'dir'>;

export type DataProps = Pick<HTMLAttributes, 'value'>;

export type QProps = Pick<HTMLAttributes, 'cite'>;

export type TimeProps = Pick<HTMLAttributes, 'datetime'>;

export type AreaProps = Pick<
  HTMLAttributes,
  'alt' | 'coords' | 'download' | 'href' | 'ping' | 'referrerpolicy' | 'rel' | 'shape' | 'target'
>;

export type AudioProps = Pick<
  HTMLAttributes,
  'autoplay' | 'controls' | 'crossorigin' | 'loop' | 'muted' | 'preload' | 'src'
>;

export type ImgProps = Pick<
  HTMLAttributes,
  | 'alt'
  | 'crossorigin'
  | 'decoding'
  | 'height'
  | 'ismap'
  | 'loading'
  | 'referrerpolicy'
  | 'sizes'
  | 'src'
  | 'src'
  | 'srcset'
  | 'width'
  | 'usemap'
>;

export type MapProps = Pick<HTMLAttributes, 'name'>;

export type TrackProps = Pick<HTMLAttributes, 'def' | 'kind' | 'label' | 'src' | 'srclang'>;

export type VideoProps = Pick<
  HTMLAttributes,
  | 'autoplay'
  | 'crossorigin'
  | 'height'
  | 'loop'
  | 'muted'
  | 'playsinline'
  | 'poster'
  | 'preload'
  | 'src'
  | 'width'
>;

export type EmbedProps = Pick<HTMLAttributes, 'height' | 'src' | 'type' | 'width'>;

export type IframeProps = Pick<
  HTMLAttributes,
  | 'allow'
  | 'allowfullscreen'
  | 'allowpaymentrequest'
  | 'height'
  | 'loading'
  | 'name'
  | 'referrerpolicy'
  | 'sandbox'
  | 'src'
  | 'srcdoc'
  | 'width'
>;

export type ObjectProps = Pick<
  HTMLAttributes,
  'data' | 'form' | 'height' | 'name' | 'type' | 'usemap' | 'width'
>;

export type SourceProps = Pick<HTMLAttributes, 'type'>;

export type CanvasProps = Pick<HTMLAttributes, 'height' | 'width'>;

export type DelProps = Pick<HTMLAttributes, 'cite' | 'datetime'>;

export type InsProps = Pick<HTMLAttributes, 'cite' | 'datetime'>;

export type ColProps = Pick<HTMLAttributes, 'span'>;

export type ColGroupProps = Pick<HTMLAttributes, 'span'>;

export type TdProps = Pick<HTMLAttributes, 'span' | 'headers' | 'rowspan'>;

export type ThProps = Pick<HTMLAttributes, 'colspan' | 'headers' | 'rowspan' | 'scope'>;

export type ButtonProps = Pick<
  HTMLAttributes,
  | 'autofocus'
  | 'disabled'
  | 'form'
  | 'formaction'
  | 'formenctype'
  | 'formmethod'
  | 'formnovalidate'
  | 'formtarget'
  | 'name'
  | 'type'
  | 'value'
>;

export type FieldsetProps = Pick<HTMLAttributes, 'disabled' | 'form' | 'name'>;

export type FormProps = Pick<
  HTMLAttributes,
  | 'accept-charset'
  | 'autocomplete'
  | 'name'
  | 'rel'
  | 'action'
  | 'enctype'
  | 'method'
  | 'novalidate'
  | 'target'
>;

export type InputProps = Pick<
  HTMLAttributes,
  | 'accept'
  | 'alt'
  | 'autocomplete'
  | 'capture'
  | 'checked'
  | 'dirname'
  | 'disabled'
  | 'form'
  | 'formaction'
  | 'formenctype'
  | 'formmethod'
  | 'formnovalidate'
  | 'formtarget'
  | 'height'
  | 'list'
  | 'max'
  | 'maxlength'
  | 'min'
  | 'minlength'
  | 'multiple'
  | 'name'
  | 'placeholder'
  | 'readonly'
  | 'required'
  | 'size'
  | 'src'
  | 'step'
  | 'value'
  | 'width'
  | 'type'
>;

export type LabelProps = Pick<HTMLAttributes, 'for'>;

export type MeterProps = Pick<HTMLAttributes, 'value' | 'min' | 'max' | 'low' | 'high' | 'optimum'>;

export type OptgroupProps = Pick<HTMLAttributes, 'disabled' | 'label'>;

export type OptionProps = Pick<HTMLAttributes, 'disabled' | 'label' | 'selected' | 'value'>;

export type OutputProps = Pick<HTMLAttributes, 'for' | 'form' | 'name'>;

export type ProgressProps = Pick<HTMLAttributes, 'max' | 'value'>;

export type SelectProps = Pick<
  HTMLAttributes,
  | 'autocomplete'
  | 'autofocus'
  | 'disabled'
  | 'form'
  | 'multiple'
  | 'name'
  | 'required'
  | 'size'
  | 'value'
>;

export type TextareaProps = Pick<
  HTMLAttributes,
  | 'autocomplete'
  | 'autofocus'
  | 'cols'
  | 'disabled'
  | 'form'
  | 'maxlength'
  | 'name'
  | 'placeholder'
  | 'readonly'
  | 'required'
  | 'spellcheck'
  | 'wrap'
  | 'rows'
>;

export type DetailsProps = Pick<HTMLAttributes, 'open'>;

export type DialogProps = Pick<HTMLAttributes, 'open'>;

export type SlotProps = Pick<HTMLAttributes, 'name'>;

export type SVGAnimateProps = Pick<
  SVGAttributes,
  | 'begin'
  | 'dur'
  | 'end'
  | 'min'
  | 'max'
  | 'restart'
  | 'repeatCount'
  | 'repeatDur'
  | 'fill'
  | 'calcMode'
  | 'values'
  | 'keyTimes'
  | 'keySplines'
  | 'from'
  | 'to'
  | 'by'
  | 'attributeName'
  | 'additive'
  | 'accumulate'
>;

export type SVGAnimateMotionProps = Pick<SVGAttributes, 'keyPoints' | 'path' | 'rotate'>;

export type SVGCircleProps = Pick<SVGAttributes, 'cx' | 'cy' | 'r' | 'pathLength'>;

export type SVGClipPathProps = Pick<SVGAttributes, 'clipPathUnits'>;

export type SVGEllipseProps = Pick<SVGAttributes, 'cx' | 'cy' | 'rx' | 'ry' | 'pathLength'>;

export type SVGFeBlendProps = Pick<SVGAttributes, 'in' | 'in2' | 'mode'>;

export type SVGFeColorMatrixProps = Pick<SVGAttributes, 'in' | 'type' | 'values'>;

export type SVGFeComponentTransferProps = Pick<SVGAttributes, 'in'>;

export type SVGFeCompositeProps = Pick<
  SVGAttributes,
  'in' | 'in2' | 'operator' | 'k1' | 'k2' | 'k3' | 'k4'
>;

export type SVGFeConvolveMatrixProps = Pick<
  SVGAttributes,
  | 'in'
  | 'order'
  | 'kernelMatrix'
  | 'divisor'
  | 'bias'
  | 'targetX'
  | 'targetY'
  | 'edgeMode'
  | 'kernelUnitLength'
  | 'preserveAlpha'
>;

export type SVGFeDiffuseLightingProps = Pick<
  SVGAttributes,
  'in' | 'surfaceScale' | 'diffuseConstant' | 'kernelUnitLength'
>;

export type SVGFeDisplacementMapProps = Pick<
  SVGAttributes,
  'in' | 'in2' | 'scale' | 'xChannelSelector' | 'yChannelSelector'
>;

export type SVGFeDistantLightProps = Pick<SVGAttributes, 'azimuth' | 'elevation'>;

export type SVGFeDropShadowProps = Pick<SVGAttributes, 'dx' | 'dy' | 'stdDeviation'>;

export type SVGFeFloodProps = Pick<SVGAttributes, 'flood-color' | 'flood-opacity'>;

export type SVGFeGaussianBlurProps = Pick<SVGAttributes, 'in' | 'stdDeviation' | 'edgeMode'>;

export type SVGFeImageProps = Pick<
  SVGAttributes,
  'crossorigin' | 'preserveAspectRatio' | 'xlink:href'
>;

export type SVGFeMergeNodeProps = Pick<SVGAttributes, 'in'>;

export type SVGFeMorphologyProps = Pick<SVGAttributes, 'in' | 'operator' | 'radius'>;

export type SVGFeOffsetProps = Pick<SVGAttributes, 'in' | 'dx' | 'dy'>;

export type SVGFePointLightProps = Pick<SVGAttributes, 'x' | 'y' | 'z'>;

export type SVGFeSpecularLightingProps = Pick<
  SVGAttributes,
  'in' | 'surfaceScale' | 'specularConstant' | 'specularExponent' | 'kernelUnitLength'
>;

export type SVGFeSpotLightProps = Pick<
  SVGAttributes,
  | 'x'
  | 'y'
  | 'z'
  | 'pointsAtX'
  | 'pointsAtY'
  | 'pointsAtZ'
  | 'specularExponent'
  | 'limitingConeAngle'
>;

export type SVGFeTileProps = Pick<SVGAttributes, 'in'>;

export type SVGFeTurbulenceProps = Pick<
  SVGAttributes,
  'baseFrequency' | 'numOctaves' | 'seed' | 'stitchTiles' | 'type'
>;

export type SVGFilterProps = Pick<
  SVGAttributes,
  | 'x'
  | 'y'
  | 'z'
  | 'width'
  | 'height'
  | 'filterRes'
  | 'filterUnits'
  | 'primitiveUnits'
  | 'xlink:href'
>;

export type SVGForeignObjectProps = Pick<SVGAttributes, 'height' | 'width' | 'x' | 'z'>;

export type SVGImageProps = Pick<
  SVGAttributes,
  'x' | 'y' | 'width' | 'height' | 'href' | 'preserveAspectRatio' | 'crossorigin'
>;

export type SVGLineProps = Pick<SVGAttributes, 'x1' | 'x2' | 'y1' | 'y2' | 'pathLength'>;

export type SVGLinearGradientProps = Pick<
  SVGAttributes,
  | 'gradientUnits'
  | 'gradientTransform'
  | 'href'
  | 'spreadMethod'
  | 'x1'
  | 'x2'
  | 'xlink:href'
  | 'y1'
  | 'y2'
>;

export type SVGMarkerProps = Pick<
  SVGAttributes,
  | 'markerHeight'
  | 'markerUnits'
  | 'markerWidth'
  | 'orient'
  | 'preserveAspectRatio'
  | 'refX'
  | 'refY'
  | 'viewBox'
>;

export type SVGMaskProps = Pick<
  SVGAttributes,
  'height' | 'maskContentUnits' | 'maskUnits' | 'x' | 'y' | 'width'
>;

export type SVGMPathProps = Pick<SVGAttributes, 'xlink:href'>;

export type SVGPathProps = Pick<SVGAttributes, 'd' | 'pathLength'>;

export type SVGPatternProps = Pick<
  SVGAttributes,
  | 'height'
  | 'href'
  | 'patternContentUnits'
  | 'patternTransform'
  | 'patternUnits'
  | 'preserveAspectRatio'
  | 'viewBox'
  | 'width'
  | 'x'
  | 'xlink:href'
  | 'y'
>;

export type SVGPolygonProps = Pick<SVGAttributes, 'points' | 'pathLength'>;

export type SVGPolylineProps = Pick<SVGAttributes, 'points' | 'pathLength'>;

export type SVGRadialGradientProps = Pick<
  SVGAttributes,
  | 'cx'
  | 'cy'
  | 'fr'
  | 'fx'
  | 'fy'
  | 'gradientUnits'
  | 'gradientTransform'
  | 'href'
  | 'r'
  | 'spreadMethod'
  | 'xlink:href'
>;

export type SVGRectProps = Pick<
  SVGAttributes,
  'x' | 'y' | 'width' | 'height' | 'rx' | 'ry' | 'pathLength'
>;

export type SVGSetProps = Pick<SVGAttributes, 'to'>;

export type SVGStopProps = Pick<SVGAttributes, 'offset' | 'stop-color' | 'stop-opacity'>;

export type SVGSVGProps = Pick<
  SVGAttributes,
  | 'baseProfile'
  | 'contentScriptType'
  | 'contentStyleType'
  | 'height'
  | 'preserveAspectRatio'
  | 'version'
  | 'viewBox'
  | 'width'
  | 'x'
  | 'y'
>;

export type SVGSymbolProps = Pick<
  SVGAttributes,
  'height' | 'preserveAspectRatio' | 'refX' | 'refY' | 'viewBox' | 'width' | 'x' | 'y'
>;

export type SVGTextProps = Pick<
  SVGAttributes,
  'x' | 'y' | 'dx' | 'dy' | 'rotate' | 'lengthAdjust' | 'textLength'
>;

export type SVGTextPathProps = Pick<
  SVGAttributes,
  'href' | 'lengthAdjust' | 'method' | 'path' | 'side' | 'spacing' | 'startOffset' | 'textLength'
>;

export type SVGTSpanProps = Pick<
  SVGAttributes,
  'x' | 'y' | 'dx' | 'dy' | 'rotate' | 'lengthAdjust' | 'textLength'
>;

export type SVGUseProps = Pick<
  SVGAttributes,
  'href' | 'xlink:href' | 'x' | 'y' | 'width' | 'height'
>;

export type CommonJSXAttributes = Partial<PropsWithUtility>;

export interface JSXElements extends Record<string, Record<string, unknown>> {
  a: HTMLElementProps<HTMLAnchorElement, AProps>;
  abbr: HTMLElementProps;
  address: HTMLElementProps;
  area: HTMLElementProps<HTMLAreaElement, AreaProps>;
  article: HTMLElementProps;
  aside: HTMLElementProps;
  audio: HTMLElementProps<HTMLAudioElement, AudioProps>;
  b: HTMLElementProps;
  base: HTMLElementProps<HTMLBaseElement>;
  bdi: HTMLElementProps<HTMLElement, BdiProps>;
  bdo: HTMLElementProps<HTMLElement, BdoProps>;
  big: HTMLElementProps;
  blockquote: HTMLElementProps<HTMLQuoteElement, BlockQuoteProps>;
  body: HTMLElementProps<HTMLBodyElement>;
  br: HTMLElementProps<HTMLBRElement>;
  button: HTMLElementProps<HTMLButtonElement, ButtonProps>;
  canvas: HTMLElementProps<HTMLCanvasElement, CanvasProps>;
  caption: HTMLElementProps;
  center: HTMLElementProps;
  cite: HTMLElementProps;
  code: HTMLElementProps;
  col: HTMLElementProps<HTMLTableColElement, ColProps>;
  colgroup: HTMLElementProps<HTMLTableColElement, ColGroupProps>;
  data: HTMLElementProps<HTMLDataElement, DataProps>;
  datalist: HTMLElementProps<HTMLDataListElement>;
  dd: HTMLElementProps;
  del: HTMLElementProps<HTMLModElement, DelProps>;
  details: HTMLElementProps<HTMLDetailsElement, DetailsProps>;
  dfn: HTMLElementProps;
  dialog: HTMLElementProps<HTMLDialogElement, DialogProps>;
  div: HTMLElementProps<HTMLDivElement>;
  dl: HTMLElementProps<HTMLDListElement>;
  dt: HTMLElementProps;
  em: HTMLElementProps;
  embed: HTMLElementProps<HTMLEmbedElement, EmbedProps>;
  fieldset: HTMLElementProps<HTMLFieldSetElement, FieldsetProps>;
  figcaption: HTMLElementProps;
  figure: HTMLElementProps;
  footer: HTMLElementProps;
  form: HTMLElementProps<HTMLFormElement, FormProps>;
  h1: HTMLElementProps<HTMLHeadingElement>;
  h2: HTMLElementProps<HTMLHeadingElement>;
  h3: HTMLElementProps<HTMLHeadingElement>;
  h4: HTMLElementProps<HTMLHeadingElement>;
  h5: HTMLElementProps<HTMLHeadingElement>;
  h6: HTMLElementProps<HTMLHeadingElement>;
  head: HTMLElementProps<HTMLHeadElement>;
  header: HTMLElementProps;
  hgroup: HTMLElementProps;
  hr: HTMLElementProps<HTMLHRElement, HrProps>;
  html: HTMLElementProps<HTMLHtmlElement>;
  i: HTMLElementProps;
  iframe: HTMLElementProps<HTMLIFrameElement, IframeProps>;
  img: HTMLElementProps<HTMLImageElement, ImgProps>;
  input: HTMLElementProps<HTMLInputElement, InputProps>;
  ins: HTMLElementProps<HTMLModElement, InsProps>;
  kbd: HTMLElementProps;
  keygen: HTMLElementProps;
  label: HTMLElementProps<HTMLLabelElement, LabelProps>;
  legend: HTMLElementProps<HTMLLegendElement>;
  li: HTMLElementProps<HTMLLIElement, LiProps>;
  link: HTMLElementProps<HTMLLinkElement>;
  main: HTMLElementProps;
  map: HTMLElementProps<HTMLMapElement, MapProps>;
  mark: HTMLElementProps;
  menu: HTMLElementProps<HTMLMenuElement>;
  menuitem: HTMLElementProps;
  meta: HTMLElementProps<HTMLMetaElement>;
  meter: HTMLElementProps<HTMLMeterElement, MeterProps>;
  nav: HTMLElementProps;
  noindex: HTMLElementProps;
  noscript: HTMLElementProps;
  object: HTMLElementProps<HTMLObjectElement, ObjectProps>;
  ol: HTMLElementProps<HTMLOListElement, OlProps>;
  optgroup: HTMLElementProps<HTMLOptGroupElement, OptgroupProps>;
  option: HTMLElementProps<HTMLOptionElement, OptionProps>;
  output: HTMLElementProps<HTMLOutputElement, OutputProps>;
  p: HTMLElementProps<HTMLParagraphElement>;
  // eslint-disable-next-line deprecation/deprecation
  param: HTMLElementProps<HTMLParamElement>;
  picture: HTMLElementProps<HTMLPictureElement>;
  pre: HTMLElementProps<HTMLPreElement, PreProps>;
  progress: HTMLElementProps<HTMLProgressElement, ProgressProps>;
  q: HTMLElementProps<HTMLQuoteElement, QProps>;
  rp: HTMLElementProps;
  rt: HTMLElementProps;
  ruby: HTMLElementProps;
  s: HTMLElementProps;
  samp: HTMLElementProps;
  slot: HTMLElementProps<HTMLSlotElement, SlotProps>;
  script: HTMLElementProps<HTMLScriptElement>;
  section: HTMLElementProps;
  select: HTMLElementProps<HTMLSelectElement, SelectProps>;
  small: HTMLElementProps;
  source: HTMLElementProps<HTMLSourceElement, SourceProps>;
  span: HTMLElementProps<HTMLSpanElement>;
  strong: HTMLElementProps;
  style: HTMLElementProps<HTMLStyleElement>;
  sub: HTMLElementProps;
  summary: HTMLElementProps;
  sup: HTMLElementProps;
  table: HTMLElementProps<HTMLTableElement>;
  template: HTMLElementProps<HTMLTemplateElement>;
  tbody: HTMLElementProps<HTMLTableSectionElement>;
  // eslint-disable-next-line deprecation/deprecation
  td: HTMLElementProps<HTMLTableDataCellElement, TdProps>;
  textarea: HTMLElementProps<HTMLTextAreaElement, TextareaProps>;
  tfoot: HTMLElementProps<HTMLTableSectionElement>;
  // eslint-disable-next-line deprecation/deprecation
  th: HTMLElementProps<HTMLTableHeaderCellElement, ThProps>;
  thead: HTMLElementProps<HTMLTableSectionElement>;
  time: HTMLElementProps<HTMLTimeElement, TimeProps>;
  title: HTMLElementProps<HTMLTitleElement>;
  tr: HTMLElementProps<HTMLTableRowElement>;
  track: HTMLElementProps<HTMLTrackElement, TrackProps>;
  u: HTMLElementProps;
  ul: HTMLElementProps<HTMLUListElement, UlProps>;
  var: HTMLElementProps;
  video: HTMLElementProps<HTMLVideoElement>;
  wbr: HTMLElementProps;
  webview: HTMLElementProps;

  //SVG
  animate: SVGElementProps<SVGAnimateElement, SVGAnimateProps>;
  animateMotion: SVGElementProps<SVGAnimateMotionElement, SVGAnimateMotionProps>;
  circle: SVGElementProps<SVGCircleElement, SVGCircleProps>;
  clipPath: SVGElementProps<SVGClipPathElement, SVGClipPathProps>;
  defs: SVGElementProps;
  desc: SVGElementProps;
  ellipse: SVGElementProps<SVGEllipseElement, SVGEllipseProps>;
  feBlend: SVGElementProps<SVGFEBlendElement, SVGFeBlendProps>;
  feColorMatrix: SVGElementProps<SVGFEColorMatrixElement, SVGFeColorMatrixProps>;
  feComponentTransfer: SVGElementProps<SVGFEComponentTransferElement, SVGFeComponentTransferProps>;
  feComposite: SVGElementProps<SVGFECompositeElement, SVGFeCompositeProps>;
  feConvolveMatrix: SVGElementProps<SVGFEConvolveMatrixElement, SVGFeConvolveMatrixProps>;
  feDiffuseLighting: SVGElementProps<SVGFEDiffuseLightingElement, SVGFeDiffuseLightingProps>;
  feDisplacementMap: SVGElementProps<SVGFEDisplacementMapElement, SVGFeDisplacementMapProps>;
  feDistantLight: SVGElementProps<SVGFEDistantLightElement, SVGFeDistantLightProps>;
  feDropShadow: SVGElementProps<SVGFEDropShadowElement, SVGFeDropShadowProps>;
  feFlood: SVGElementProps<SVGFEFloodElement, SVGFeFloodProps>;
  feFuncA: SVGElementProps;
  feFuncB: SVGElementProps;
  feFuncG: SVGElementProps;
  feFuncR: SVGElementProps;
  feGaussianBlur: SVGElementProps<SVGFEGaussianBlurElement, SVGFeGaussianBlurProps>;
  feImage: SVGElementProps<SVGFEImageElement, SVGFeImageProps>;
  feMerge: SVGElementProps;
  feMergeNode: SVGElementProps<SVGFEMergeNodeElement, SVGFeMergeNodeProps>;
  feMorphology: SVGElementProps<SVGFEMorphologyElement, SVGFeMorphologyProps>;
  feOffset: SVGElementProps<SVGFEOffsetElement, SVGFeOffsetProps>;
  fePointLight: SVGElementProps<SVGFEPointLightElement, SVGFePointLightProps>;
  feSpecularLighting: SVGElementProps<SVGFESpecularLightingElement, SVGFeSpecularLightingProps>;
  feSpotLight: SVGElementProps<SVGFESpotLightElement, SVGFeSpotLightProps>;
  feTile: SVGElementProps<SVGFETileElement, SVGFeTileProps>;
  feTurbulence: SVGElementProps<SVGFETurbulenceElement, SVGFeTurbulenceProps>;
  filter: SVGElementProps<SVGFilterElement, SVGFilterProps>;
  foreignObject: SVGElementProps<SVGForeignObjectElement, SVGForeignObjectProps>;
  g: SVGElementProps;
  hatch: SVGElementProps;
  hatchpath: SVGElementProps;
  image: SVGElementProps<SVGImageElement, SVGImageProps>;
  line: SVGElementProps<SVGLineElement, SVGLineProps>;
  linearGradient: SVGElementProps<SVGLinearGradientElement, SVGLinearGradientProps>;
  marker: SVGElementProps<SVGMarkerElement, SVGMarkerProps>;
  mask: SVGElementProps<SVGMaskElement, SVGMaskProps>;
  metadata: SVGElementProps;
  mpath: SVGElementProps<SVGMPathElement, SVGMPathProps>;
  path: SVGElementProps<SVGPathElement, SVGPathProps>;
  pattern: SVGElementProps<SVGPatternElement, SVGPatternProps>;
  polygon: SVGElementProps<SVGPolygonElement, SVGPolygonProps>;
  polyline: SVGElementProps<SVGPolylineElement, SVGPolylineProps>;
  radialGradient: SVGElementProps<SVGRadialGradientElement, SVGRadialGradientProps>;
  rect: SVGElementProps<SVGRectElement, SVGRectProps>;
  set: SVGElementProps<SVGSetElement, SVGSetProps>;
  stop: SVGElementProps<SVGStopElement, SVGStopProps>;
  svg: SVGElementProps<SVGSVGElement, SVGSVGProps>;
  switch: SVGElementProps;
  symbol: SVGElementProps<SVGSymbolElement, SVGSymbolProps>;
  text: SVGElementProps<SVGTextElement, SVGTextProps>;
  textPath: SVGElementProps<SVGTextPathElement, SVGTextPathProps>;
  tspan: SVGElementProps<SVGTSpanElement, SVGTSpanProps>;
  use: SVGElementProps<SVGUseElement, SVGUseProps>;
  view: SVGElementProps;
}
