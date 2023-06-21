# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

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
