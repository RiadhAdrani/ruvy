import { useApp } from '../context/UI.js';
import { useMemo } from '../index.js';
import darkLogo from '../assets/dark.svg';
import lightLogo from '../assets/light.svg';
import { Theme } from '../types/index.js';

export default () => {
  const { computedTheme } = useApp();

  return useMemo(() => (computedTheme === Theme.Dark ? darkLogo : lightLogo), computedTheme);
};
