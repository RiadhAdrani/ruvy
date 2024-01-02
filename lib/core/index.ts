import { queueRequest } from '../scheduler/scheduler.js';
import '../component/jsx.js';
import { RuvyError } from '../helpers/helpers.js';
import {
  ComponentTag,
  ComponentTasks,
  GlobalContext,
  MountAppConfig,
  RootComponent,
  TasksSorted,
  Template,
} from '../types.js';
import { setConfig } from '@riadh-adrani/domer';

setConfig({
  events: {
    wrapper: (e, cb) => {
      try {
        cb(e);
      } catch (e) {
        console.error(e);
      }
    },
    syntax: {
      svelte: false,
      vue: false,
    },
  },
});

export const frameworkContext: GlobalContext = {
  preventRequests: false,
};

export let root: RootComponent | undefined;
export let template: Template;

export const mountApp = ({ app, host }: MountAppConfig) => {
  if (root) {
    throw new RuvyError('an app is already mounted');
  }

  root = { children: [], instance: host, tag: ComponentTag.Root };

  template = app;

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
