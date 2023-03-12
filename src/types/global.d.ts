import { Arrayable } from "@riadh-adrani/utils";
import { StateArray } from "./store";

export {};

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
    onClick: DOMEventHandler<MouseEvent, E>;
    onInput: DOMEventHandler<InputEvent, E>;
    onChange: DOMEventHandler<InputEvent, E>;
  }

  interface CommonProps {
    class: Arrayable<string>;
    id: string;
    style: Record<string, unknown> | string; // TODO : correct style type
    value: string | number;
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
