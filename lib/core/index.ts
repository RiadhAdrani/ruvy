import { handleComponent } from '../component/index.js';
import '../component/jsx.js';
import { RuvyError } from '../helpers/helpers.js';
import {
  ComponentTag,
  ComponentTasks,
  ExecutionContext,
  MountAppConfig,
  ParentComponent,
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

  const ctx: ExecutionContext = {
    contexts: {},
    dom: {
      nextIndex: 0,
      parent: root,
    },
    index: 0,
    key: 0,
    parent: root as unknown as ParentComponent,
  };

  const { component, tasks } = handleComponent(
    app,
    undefined,
    root as unknown as ParentComponent,
    0,
    ctx
  );

  root.children.push(component);

  // exeucte tasks
  executeTasks(tasks);
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
