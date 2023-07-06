# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

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
