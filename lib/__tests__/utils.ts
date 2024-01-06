import { Template } from '@/types.js';
import { mountApp, unmountApp } from '../index.js';
import { wait } from '@/helpers/helpers.js';

export const __test__mount = async (app: Template, delay = 10) => {
  mountApp({ app, host: document.body });

  await wait(delay);
};

export const __test__unmount = async (delay = 10) => {
  unmountApp();

  await wait(delay);
};
