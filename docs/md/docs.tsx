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
import useKey from './docs/api/useKey.md';
import createContext from './docs/api/createContext.md';
import createRouter from './docs/api/createRouter.md';
import getParams from './docs/api/getParams.md';
import getRoute from './docs/api/getRoute.md';
import getSearchParams from './docs/api/getSearchParams.md';
import mountApp from './docs/api/mountApp.md';
import navigate from './docs/api/navigate.md';
import replace from './docs/api/replace.md';
import outlet from './docs/api/outlet.md';
import portal from './docs/api/portal.md';

import more from './docs/more.md';
import classAttribute from './docs/more/class-attribute.md';
import joinClasses from './docs/more/joinClasses.md';
import { DocItem } from '../types/index.js';

export const ApiSections: Array<DocItem> = [
  { path: 'mountApp', component: mountApp, title: 'mountApp' },
  { path: 'createRouter', component: createRouter, title: 'createRouter' },
  { path: 'useState', component: useState, title: 'useState' },
  { path: 'useEffect', component: useEffect, title: 'useEffect' },
  { path: 'useMemo', component: useMemo, title: 'useMemo' },
  { path: 'useCallback', component: useCallback, title: 'useCallback' },
  { path: 'useContext', component: useContext, title: 'useContext' },
  { path: 'useId', component: useId, title: 'useId' },
  { path: 'useReactive', component: useReactive, title: 'useReactive' },
  { path: 'usePromise', component: usePromise, title: 'usePromise' },
  { path: 'useKey', component: useKey, title: 'useKey' },
  { path: 'createContext', component: createContext, title: 'createContext' },
  { path: 'getParams', component: getParams, title: 'getParams' },
  { path: 'getSearchParams', component: getSearchParams, title: 'getSearchParams' },
  { path: 'getRoute', component: getRoute, title: 'getRoute' },
  { path: 'replace', component: replace, title: 'replace' },
  { path: 'navigate', component: navigate, title: 'navigate' },
  { path: 'outlet', component: outlet, title: '<Outlet/>' },
  { path: 'portal', component: portal, title: '<Portal/>' },
];

export const MoreSections: Array<DocItem> = [
  { path: 'class-attribute', component: classAttribute, title: 'Class attribute' },
  { path: 'joinClasses', component: joinClasses, title: 'joinClasses' },
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
