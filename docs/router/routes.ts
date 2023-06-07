import { RawRoute, RuvyNode } from '../index.js';

export const routes: Array<RawRoute<RuvyNode>> = [
  { component: 'yes', path: '/' },
  { path: '/user', component: 'user' },
];
