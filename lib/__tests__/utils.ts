import { Template } from '@/types.js';
import { mountApp, unmountApp } from '../index.js';
import { wait } from '@/helpers/helpers.js';
import { frameworkContext } from '@/core/index.js';

export const __test__mount = async (app: Template, delay = 10) => {
  mountApp({ app, host: document.body });

  await wait(delay);
};

export const __test__unmount = async (delay = 10) => {
  frameworkContext.skipThrowingWhenUnmountingNoApp = true;

  unmountApp();

  await wait(delay);

  frameworkContext.skipThrowingWhenUnmountingNoApp = false;
};
