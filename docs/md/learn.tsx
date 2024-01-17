import { DocItem } from '../types/index.js';

import quickStart from './learn/quick-start.md?raw';
import setup from './learn/setup.md?raw';
import tutorialTodo from './learn/tutorial-todo.md?raw';

export const LearnSections: Array<DocItem> = [
  {
    path: '/quick-start',
    versions: [
      {
        from: '0.5.0',
        md: quickStart,
      },
    ],
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
