# Types

<br/>

### `Any`

```ts
type Any = any;
```

### `PropsWithChildren`

```ts
type PropsWithChildren<T extends object> = { children?: Array<RuvyNode> } & T;
```

### `CallbackWithArgs`

```ts
type CallbackWithArgs<A extends Array<unknown> = [], R = void> = (...args: A) => R;
```

### `DOMEventTarget`

```ts
type DOMEventTarget<T extends Element> = Event & T;
```

### `DOMEvent`

```ts
type DOMEvent<E extends Event = Event, T extends Element = HTMLElement> = Event &
  E & {
    target: DOMEventTarget<HTMLElement>;
    currentTarget: DOMEventTarget<T>;
  };
```

### `DOMEventHandler`

```ts
type DOMEventHandler<E extends Event = Event, T extends Element = HTMLElement> = (
  event: DOMEvent<E, T>
) => void;
```

### `Selector`

```ts
type Selector = { [key in keyof CSS.Properties]: Arrayable<CSS.Properties[key]> } & Record<
  string,
  unknown
>;
```

### `Effect`

```ts
type Effect = Callback<Callback | void>;
```

### `Key`

```ts
type Key = string | number;
```

### `Namespace`

```ts
enum Namespace {
  HTML = 'http://www.w3.org/1999/xhtml',
  SVG = 'http://www.w3.org/2000/svg',
  MATH = 'http://www.w3.org/1998/Math/MathML',
}
```

### `RuvyNode`

```ts
type RuvyNode = BranchTemplate | string | boolean | null | undefined | number;
```

### `StateArray`

```ts
type StateArray<T> = [T, (value: T) => void, Callback<T>];
```

### `MountParams`

```ts
interface MountParams {
  hostElement: HTMLElement;
  callback: Callback<JSX.Element>;
}
```

### `RawRoute`

```ts
interface RawRoute<T = unknown> extends CommonRoute<T> {
  routes?: Array<RawRoute>;
}
```

### `RouterParams`

```ts
interface RouterParams {
  base?: string;
  scrollToTop?: boolean;
}
```
