import api from './docs/api.md';
import types from './docs/types.md';

import useState from './docs/api/useState.md';
import useEffect from './docs/api/useEffect.md';
import useMemo from './docs/api/useMemo.md';
import useCallback from './docs/api/useCallback.md';
import useContext from './docs/api/useContext.md';
import useId from './docs/api/useId.md';
import useReactive from './docs/api/useReactive.md';
import usePromise from './docs/api/usePromise.md';
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
  { path: 'mountApp', component: mountApp, title: 'mountApp' },
  { path: 'createRouter', component: createRouter, title: 'createRouter' },
  { path: 'createStore', component: createStore, title: 'createStore' },
  { path: 'useState', component: useState, title: 'useState' },
  { path: 'useEffect', component: useEffect, title: 'useEffect' },
  { path: 'useMemo', component: useMemo, title: 'useMemo' },
  { path: 'useCallback', component: useCallback, title: 'useCallback' },
  { path: 'useContext', component: useContext, title: 'useContext' },
  { path: 'useId', component: useId, title: 'useId' },
  { path: 'useReactive', component: useReactive, title: 'useReactive' },
  { path: 'usePromise', component: usePromise, title: 'usePromise' },
  { path: 'createContext', component: createContext, title: 'createContext' },
  { path: 'getParams', component: getParams, title: 'getParams' },
  { path: 'getSearchParams', component: getSearchParams, title: 'getSearchParams' },
  { path: 'getPathname', component: getPathname, title: 'getPathname' },
  { path: 'replace', component: replace, title: 'replace' },
  { path: 'navigate', component: navigate, title: 'navigate' },
  { path: 'batch', component: batch, title: 'batch' },
  { path: 'outlet', component: outlet, title: '<Outlet/>' },
  { path: 'fragment', component: fragment, title: '<Fragment/>' },
  { path: 'portal', component: portal, title: '<Portal/>' },
];

export const MoreSections: Array<DocItem> = [
  { path: 'class-attribute', component: classAttribute, title: 'Class attribute' },
  { path: 'joinClasses', component: joinClasses, title: 'joinClasses' },
  { path: 'if-directive', component: ifDirective, title: 'if directives' },
  { path: 'switch-directive', component: switchDirective, title: 'switch directives' },
  { path: 'event-modifiers', component: eventModifiers, title: 'Event modifiers' },
];

export const DocsSections: Array<DocItem> = [
  {
    path: '/api',
    component: api,
    title: 'API',
    routes: ApiSections,
  },
  {
    path: '/more',
    component: more,
    title: 'More',
    routes: MoreSections,
  },
  {
    path: '/types',
    component: types,
    title: 'Types',
  },
];
