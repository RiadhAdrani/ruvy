export const isDarkMode = (): boolean => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }

  return false;
};

export const join = (array: Array<string>): string => `@apply ${array.join(' ')}`;
