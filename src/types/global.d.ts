import { Arrayable, StringWithAutoComplete } from "@riadh-adrani/utils";
import { StateArray } from "./store";

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

  interface DOMEvent<E extends Event = Event, T extends Element = HTMLElement> extends Event {
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

  interface CommonProps {
    class: Arrayable<string>;
    id: string;
    style: Record<string, unknown> | string; // TODO : correct style type
    value: string | number;
    lang: string;
    accessKey: string;
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

  interface ComponentProps<E extends Element = HTMLElement>
    extends Record<string, unknown>,
      Partial<CommonProps>,
      Partial<DOMEvents<E>> {}

  namespace JSX {
    interface IntrinsicElements extends Record<string, ComponentProps> {
      a: ComponentProps<HTMLAnchorElement>;
      abbr: ComponentProps;
      address: ComponentProps;
      area: ComponentProps<HTMLAreaElement>;
      article: ComponentProps;
      aside: ComponentProps;
      audio: ComponentProps<HTMLAudioElement>;
      b: ComponentProps;
      base: ComponentProps<HTMLBaseElement>;
      bdi: ComponentProps;
      bdo: ComponentProps;
      big: ComponentProps;
      blockquote: ComponentProps<HTMLQuoteElement>;
      body: ComponentProps<HTMLBodyElement>;
      br: ComponentProps<HTMLBRElement>;
      button: ComponentProps<HTMLButtonElement>;
      canvas: ComponentProps<HTMLCanvasElement>;
      caption: ComponentProps;
      center: ComponentProps;
      cite: ComponentProps;
      code: ComponentProps;
      col: ComponentProps<HTMLTableColElement>;
      colgroup: ComponentProps<HTMLTableColElement>;
      data: ComponentProps<HTMLDataElement>;
      datalist: ComponentProps<HTMLDataListElement>;
      dd: ComponentProps;
      del: ComponentProps<HTMLModElement>;
      details: ComponentProps<HTMLDetailsElement>;
      dfn: ComponentProps;
      dialog: ComponentProps<HTMLDialogElement>;
      div: ComponentProps<HTMLDivElement>;
      dl: ComponentProps<HTMLDListElement>;
      dt: ComponentProps;
      em: ComponentProps;
      embed: ComponentProps<HTMLEmbedElement>;
      fieldset: ComponentProps<HTMLFieldSetElement>;
      figcaption: ComponentProps;
      figure: ComponentProps;
      footer: ComponentProps;
      form: ComponentProps<HTMLFormElement>;
      h1: ComponentProps<HTMLHeadingElement>;
      h2: ComponentProps<HTMLHeadingElement>;
      h3: ComponentProps<HTMLHeadingElement>;
      h4: ComponentProps<HTMLHeadingElement>;
      h5: ComponentProps<HTMLHeadingElement>;
      h6: ComponentProps<HTMLHeadingElement>;
      head: ComponentProps<HTMLHeadElement>;
      header: ComponentProps;
      hgroup: ComponentProps;
      hr: ComponentProps<HTMLHRElement>;
      html: ComponentProps<HTMLHtmlElement>;
      i: ComponentProps;
      iframe: ComponentProps<HTMLIFrameElement>;
      img: ComponentProps<HTMLImageElement>;
      input: ComponentProps<HTMLInputElement>;
      ins: ComponentProps<HTMLModElement>;
      kbd: ComponentProps;
      keygen: ComponentProps;
      label: ComponentProps<HTMLLabelElement>;
      legend: ComponentProps<HTMLLegendElement>;
      li: ComponentProps<HTMLLIElement>;
      link: ComponentProps<HTMLLinkElement>;
      main: ComponentProps;
      map: ComponentProps<HTMLMapElement>;
      mark: ComponentProps;
      menu: ComponentProps<HTMLMenuElement>;
      menuitem: ComponentProps;
      meta: ComponentProps<HTMLMetaElement>;
      meter: ComponentProps<HTMLMeterElement>;
      nav: ComponentProps;
      noindex: ComponentProps;
      noscript: ComponentProps;
      object: ComponentProps<HTMLObjectElement>;
      ol: ComponentProps<HTMLOListElement>;
      optgroup: ComponentProps<HTMLOptGroupElement>;
      option: ComponentProps<HTMLOptionElement>;
      output: ComponentProps<HTMLOutputElement>;
      p: ComponentProps<HTMLParagraphElement>;
      param: ComponentProps<HTMLParamElement>;
      picture: ComponentProps<HTMLPictureElement>;
      pre: ComponentProps<HTMLPreElement>;
      progress: ComponentProps<HTMLProgressElement>;
      q: ComponentProps<HTMLQuoteElement>;
      rp: ComponentProps;
      rt: ComponentProps;
      ruby: ComponentProps;
      s: ComponentProps;
      samp: ComponentProps;
      slot: ComponentProps<HTMLSlotElement>;
      script: ComponentProps<HTMLScriptElement>;
      section: ComponentProps;
      select: ComponentProps<HTMLSelectElement>;
      small: ComponentProps;
      source: ComponentProps<HTMLSourceElement>;
      span: ComponentProps<HTMLSpanElement>;
      strong: ComponentProps;
      style: ComponentProps<HTMLStyleElement>;
      sub: ComponentProps;
      summary: ComponentProps;
      sup: ComponentProps;
      table: ComponentProps<HTMLTableElement>;
      template: ComponentProps<HTMLTemplateElement>;
      tbody: ComponentProps<HTMLTableSectionElement>;
      td: ComponentProps<HTMLTableDataCellElement>;
      textarea: ComponentProps<HTMLTextAreaElement>;
      tfoot: ComponentProps<HTMLTableSectionElement>;
      th: ComponentProps<HTMLTableHeaderCellElement>;
      thead: ComponentProps<HTMLTableSectionElement>;
      time: ComponentProps<HTMLTimeElement>;
      title: ComponentProps<HTMLTitleElement>;
      tr: ComponentProps<HTMLTableRowElement>;
      track: ComponentProps<HTMLTrackElement>;
      u: ComponentProps;
      ul: ComponentProps<HTMLUListElement>;
      var: ComponentProps;
      video: ComponentProps<HTMLVideoElement>;
      wbr: ComponentProps;
      webview: ComponentProps;
    }
  }
}
