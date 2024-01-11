import api from './docs/api.md?raw';
import types from './docs/types.md?raw';

import useState from './docs/api/useState.md?raw';
import useEffect from './docs/api/useEffect.md?raw';
import useMemo from './docs/api/useMemo.md?raw';
import useCallback from './docs/api/useCallback.md?raw';
import useContext from './docs/api/useContext.md?raw';
import useId from './docs/api/useId.md?raw';
import createContext from './docs/api/createContext.md?raw';
import createRouter from './docs/api/createRouter.md?raw';
import getParams from './docs/api/getParams.md?raw';
import getPathname from './docs/api/getPathname.md?raw';
import getSearchParams from './docs/api/getSearchParams.md?raw';
import mountApp from './docs/api/mountApp.md?raw';
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

import { DocItem } from '../types/index.js';

export const ApiSections: Array<DocItem> = [
  { path: '/mountApp', element: mountApp, title: 'mountApp' },
  { path: '/createRouter', element: createRouter, title: 'createRouter' },
  { path: '/createStore', element: createStore, title: 'createStore' },
  { path: '/useState', element: useState, title: 'useState' },
  { path: '/useEffect', element: useEffect, title: 'useEffect' },
  { path: '/useMemo', element: useMemo, title: 'useMemo' },
  { path: '/useCallback', element: useCallback, title: 'useCallback' },
  { path: '/useContext', element: useContext, title: 'useContext' },
  { path: '/useId', element: useId, title: 'useId' },
  { path: '/createContext', element: createContext, title: 'createContext' },
  { path: '/getParams', element: getParams, title: 'getParams' },
  { path: '/getSearchParams', element: getSearchParams, title: 'getSearchParams' },
  { path: '/getPathname', element: getPathname, title: 'getPathname' },
  { path: '/replace', element: replace, title: 'replace' },
  { path: '/navigate', element: navigate, title: 'navigate' },
  { path: '/batch', element: batch, title: 'batch' },
  { path: '/outlet', element: outlet, title: '<Outlet/>' },
  { path: '/fragment', element: fragment, title: '<Fragment/>' },
  { path: '/portal', element: portal, title: '<Portal/>' },
];

export const MoreSections: Array<DocItem> = [
  { path: '/class-attribute', element: classAttribute, title: 'Class attribute' },
  { path: '/joinClasses', element: joinClasses, title: 'joinClasses' },
  { path: '/if-directive', element: ifDirective, title: 'if directives' },
  { path: '/switch-directive', element: switchDirective, title: 'switch directives' },
  { path: '/event-modifiers', element: eventModifiers, title: 'Event modifiers' },
];

export const DocsSections: Array<DocItem> = [
  {
    path: '/api',
    element: api,
    title: 'API',
    children: ApiSections,
  },
  {
    path: '/more',
    element: more,
    title: 'More',
    children: MoreSections,
  },
  {
    path: '/types',
    element: types,
    title: 'Types',
    children: [],
  },
];
