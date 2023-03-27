import { Arrayable, StringWithAutoComplete } from "@riadh-adrani/utils";
import { StateArray } from "./store";
import type * as CSS from "csstype";
import {
  FunctionComponent,
  IComponentTemplate,
  PrimitiveComponentTemplate,
  Tag,
} from "./component";
import { Callback } from "./common";

declare global {
  function setState<T>(key: string, value: T): StateArray<T>;

  function setEffect(callback: Callback, key: string, dependencies?: unknown): void;

  function createJsxElement(
    tag: Tag | FunctionComponent,
    options?: Record<string, unknown>,
    ...children: Array<unknown>
  ): IComponentTemplate;

  function createJsxFragmentElement(
    _: unknown,
    ...children: Array<PrimitiveComponentTemplate | IComponentTemplate>
  ): Array<unknown>;

  type DOMEventTarget<T extends Element> = Event & T;

  interface DOMEvent<E extends Event = Event, T extends Element = HTMLElement> extends Event, E {
    target: DOMEventTarget<HTMLElement>;
    currentTarget: DOMEventTarget<T>;
  }

  type DOMEventHandler<E extends Event = Event, T extends Element = HTMLElement> = (
    event: DOMEvent<E, T>
  ) => void;

  interface DOMEvents<E extends Element> {
    onAnimationEnd: DOMEventHandler<AnimationEvent, E>;
    onAnimationIteration: DOMEventHandler<AnimationEvent, E>;
    onAnimationStart: DOMEventHandler<AnimationEvent, E>;
    onBlur: DOMEventHandler<FocusEvent, E>;
    onCanPlay: DOMEventHandler<Event, E>;
    onCanPlayThrough: DOMEventHandler<Event, E>;
    onChange: DOMEventHandler<InputEvent, E>;
    onContextMenu: DOMEventHandler<MouseEvent, E>;
    onCopy: DOMEventHandler<ClipboardEvent, E>;
    onCut: DOMEventHandler<ClipboardEvent, E>;
    onDurationChange: DOMEventHandler<Event, E>;
    onEnded: DOMEventHandler<Event, E>;
    onFocus: DOMEventHandler<FocusEvent, E>;
    onFocusIn: DOMEventHandler<FocusEvent, E>;
    onFocusOut: DOMEventHandler<FocusEvent, E>;
    onInvalid: DOMEventHandler<Event, E>;
    onPaste: DOMEventHandler<ClipboardEvent, E>;
    onPause: DOMEventHandler<Event, E>;
    onPlay: DOMEventHandler<Event, E>;
    onPlaying: DOMEventHandler<Event, E>;
    onProgress: DOMEventHandler<Event, E>;
    onRateChange: DOMEventHandler<Event, E>;
    onResize: DOMEventHandler<UIEvent, E>;
    onReset: DOMEventHandler<Event, E>;
    onScroll: DOMEventHandler<Event, E>;
    onSeeked: DOMEventHandler<Event, E>;
    onSeeking: DOMEventHandler<Event, E>;
    onSelect: DOMEventHandler<Event, E>;
    onShow: DOMEventHandler<Event, E>;
    onStalled: DOMEventHandler<Event, E>;
    onSubmit: DOMEventHandler<SubmitEvent, E>;
    onSuspend: DOMEventHandler<Event, E>;
    onTimeUpdate: DOMEventHandler<Event, E>;
    onToggle: DOMEventHandler<Event, E>;
    onTransitionEnd: DOMEventHandler<TransitionEvent>;
    onVolumeChange: DOMEventHandler<Event, E>;
    onWaiting: DOMEventHandler<Event, E>;
    onWheel: DOMEventHandler<WheelEvent, E>;
    onInput: DOMEventHandler<InputEvent, E>;
    onDrag: DOMEventHandler<DragEvent, E>;
    onDragEnd: DOMEventHandler<DragEvent, E>;
    onDragEnter: DOMEventHandler<DragEvent, E>;
    onDragLeave: DOMEventHandler<DragEvent, E>;
    onDragOver: DOMEventHandler<DragEvent, E>;
    onDragStart: DOMEventHandler<DragEvent, E>;
    onDrop: DOMEventHandler<DragEvent, E>;

    onKeyDown: DOMEventHandler<KeyboardEvent, E>;
    onKeyPress: DOMEventHandler<KeyboardEvent, E>;
    onKeyUp: DOMEventHandler<KeyboardEvent, E>;

    onClick: DOMEventHandler<MouseEvent, E>;
    onDblClick: DOMEventHandler<MouseEvent, E>;
    onMouseDown: DOMEventHandler<MouseEvent, E>;
    onMouseEnter: DOMEventHandler<MouseEvent, E>;
    onMouseLeave: DOMEventHandler<MouseEvent, E>;
    onMouseMove: DOMEventHandler<MouseEvent, E>;
    onMouseOver: DOMEventHandler<MouseEvent, E>;
    onMouseOut: DOMEventHandler<MouseEvent, E>;
    onMouseUp: DOMEventHandler<MouseEvent, E>;

    onPointerOver: DOMEventHandler<PointerEvent, E>;
    onPointerEnter: DOMEventHandler<PointerEvent, E>;
    onPointerDown: DOMEventHandler<PointerEvent, E>;
    onPointerMove: DOMEventHandler<PointerEvent, E>;
    onPointerUp: DOMEventHandler<PointerEvent, E>;
    onPointerCancel: DOMEventHandler<PointerEvent, E>;
    onPointerOut: DOMEventHandler<PointerEvent, E>;
    onPointerLeave: DOMEventHandler<PointerEvent, E>;
    onGotPointerCapture: DOMEventHandler<PointerEvent, E>;
    onLostPointerCapture: DOMEventHandler<PointerEvent, E>;

    onTouchCancel: DOMEventHandler<TouchEvent, E>;
    onTouchEnd: DOMEventHandler<TouchEvent, E>;
    onTouchMove: DOMEventHandler<TouchEvent, E>;
    onTouchStart: DOMEventHandler<TouchEvent, E>;
  }

  export type Selector = { [key in keyof CSS.Properties]: Arrayable<string | number> } & Record<
    string,
    unknown
  >;

  interface Aria {
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

  type AriaProps = { [key in `aria-${keyof Aria}`]: string | number | boolean };

  interface CommonProps extends AriaProps {
    class: Arrayable<string>;
    id: string;
    style: Selector | string;
    value: string | number;
    lang: string;
    accesskey: string;
    autocapitalize: StringWithAutoComplete<
      "off" | "none" | "on" | "sentences" | "words" | "characters"
    >;
    contentEditable: StringWithAutoComplete<"true" | "false">;
    contextmenu: string;
    compact: string;
    dir: StringWithAutoComplete<"ltr" | "rtl" | "auto">;
    draggable: StringWithAutoComplete<"true" | "false">;
    hidden: boolean;
    playsinline: string;
    role: string;
    slot: string;
    spellcheck: StringWithAutoComplete<"true" | "false">;
    tabindex: string;
    title: string;
    translate: StringWithAutoComplete<"yes" | "no">;
  }

  type ComponentProps<E extends Element = HTMLElement, T extends object = object> = Record<
    string | number,
    unknown
  > &
    Partial<CommonProps> &
    Partial<DOMEvents<E>> &
    Partial<T>;

  interface BlockQuoteProps {
    cite: string;
  }

  interface HrProps {
    align: string;
    color: string;
    noshade: boolean;
    size: string;
    width: string;
  }

  interface LiProps {
    value: string;
    type: string;
  }

  interface OlProps {
    reversed: boolean;
    start: string;
    type: string;
  }

  interface PreProps {
    cols: number;
    width: string;
    wrap: "hard" | "soft" | "off";
  }

  interface UlProps {
    compact: string;
    type: string;
  }

  interface AProps {
    download: string;
    href: string;
    hreflang: string;
    ping: string;
    referrerpolicy: string;
    rel: string;
    target: string;
    type: string;
  }

  interface BdiProps {
    dir: string;
  }

  interface BdoProps {
    dir: string;
  }

  interface DataProps {
    value: string;
  }

  interface QProps {
    cite: string;
  }

  interface TimeProps {
    datetime: string;
  }

  interface AreaProps {
    alt: string;
    coords: string;
    download: string;
    href: string;
    ping: string;
    referrerpolicy: string;
    rel: string;
    shape: string;
    target: string;
  }

  interface AudioProps {
    autoplay: boolean;
    controls: boolean;
    crossorigin: string;
    loop: boolean;
    muted: boolean;
    preload: string;
    src: string;
  }

  interface ImgProps {
    alt: string;
    crossorigin: string;
    decoding: string;
    height: string | number;
    ismap: boolean;
    loading: string;
    referrerpolicy: string;
    sizes: string;
    src: string;
    srcset: string;
    width: string | number;
    usemap: string;
  }

  interface MapProps {
    name: string;
  }

  interface TrackProps {
    def: string;
    kind: string;
    label: string;
    src: string;
    srclang: string;
  }

  interface VideoProps {
    autoplay: boolean;
    crossorigin: string;
    height: string | number;
    loop: boolean;
    muted: boolean;
    playsinline: string;
    poster: string;
    preload: string;
    src: string;
    width: string | number;
  }

  interface EmbedProps {
    height: string | number;
    src: string;
    type: string;
    width: string | number;
  }

  interface IframeProps {
    allow: string;
    allowfullscreen: string;
    allowpaymentrequest: string;
    height: string | number;
    loading: string;
    name: string;
    referrerpolicy: string;
    sandbox: string;
    src: string;
    srcdoc: string;
    width: string | number;
  }

  interface ObjectProps {
    data: string;
    form: string;
    height: string | number;
    name: string;
    type: string;
    usemap: string;
    width: string | number;
  }

  interface SourceProps {
    type: string;
  }

  interface CanvasProps {
    height: string | number;
    width: string | number;
  }

  interface DelProps {
    cite: string;
    datetime: string;
  }

  interface InsProps {
    cite: string;
    datetime: string;
  }

  interface ColProps {
    span: string;
  }

  interface ColGroupProps {
    span: string;
  }

  interface TdProps {
    colspan: string;
    headers: string;
    rowspan: string;
  }

  interface ThProps {
    colspan: string;
    headers: string;
    rowspan: string;
    scope: string;
  }

  interface ButtonProps {
    autofocus: string;
    disabled: boolean;
    form: string;
    formaction: string;
    formenctype: string;
    formmethod: string;
    formnovalidate: string;
    formtarget: string;
    name: string;
    type: string;
    value: string;
  }

  interface FieldsetProps {
    disabled: boolean;
    form: string;
    name: string;
  }

  interface FormProps {
    acceptcharset: string;
    autocomplete: string;
    name: string;
    rel: string;
    action: string;
    enctype: string;
    method: string;
    novalidate: string;
    target: string;
  }

  interface InputProps {
    accept: string;
    alt: string;
    autocomplete: string;
    capture: string;
    checked: boolean;
    dirname: string;
    disabled: boolean;
    form: string;
    formaction: string;
    formenctype: string;
    formmethod: string;
    formnovalidate: string;
    formtarget: string;
    height: string | number;
    list: string;
    max: number | string;
    maxlength: number | string;
    min: number | string;
    minlength: number | string;
    multiple: boolean;
    name: string;
    pattern: string;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    size: string;
    src: string;
    step: string | number;
    value: string | number;
    width: string;
  }

  interface LabelProps {
    for: string;
  }

  interface MeterProps {
    value: number;
    min: number;
    max: number;
    low: number;
    high: number;
    optimum: number;
  }

  interface OptgroupProps {
    disabled: boolean;
    label: string;
  }

  interface OptionProps {
    disabled: boolean;
    label: string;
    selected: boolean;
    value: string;
  }

  interface OutputProps {
    for: string;
    form: string;
    name: string;
  }

  interface ProgressProps {
    max: number;
    value: number;
  }

  interface SelectProps {
    autocomplete: string;
    autofocus: string;
    disabled: boolean;
    form: string;
    multiple: boolean;
    name: string;
    required: boolean;
    size: string;
  }

  interface TextareaProps {
    autocomplete: string;
    autofocus: string;
    cols: number;
    disabled: boolean;
    form: string;
    maxlength: number;
    name: string;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    spellcheck: string;
    wrap: string;
  }

  interface DetailsProps {
    open: boolean;
  }

  interface DialogProps {
    open: boolean;
  }

  interface SlotProps {
    name: string;
  }

  namespace JSX {
    interface IntrinsicElements extends Record<string, unknown> {
      a: ComponentProps<HTMLAnchorElement, AProps>;
      abbr: ComponentProps;
      address: ComponentProps;
      area: ComponentProps<HTMLAreaElement, AreaProps>;
      article: ComponentProps;
      aside: ComponentProps;
      audio: ComponentProps<HTMLAudioElement, AudioProps>;
      b: ComponentProps;
      base: ComponentProps<HTMLBaseElement>;
      bdi: ComponentProps<HTMLElement, BdiProps>;
      bdo: ComponentProps<HTMLElement, BdoProps>;
      big: ComponentProps;
      blockquote: ComponentProps<HTMLQuoteElement, BlockQuoteProps>;
      body: ComponentProps<HTMLBodyElement>;
      br: ComponentProps<HTMLBRElement>;
      button: ComponentProps<HTMLButtonElement, ButtonProps>;
      canvas: ComponentProps<HTMLCanvasElement, CanvasProps>;
      caption: ComponentProps;
      center: ComponentProps;
      cite: ComponentProps;
      code: ComponentProps;
      col: ComponentProps<HTMLTableColElement, ColProps>;
      colgroup: ComponentProps<HTMLTableColElement, ColGroupProps>;
      data: ComponentProps<HTMLDataElement, DataProps>;
      datalist: ComponentProps<HTMLDataListElement>;
      dd: ComponentProps;
      del: ComponentProps<HTMLModElement, DelProps>;
      details: ComponentProps<HTMLDetailsElement, DetailsProps>;
      dfn: ComponentProps;
      dialog: ComponentProps<HTMLDialogElement, DialogProps>;
      div: ComponentProps<HTMLDivElement>;
      dl: ComponentProps<HTMLDListElement>;
      dt: ComponentProps;
      em: ComponentProps;
      embed: ComponentProps<HTMLEmbedElement, EmbedProps>;
      fieldset: ComponentProps<HTMLFieldSetElement, FieldsetProps>;
      figcaption: ComponentProps;
      figure: ComponentProps;
      footer: ComponentProps;
      form: ComponentProps<HTMLFormElement, FormProps>;
      h1: ComponentProps<HTMLHeadingElement>;
      h2: ComponentProps<HTMLHeadingElement>;
      h3: ComponentProps<HTMLHeadingElement>;
      h4: ComponentProps<HTMLHeadingElement>;
      h5: ComponentProps<HTMLHeadingElement>;
      h6: ComponentProps<HTMLHeadingElement>;
      head: ComponentProps<HTMLHeadElement>;
      header: ComponentProps;
      hgroup: ComponentProps;
      hr: ComponentProps<HTMLHRElement, HrProps>;
      html: ComponentProps<HTMLHtmlElement>;
      i: ComponentProps;
      iframe: ComponentProps<HTMLIFrameElement, IframeProps>;
      img: ComponentProps<HTMLImageElement, ImgProps>;
      input: ComponentProps<HTMLInputElement, InputProps>;
      ins: ComponentProps<HTMLModElement, InsProps>;
      kbd: ComponentProps;
      keygen: ComponentProps;
      label: ComponentProps<HTMLLabelElement, LabelProps>;
      legend: ComponentProps<HTMLLegendElement>;
      li: ComponentProps<HTMLLIElement, LiProps>;
      link: ComponentProps<HTMLLinkElement>;
      main: ComponentProps;
      map: ComponentProps<HTMLMapElement, MapProps>;
      mark: ComponentProps;
      menu: ComponentProps<HTMLMenuElement>;
      menuitem: ComponentProps;
      meta: ComponentProps<HTMLMetaElement>;
      meter: ComponentProps<HTMLMeterElement, MeterProps>;
      nav: ComponentProps;
      noindex: ComponentProps;
      noscript: ComponentProps;
      object: ComponentProps<HTMLObjectElement, ObjectProps>;
      ol: ComponentProps<HTMLOListElement, OlProps>;
      optgroup: ComponentProps<HTMLOptGroupElement, OptgroupProps>;
      option: ComponentProps<HTMLOptionElement, OptionProps>;
      output: ComponentProps<HTMLOutputElement, OutputProps>;
      p: ComponentProps<HTMLParagraphElement>;
      param: ComponentProps<HTMLParamElement>;
      picture: ComponentProps<HTMLPictureElement>;
      pre: ComponentProps<HTMLPreElement, PreProps>;
      progress: ComponentProps<HTMLProgressElement, ProgressProps>;
      q: ComponentProps<HTMLQuoteElement, QProps>;
      rp: ComponentProps;
      rt: ComponentProps;
      ruby: ComponentProps;
      s: ComponentProps;
      samp: ComponentProps;
      slot: ComponentProps<HTMLSlotElement, SlotProps>;
      script: ComponentProps<HTMLScriptElement>;
      section: ComponentProps;
      select: ComponentProps<HTMLSelectElement, SelectProps>;
      small: ComponentProps;
      source: ComponentProps<HTMLSourceElement, SourceProps>;
      span: ComponentProps<HTMLSpanElement>;
      strong: ComponentProps;
      style: ComponentProps<HTMLStyleElement>;
      sub: ComponentProps;
      summary: ComponentProps;
      sup: ComponentProps;
      table: ComponentProps<HTMLTableElement>;
      template: ComponentProps<HTMLTemplateElement>;
      tbody: ComponentProps<HTMLTableSectionElement>;
      td: ComponentProps<HTMLTableDataCellElement, TdProps>;
      textarea: ComponentProps<HTMLTextAreaElement, TextareaProps>;
      tfoot: ComponentProps<HTMLTableSectionElement>;
      th: ComponentProps<HTMLTableHeaderCellElement, ThProps>;
      thead: ComponentProps<HTMLTableSectionElement>;
      time: ComponentProps<HTMLTimeElement, TimeProps>;
      title: ComponentProps<HTMLTitleElement>;
      tr: ComponentProps<HTMLTableRowElement>;
      track: ComponentProps<HTMLTrackElement, TrackProps>;
      u: ComponentProps;
      ul: ComponentProps<HTMLUListElement, UlProps>;
      var: ComponentProps;
      video: ComponentProps<HTMLVideoElement>;
      wbr: ComponentProps;
      webview: ComponentProps;
    }
  }
}
