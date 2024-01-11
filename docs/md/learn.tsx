import { DocItem } from '../types/index.js';

import quickStart from './learn/quick-start.md?raw';
import setup from './learn/setup.md?raw';
import tutorialTodo from './learn/tutorial-todo.md?raw';

export const LearnSections: Array<DocItem> = [
  {
    path: '/quick-start',
    element: quickStart,
    title: 'Quick Start',
  },
  {
    path: '/setup',
    element: setup,
    title: 'Setup',
  },
  {
    path: '/tutorial-todo',
    element: tutorialTodo,
    title: 'Tutorial : Todo',
  },
];
