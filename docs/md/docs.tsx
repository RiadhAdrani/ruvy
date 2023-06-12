import { RawRoute, RuvyNode } from '../index.js';
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
import getSearchQuery from './docs/api/getSearchQuery.md';
import mountApp from './docs/api/mountApp.md';
import navigate from './docs/api/navigate.md';
import replace from './docs/api/replace.md';

export type DocItem = RawRoute<RuvyNode>;

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
  { path: 'getSearchQuery', component: getSearchQuery, title: 'getSearchQuery' },
  { path: 'getRoute', component: getRoute, title: 'getRoute' },
  { path: 'replace', component: replace, title: 'replace' },
  { path: 'navigate', component: navigate, title: 'navigate' },
];

export const DocsSections: Array<DocItem> = [
  {
    path: '/api',
    component: api,
    title: 'API',
    routes: ApiSections,
  },
  {
    path: '/types',
    component: types,
    title: 'Types',
  },
];
