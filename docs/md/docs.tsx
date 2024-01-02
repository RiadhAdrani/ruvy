import api from './docs/api.md';
import types from './docs/types.md';

import useState from './docs/api/useState.md';
import useEffect from './docs/api/useEffect.md';
import useMemo from './docs/api/useMemo.md';
import useCallback from './docs/api/useCallback.md';
import useContext from './docs/api/useContext.md';
import useId from './docs/api/useId.md';
import createContext from './docs/api/createContext.md';
import createRouter from './docs/api/createRouter.md';
import getParams from './docs/api/getParams.md';
import getPathname from './docs/api/getPathname.md';
import getSearchParams from './docs/api/getSearchParams.md';
import mountApp from './docs/api/mountApp.md';
import navigate from './docs/api/navigate.md';
import replace from './docs/api/replace.md';
import outlet from './docs/api/outlet.md';
import portal from './docs/api/portal.md';
import fragment from './docs/api/fragment.md';
import batch from './docs/api/batch.md';
import createStore from './docs/api/createStore.md';

import more from './docs/more.md';
import classAttribute from './docs/more/class-attribute.md';
import joinClasses from './docs/more/joinClasses.md';
import ifDirective from './docs/more/if-directive.md';
import switchDirective from './docs/more/switch-directive.md';
import eventModifiers from './docs/more/event-modifiers.md';

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
