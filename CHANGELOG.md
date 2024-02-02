# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Fixed

- export missing `getParams` from router.

## 0.5.3 - 2024-01-28

### Fixed

- bump `@riadh-adrani/domer` version.
- bump `@riadh-adrani/dom-router` version.

## 0.5.2 - 2024-01-14

### Fixed

- fixed `createDestination` throwing when used without a router.

## 0.5.1 - 2024-01-14

### Added

- `createComposable` create a global hook that can be accessed from anywhere in the tree.
- `useComposable` retrieve a named `composable`.
- `unmountApp` used to unmount the current app instance.
- `unmountRouter` used to unmount the current router instance.
- `createDestination` create a valid url using a destination request.

### Changed

- remake the framework from scratch and changed its architecture to be more expandable and dynamic.
- switched to `@riadh-adrani/domer` instead of `@riadh-adrani/dom-utils` for DOM manipulations.
- switched to `@riadh-adrani/dom-router` as the base of the routing system.
- `navigate` now accepts a second parameter `DestinationOptions`.

### Removed

- `createStore` is removed, replaced by `createComposable`.
- `batch` no longer useful during to framework architectural change.
- `replace` removed, you can set `DestinationOptions.replace` to `true` instead.

## 0.5.0 - 2023-10-03

### Removed

- removed experimental hooks `useReactive` and `usePromise`.

## 0.4.14 - 2023-09-09

### Changed

- optimized `actions` by collecting them while traversing the tree.

## 0.4.13 - 2023-09-02

### Added

- `dom:focused` attribute that will try to focus the element when created, ignored after the first render.

### Changed

- `innerHTML` to `dom:innerHTML` to indicate it's framework-specific.

### Fixed

- changing unmounted element position causes the app to crash.

## 0.4.12 - 2023-08-17

### Added

- named `<Fragment/>` component.

### Changed

- `class` attributes now accepts arrayables of `boolean`, `undefied` or `null`.

## 0.4.11 - 2023-08-13

### Fixed

- children not correctly reordered in some edge cases.
- allow the use of event modifiers without an actual function value

## 0.4.10 - 2023-08-10

### Added

- `dom:tag` to make html element tag dynamic.

### Fixed

- `<Portal/>` element not properly changing containers.

## 0.4.9 - 2023-08-04

### Added

- `innerHTML` attribute that allow direct setting of an HTMLElement innerHTML prop.
- add event modifiers like `Vue.js`, in this form `onEvent:prevent`, `onEvent:stop` or both `onEvent:prevent-stop`.

## 0.4.8 - 2023-07-30

## 0.4.7 - 2023-07-30

## 0.4.6 - 2023-07-24

### Removed

- removed all `deprecated` functions and classes.

### Fixed

- `anchor` element not working as intended

## 0.4.5 - 2023-07-19

### Added

- `name` route property, similar to `vue-router`.
- `titleTransform` handler to preprocess the title before applying it.
- `createStore` similar to `writable` store in `svelte`

### Changed

- `navigate` now accepts a number or an object for a `named` route.

### Deprecated

- `useKey` is now replaced with `createStore`.
- `Store` as it is becoming useless.

## 0.4.4 - 2023-07-06

### Added

- Add `switch`, `case` and `case:default` directives.
- Attach host `Branch` object to dom node.
- `ref` typing.

### Changed

- `useState` accepts an initilizer function, and a setter callback.
- improved project structure.
- improved typing.

## 0.4.3 - 2023-07-01

### Changed

- refactored project structure for a smaller bundle size.

## 0.4.2 - 2023-06-28

## 0.4.1 - 2023-06-28

### Added

- `else` and `else-if` directives that goes with `if` directive, similar to `vue.js`

### Changed

- improve `JSX.Element`s typing
- better `svg` elements typing

## 0.4.0 - 2023-06-25

### Added

- `if` directive which accepts a boolean to determine if a component should be rendered or not.
- `PropWithUtility` that allow the developer to initialize a prop type with optional `children`, `key` and `if` properties.
- `getPathname` returns the current url without the `base`.

### Changed

- `useReactive` uses `@riadh-adrani/utils/createReactive` to create reactive object instances.
- `mountRouter` config is now optional.
- deperecated `getRoute` in favor of `getPathname`.

## 0.3.0 - 2023-06-22

### Added

- `useContext`, same as `react.js`.
- `useReactive`, similar to `vue.js`'s `reactive`.
- `usePromise`, a hook that allows the user to fetch data while tracking the request state and return value.
- `joinClasses`, a utility function that filter and returns a valid className as a string.
- `getSearchQuery`, a function that returns the search params of the current route as a typed object.
- `getRoute`, a function that returns the current url without the `base`.
- added `SVG` elements with shallow typing.
- creation of the docs website.
- add `titleSuffix` and `titlePrefix` as optional params in `RouterParams`.
- add `<Portal/>` component, allowing to teleport elements in another DOM container.

### Fixed

- `scrollToTop` not having any effect, when a new page is loaded.

## 0.2.0 - 2023-06-02

### Added

- JSX syntax for writing expressive and reusable UI components.
- Function components for a modular and composable code structure.
- Hooks for managing state, performing side effects, and custom logic reuse: `useState`, `useEffect`, `useMemo`, `useCallback`, `useId` and `useRef`.
- Synchronous rendering for a straightforward and beginner-friendly development experience.
- Intuitive API that closely resembles React's patterns and conventions.
- SPA Router.
- key-value Store.
