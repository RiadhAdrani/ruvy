import types from './docs/types.md?raw';
import useCallback from './docs/api/useCallback.md?raw';
import useContext from './docs/api/useContext.md?raw';
import useId from './docs/api/useId.md?raw';
import createContext from './docs/api/createContext.md?raw';
import getParams from './docs/api/getParams.md?raw';
import getPathname from './docs/api/getPathname.md?raw';
import getSearchParams from './docs/api/getSearchParams.md?raw';
import navigate from './docs/api/navigate.md?raw';
import replace from './docs/api/replace.md?raw';
import outlet from './docs/api/outlet.md?raw';
import portal from './docs/api/portal.md?raw';
import fragment from './docs/api/fragment.md?raw';
import batch from './docs/api/batch.md?raw';
import createStore from './docs/api/createStore.md?raw';

import more from './docs/more.md?raw';
import classAttribute from './docs/more/class-attribute.md?raw';
import joinClasses from './docs/more/joinClasses.md?raw';
import ifDirective from './docs/more/if-directive.md?raw';
import switchDirective from './docs/more/switch-directive.md?raw';
import eventModifiers from './docs/more/event-modifiers.md?raw';

import createRouter__versions from './docs/api/createRouter/md.js';
import mountApp__versions from './docs/api/mountApp/md.js';
import useState__versions from './docs/api/useState/md.js';
import useEffect__versions from './docs/api/useEffect/md.js';
import useMemo__versions from './docs/api/useMemo/md.js';

import docs__versions from './docs/api/index/md.js';

import { DocItem } from '../types/index.js';

export const ApiSections: Array<DocItem> = [
  {
    path: '/mountApp',
    versions: mountApp__versions,
    title: 'mountApp',
  },
  {
    path: '/createRouter',
    versions: createRouter__versions,
    title: 'createRouter',
  },
  {
    path: '/createStore',
    versions: [{ from: '0.5.0', to: '0.5.0', md: createStore }],
    title: 'createStore',
  },
  {
    path: '/useState',
    versions: useState__versions,
    title: 'useState',
  },
  {
    path: '/useEffect',
    versions: useEffect__versions,
    title: 'useEffect',
  },
  {
    path: '/useMemo',
    versions: useMemo__versions,
    title: 'useMemo',
  },
  {
    path: '/useCallback',
    versions: [{ from: '0.5.0', md: useCallback }],
    title: 'useCallback',
  },
  {
    path: '/useContext',
    versions: [{ from: '0.5.0', md: useContext }],
    title: 'useContext',
  },
  {
    path: '/useId',
    versions: [{ from: '0.5.0', md: useId }],
    title: 'useId',
  },
  {
    path: '/createContext',
    versions: [{ from: '0.5.0', md: createContext }],
    title: 'createContext',
  },
  {
    path: '/getParams',
    versions: [{ from: '0.5.0', md: getParams }],
    title: 'getParams',
  },
  {
    path: '/getSearchParams',
    versions: [{ from: '0.5.0', md: getSearchParams }],
    title: 'getSearchParams',
  },
  {
    path: '/getPathname',
    versions: [{ from: '0.5.0', md: getPathname }],
    title: 'getPathname',
  },
  {
    path: '/replace',
    versions: [{ from: '0.5.0', to: '0.5.0', md: replace }],
    element: replace,
    title: 'replace',
  },
  {
    path: '/navigate',
    versions: [{ from: '0.5.0', md: navigate }],
    title: 'navigate',
  },
  {
    path: '/batch',
    versions: [{ from: '0.5.0', to: '0.5.0', md: batch }],
    element: batch,
    title: 'batch',
  },
  {
    path: '/outlet',
    versions: [{ from: '0.5.0', md: outlet }],
    title: '<Outlet/>',
  },
  {
    path: '/fragment',
    versions: [{ from: '0.5.0', md: fragment }],
    title: '<Fragment/>',
  },
  {
    path: '/portal',
    versions: [{ from: '0.5.0', md: portal }],
    title: '<Portal/>',
  },
];

export const MoreSections: Array<DocItem> = [
  {
    path: '/class-attribute',
    versions: [{ from: '0.5.0', md: classAttribute }],
    title: 'Class attribute',
  },
  {
    path: '/joinClasses',
    versions: [{ from: '0.5.0', md: joinClasses }],
    title: 'joinClasses',
  },
  {
    path: '/if-directive',
    versions: [{ from: '0.5.0', md: ifDirective }],
    title: 'if directives',
  },
  {
    path: '/switch-directive',
    versions: [{ from: '0.5.0', md: switchDirective }],
    title: 'switch directives',
  },
  {
    path: '/event-modifiers',
    versions: [{ from: '0.5.0', md: eventModifiers }],
    title: 'Event modifiers',
  },
];

export const DocsSections: Array<DocItem> = [
  {
    path: '/api',
    title: 'API',
    children: ApiSections,
    versions: docs__versions,
  },
  {
    path: '/more',
    title: 'More',
    children: MoreSections,
    versions: [{ from: '0.5.0', md: more }],
  },
  {
    path: '/types',
    title: 'Types',
    children: [],
    versions: [{ from: '0.5.0', md: types }],
  },
];
