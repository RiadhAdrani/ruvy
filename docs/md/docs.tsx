import types from './docs/types.md?raw';
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
import createComposable__versions from './docs/api/createComposable/md.js';
import createContext__versions from './docs/api/createContext/md.js';

import mountApp__versions from './docs/api/mountApp/md.js';

import useState__versions from './docs/api/useState/md.js';
import useEffect__versions from './docs/api/useEffect/md.js';
import useMemo__versions from './docs/api/useMemo/md.js';
import useCallback__versions from './docs/api/useCallback/md.js';
import useId__versions from './docs/api/useId/md.js';
import useContext__versions from './docs/api/useContext/md.js';
import useComposable__versions from './docs/api/useComposable/md.js';
import getParams__versions from './docs/api/getParams/md.js';

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
    path: '/createComposable',
    versions: createComposable__versions,
    title: 'createComposable',
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
    versions: useCallback__versions,
    title: 'useCallback',
  },
  {
    path: '/useContext',
    versions: useContext__versions,
    title: 'useContext',
  },
  {
    path: '/useComposable',
    versions: useComposable__versions,
    title: 'useComposable',
  },
  {
    path: '/useId',
    versions: useId__versions,
    title: 'useId',
  },
  {
    path: '/createContext',
    versions: createContext__versions,
    title: 'createContext',
  },
  {
    path: '/getParams',
    versions: getParams__versions,
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
