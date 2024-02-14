import types from './docs/types.md?raw';
import replace from './docs/api/replace.md?raw';
import batch from './docs/api/batch.md?raw';
import createStore from './docs/api/createStore.md?raw';

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
import getSearchParams__versions from './docs/api/getSearchParams/md.js';
import getPathname__versions from './docs/api/getPathname/md.js';
import navigate__versions from './docs/api/navigate/md.js';
import outlet__versions from './docs/api/outlet/md.js';
import fragment__versions from './docs/api/fragment/md.js';
import portal__versions from './docs/api/portal/md.js';

import docs__versions from './docs/api/index/md.js';

import more_versions from './docs/more/index/md.js';
import class_versions from './docs/more/class-attribute/md.js';
import joinClasses_versions from './docs/more/join-classes/md.js';
import if_directives_versions from './docs/more/if-directives/md.js';
import switch_directives_versions from './docs/more/switch-directives/md.js';
import event_modifiers_versions from './docs/more/event-modifiers/md.js';

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
    versions: getSearchParams__versions,
    title: 'getSearchParams',
  },
  {
    path: '/getPathname',
    versions: getPathname__versions,
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
    versions: navigate__versions,
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
    versions: outlet__versions,
    title: '<Outlet/>',
  },
  {
    path: '/fragment',
    versions: fragment__versions,
    title: '<Fragment/>',
  },
  {
    path: '/portal',
    versions: portal__versions,
    title: '<Portal/>',
  },
];

export const MoreSections: Array<DocItem> = [
  {
    path: '/class-attribute',
    versions: class_versions,
    title: 'Class attribute',
  },
  {
    path: '/joinClasses',
    versions: joinClasses_versions,
    title: 'joinClasses',
  },
  {
    path: '/if-directive',
    versions: if_directives_versions,
    title: 'if directives',
  },
  {
    path: '/switch-directive',
    versions: switch_directives_versions,
    title: 'switch directives',
  },
  {
    path: '/event-modifiers',
    versions: event_modifiers_versions,
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
    versions: more_versions,
  },
  {
    path: '/types',
    title: 'Types',
    children: [],
    versions: [{ from: '0.5.0', md: types }],
  },
];
