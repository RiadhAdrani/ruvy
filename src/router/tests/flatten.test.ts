import { flatten } from '../utils/index.js';
import { describe, it, expect } from 'vitest';
import type { RawRoute } from '../types.js';

describe('flatten', () => {
  it('should throw when input is not an array', () => {
    expect(() => flatten(0 as unknown as Array<RawRoute>)).toThrow();
  });

  it('should throw when a path is blank', () => {
    expect(() => flatten([{ path: '', component: '' }])).toThrow();
  });

  it('should flatten an array of raw routes', () => {
    const routes: Array<RawRoute> = [
      { path: '/', title: 'Home', component: '' },
      { path: 'test-2', title: 'Test 2', component: 'component' },
      { path: 'test', title: 'Test', redirectTo: '/test-2', component: '' },
    ];

    expect(flatten(routes)).toStrictEqual({
      '/': {
        path: '/',
        fragments: [],
        title: 'Home',
        isDynamic: false,
        component: '',
      },
      '/test-2': {
        path: '/test-2',
        fragments: ['test-2'],
        title: 'Test 2',
        isDynamic: false,
        component: 'component',
      },
      '/test': {
        path: '/test',
        fragments: ['test'],
        title: 'Test',
        redirectTo: '/test-2',
        isDynamic: false,
        component: '',
      },
    });
  });

  it('should flatten routes recursively', () => {
    const routes: Array<RawRoute> = [
      {
        path: '/',
        component: '',
        routes: [
          { path: 'main', component: '' },
          { path: 'user', component: '', routes: [{ path: ':id', component: '' }] },
        ],
      },
      { path: '*', component: '' },
    ];

    expect(flatten(routes)).toStrictEqual({
      '/': {
        path: '/',
        fragments: [],
        isDynamic: false,
        component: '',
      },
      '/*': {
        path: '/*',
        fragments: ['*'],
        isDynamic: false,
        component: '',
      },
      '/main': {
        path: '/main',
        fragments: ['main'],
        isDynamic: false,
        component: '',
      },
      '/user': {
        path: '/user',
        fragments: ['user'],
        isDynamic: false,
        component: '',
      },
      '/user/:id': {
        path: '/user/:id',
        fragments: ['user', ':id'],
        isDynamic: true,
        component: '',
      },
    });
  });
});
