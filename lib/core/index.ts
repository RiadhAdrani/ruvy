import { queueRequest } from '../scheduler/scheduler.js';
import '../component/jsx.js';
import { RuvyError } from '../helpers/helpers.js';
import {
  ComponentTag,
  ComponentTasks,
  MountAppConfig,
  RootComponent,
  TasksSorted,
} from '../types.js';
import { setConfig } from '@riadh-adrani/domer';

setConfig({
  events: {
    syntax: {
      svelte: false,
      vue: false,
    },
  },
});

let root: RootComponent | undefined;

export const mountApp = ({ app, host }: MountAppConfig) => {
  if (root) {
    throw new RuvyError('an app is already mounted');
  }

  root = { children: [], instance: host, tag: ComponentTag.Root };

  queueRequest({ root, child: app });
};

export const executeTasks = (tasks: ComponentTasks) => {
  TasksSorted.forEach(queue => {
    tasks[queue].forEach(task => {
      try {
        task.execute();
      } catch (e) {
        // some err
      }
    });
  });
};
