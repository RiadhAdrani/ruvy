import { UIContext } from '../context/UI.js';
import { useContext, useMemo } from '../index.js';
import darkLogo from '../assets/dark.svg';
import lightLogo from '../assets/light.svg';
import { Theme } from '../types/index.js';

export default () => {
  const { computedTheme } = useContext(UIContext);

  return useMemo(() => (computedTheme === Theme.Dark ? darkLogo : lightLogo), computedTheme);
};
