import { DocItem } from '../types/index.js';

import quickStart from './learn/quick-start.md';
import setup from './learn/setup.md';
import tutorialTodo from './learn/tutorial-todo.md';

export const LearnSections: Array<DocItem> = [
  {
    path: '/quick-start',
    component: quickStart,
    title: 'Quick Start',
  },
  {
    path: '/setup',
    component: setup,
    title: 'Setup',
  },
  {
    path: '/tutorial-todo',
    component: tutorialTodo,
    title: 'Tutorial : Todo',
  },
];
