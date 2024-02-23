import { DocItem } from '../types/index.js';

import todo__versions from './learn/tutorial-todo/md.js';
import index__versions from './learn/index/md.js';
import quickStart__versions from './learn/quick-start/md.js';
import setup__versions from './learn/setup/md.js';

export const LearnSections: Array<DocItem> = [
  { path: '', versions: index__versions },
  {
    path: '/quick-start',
    versions: quickStart__versions,
    title: 'Quick Start',
  },
  {
    path: '/setup',
    versions: setup__versions,
    title: 'Setup',
  },
  {
    path: '/tutorial-todo',
    versions: todo__versions,
    title: 'Tutorial : Todo',
  },
];
