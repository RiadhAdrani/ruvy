import { getPathname } from '../index.js';
import darkLogo from '../assets/dark.svg';
import lightLogo from '../assets/light.svg';

export const isDarkMode = (): boolean => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }

  return false;
};

export const join = (array: Array<string>): string => `@apply ${array.join(' ')}`;

export const isActive = (path: string): boolean => {
  const current = getPathname();

  return current.substring(0, path.length) === path;
};

export const getLogo = () => {
  return isDarkMode() ? darkLogo : lightLogo;
};
