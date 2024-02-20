import { DocItem } from '../types/index.js';

import setup from './learn/setup.md?raw';
import tutorialTodo from './learn/tutorial-todo.md?raw';
import index__versions from './learn/index/md.js';
import quickStart__versions from './learn/quick-start/md.js';

export const LearnSections: Array<DocItem> = [
  { path: '', versions: index__versions },
  {
    path: '/quick-start',
    versions: quickStart__versions,
    title: 'Quick Start',
  },
  {
    path: '/setup',
    versions: [
      {
        from: '0.5.0',
        md: setup,
      },
    ],
    title: 'Setup',
  },
  {
    path: '/tutorial-todo',
    versions: [
      {
        from: '0.5.0',
        md: tutorialTodo,
      },
    ],
    title: 'Tutorial : Todo',
  },
];
